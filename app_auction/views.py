from django.core.files.base import ContentFile
from django.shortcuts import redirect
from django.views.generic import TemplateView, DetailView

from app_auction.models import Product, Comment


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
        min_price = f'{currencies[request.POST.get("priceValue")]}{request.POST.get("minimalPrice")}'
        author = request.POST.get('userName')
        if not author.startswith('@'):
            author = f'@{author}'
        product = Product.objects.create(
            author=author,
            title=request.POST.get('productName'),
            text=request.POST.get('productDescription'),
            min_price=min_price,
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
    context_object_name = 'product'

    def post(self, request, pk):
        currencies = {
            "USD": "$",
            "EUR": "€",
            "RUB": "₽",
        }
        price = f'{currencies[request.POST.get("newPriceValue")]}{request.POST.get("newPrice")}'
        name = request.POST.get('newUserName')
        if not name.startswith('@'):
            name = f'@{name}'
        product = self.get_object()
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
        return redirect('product_detail', pk=pk)
