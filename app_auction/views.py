import re

from django.core.files.base import ContentFile
from django.shortcuts import redirect, render
from django.views.generic import TemplateView, DetailView
from django.utils import timezone

from app_auction.models import Product, Comment, IsDeletedProduct


def page_not_found_view(request, exception):
    uuid = request.get_full_path().replace('/', '')
    if IsDeletedProduct.objects.filter(uuid=uuid).exists():
        return render(request, 'product_was_deleted.html', {})
    return redirect('product_create')


class ProductCreateView(TemplateView):
    """
    Класс представление для отображения страницы создания товара
    """
    template_name = 'login.html'

    def post(self, request):
        currencies = {
            "USD": "$",
            "EUR": "€",
            "RUB": "₽",
        }
        start_price = f'{currencies[request.POST.get("priceValue")]}{request.POST.get("minimalPrice")}'
        author = request.POST.get('userName')
        if not author.startswith('@'):
            author = f'@{author}'
        product = Product.objects.create(
            author=author,
            title=request.POST.get('productName'),
            text=request.POST.get('productDescription'),
            min_price=start_price,
            start_price=start_price,
            value=currencies[request.POST.get("priceValue")]
        )
        for f in request.FILES.getlist('imageFile'):
            data = f.read()
            product.image.save(f.name, ContentFile(data))
            product.save()
        return redirect('product_detail', pk=product.uuid)


class ProductDetailView(DetailView):
    """
    Класс представления детальной страницы товара.
    """
    model = Product
    template_name = 'index.html'

    def get(self, request, *args, **kwargs):
        context = {}
        if IsDeletedProduct.objects.filter(uuid=self.kwargs['pk']).exists():
            self.template_name = 'product_was_deleted.html'
            return render(request, self.template_name, context)
        product = self.get_object()
        if product.deleted_at < timezone.localtime():
            IsDeletedProduct.objects.create(
                uuid=product.uuid
            )
            product.delete()
            self.template_name = 'product_was_deleted.html'
            return render(request, self.template_name, context)
        elif product.closed_at < timezone.localtime():
            context['is_closed'] = True
        context['product'] = product
        min_price = int(re.findall(r'\d+', product.min_price)[0]) + 1
        context['min_price'] = min_price
        return render(request, self.template_name, context)

    def post(self, request, pk):
        name = request.POST.get('newUserName')
        if not name.startswith('@'):
            name = f'@{name}'
        product = self.get_object()
        price = f'{product.value}{request.POST.get("newPrice")}'
        comment = Comment.objects.create(
            name=name,
            text=request.POST.get('newProductDescription'),
            price=price,
            product=product,
        )
        for f in request.FILES.getlist('modalImage'):
            data = f.read()
            comment.pic.save(f.name, ContentFile(data))
            comment.save()
        product = self.get_object()
        product.min_price = price
        product.save()
        return redirect('product_detail', pk=pk)
