from django.urls import path

from app_auction.views import ProductCreateView, ProductDetailView

urlpatterns = [
    path('product/new/', ProductCreateView.as_view(), name='product_create'),
    path('<uuid:pk>/', ProductDetailView.as_view(), name='product_detail'),
]
