from django.core.files.base import ContentFile
from django.shortcuts import redirect
from django.views import View
from django.views.generic import TemplateView, DetailView

from app_auction.models import Product


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


# class ProductCreateAJAXView(View):
#     """
#     Класс представления для запроса на создание нового товара.
#     """
#     def post(self, request):
#         currencies = {
#             "USD": "$",
#             "EUR": "€",
#             "RUB": "₽",
#         }
#         min_price = f'{currencies[request.POST.get("priceValue")]}{request.POST.get("minimalPrice")}'
#         author = request.POST.get('userName')
#         if not author.startwith('@'):
#             author = f'@{author}'
#         product = Product.objects.create(
#             author=author,
#             title=request.POST.get('productName'),
#             text=request.POST.get('productDescription'),
#             min_price=min_price,
#             image=request.POST.get('fileImage'),
#         )
#         return redirect('product_detail', pk=product.uuid)


class ProductDetailView(DetailView):
    """
    Класс представления детальной страницы товара.
    """
    model = Product
    template_name = 'index.html'
    context_object_name = 'product'
