# from django.db import models
# from django.contrib.auth import get_user_model
# import uuid
#
#
# class Product(models.Model):
#     """
#     Модель товара
#     """
#     uuid = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
#
#     title = models.CharField(max_length=1000, verbose_name='Название товара')
#
#     text = models.TextField(max_length=10000, default='', verbose_name='Описание товара')
#
#     created_at = models.DateTimeField(auto_now_add=True)
#
#     author = models.ForeignKey(get_user_model(), on_delete=models.CASCADE, verbose_name='Продавец', null=True)
#
#     def __str__(self):
#         return '{}. ({})'.format(self.title, self.created_at)
#
#     class Meta:
#         verbose_name = 'Товар'
#         verbose_name_plural = 'Товары'
#
#
# class Photo(models.Model):
#     """
#     Модель фотографии
#     """
#     image = models.ImageField(upload_to='photos/', blank=False, verbose_name='Фото')
#     product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='photos', verbose_name='Товар')
#
#     class Meta:
#         verbose_name_plural = 'Фотографии'
#         verbose_name = 'Фотография'
#
#
# class Comment(models.Model):
#     name_user = models.CharField(max_length=100, verbose_name='Имя и фамилия')
#     text = models.CharField(max_length=1000, verbose_name='Текст')
#     product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='comments', verbose_name='Продукт')
#
#     class Meta:
#         verbose_name_plural = 'Комментарии'
#         verbose_name = 'Комментарий'
