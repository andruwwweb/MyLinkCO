from django.contrib import admin

from app_auction.models import Product, Comment, IsDeletedProduct


class ProductAdmin(admin.ModelAdmin):
    list_display = ['title', 'created_at', 'author', 'min_price', 'start_price']
    fields = ['title', 'text', 'image', 'min_price', 'start_price']
    list_filter = ['created_at']


class DeletedProductAdmin(admin.ModelAdmin):
    list_display = ['uuid', ]
    fields = ['uuid', ]


class CommentAdmin(admin.ModelAdmin):
    list_display = ['name', 'price', 'product']
    fields = ['name', 'pic', 'price', 'product', 'text']
    list_filter = ['created_at']


admin.site.register(Product, ProductAdmin)
admin.site.register(IsDeletedProduct, DeletedProductAdmin)
admin.site.register(Comment, CommentAdmin)
