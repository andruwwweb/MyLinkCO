from django.contrib import admin

from app_auction.models import Product


class ProductAdmin(admin.ModelAdmin):
    list_display = ['title', 'created_at', 'author']
    fields = ['text', 'image']
    list_filter = ['created_at']


admin.site.register(Product, ProductAdmin)
