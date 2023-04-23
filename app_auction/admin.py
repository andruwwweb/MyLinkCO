from django.contrib import admin

from app_auction.models import Product, Comment


class ProductAdmin(admin.ModelAdmin):
    list_display = ['title', 'created_at', 'author']
    fields = ['text', 'image']
    list_filter = ['created_at']


class CommentAdmin(admin.ModelAdmin):
    list_display = ['name', 'price', 'product']
    fields = ['name', 'pic', 'price', 'product', 'text']
    list_filter = ['created_at']


admin.site.register(Product, ProductAdmin)
admin.site.register(Comment, CommentAdmin)
