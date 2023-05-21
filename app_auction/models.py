from datetime import timedelta

from django.db import models
import uuid

from django.utils import timezone


def get_closed_date():
    closed_date = timezone.localtime() + timedelta(days=3)
    return closed_date


def get_deleted_date():
    deleted_date = timezone.localtime() + timedelta(days=6)
    return deleted_date


class Product(models.Model):
    """
    Модель товара
    """
    uuid = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    title = models.CharField(max_length=1000, verbose_name='Название товара')
    text = models.TextField(max_length=10000, default='', verbose_name='Описание товара')
    created_at = models.DateTimeField(auto_now_add=True)
    closed_at = models.DateTimeField(default=get_closed_date)
    deleted_at = models.DateTimeField(default=get_deleted_date)
    min_price = models.CharField(max_length=255, verbose_name='Минимальная ставка')
    start_price = models.CharField(max_length=255, verbose_name='Стартовая цена')
    value = models.CharField(max_length=255, default='$', verbose_name='Валюта')
    image = models.ImageField(upload_to='products/', blank=False, verbose_name='Фото')
    author = models.CharField(max_length=1000, verbose_name='Никнейм пользователя')

    def __str__(self):
        return '{}. ({})'.format(self.title, self.created_at)

    class Meta:
        verbose_name = 'Товар'
        verbose_name_plural = 'Товары'


class IsDeletedProduct(models.Model):
    """
    Модель удалённого товара
    """
    uuid = models.CharField(max_length=255, default='', verbose_name='uuid-string')

    class Meta:
        verbose_name = 'Удалённый товар'
        verbose_name_plural = 'Удалённые товары'


class Comment(models.Model):
    name = models.CharField(max_length=100, verbose_name='Никнейм')
    text = models.CharField(max_length=1000, verbose_name='Текст')
    price = models.CharField(max_length=255, verbose_name='Ставка')
    pic = models.ImageField(upload_to='users/', blank=True, verbose_name='Фото', null=True)
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='comments', verbose_name='Продукт')
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name_plural = 'Комментарии'
        verbose_name = 'Комментарий'
