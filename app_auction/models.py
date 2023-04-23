from django.db import models
import uuid


class Product(models.Model):
    """
    Модель товара
    """
    uuid = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    title = models.CharField(max_length=1000, verbose_name='Название товара')
    text = models.TextField(max_length=10000, default='', verbose_name='Описание товара')
    created_at = models.DateTimeField(auto_now_add=True)
    min_price = models.CharField(max_length=255, verbose_name='Минимальная ставка')
    image = models.ImageField(upload_to='photos/products/', blank=False, verbose_name='Фото')
    author = models.CharField(max_length=1000, verbose_name='Никнейм пользователя')

    def __str__(self):
        return '{}. ({})'.format(self.title, self.created_at)

    class Meta:
        verbose_name = 'Товар'
        verbose_name_plural = 'Товары'


class Comment(models.Model):
    name = models.CharField(max_length=100, verbose_name='Никнейм')
    text = models.CharField(max_length=1000, verbose_name='Текст')
    price = models.CharField(max_length=255, verbose_name='Ставка')
    pic = models.ImageField(upload_to='photos/users/', blank=True, verbose_name='Фото', null=True)
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='comments', verbose_name='Продукт')
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name_plural = 'Комментарии'
        verbose_name = 'Комментарий'
