# Generated by Django 4.2 on 2023-04-23 15:59

from django.db import migrations, models
import uuid


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Product',
            fields=[
                ('uuid', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('title', models.CharField(max_length=1000, verbose_name='Название товара')),
                ('text', models.TextField(default='', max_length=10000, verbose_name='Описание товара')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('min_price', models.CharField(max_length=255, verbose_name='Минимальная ставка')),
                ('image', models.ImageField(upload_to='photos/', verbose_name='Фото')),
                ('author', models.CharField(max_length=1000, verbose_name='Никнейм пользователя')),
            ],
            options={
                'verbose_name': 'Товар',
                'verbose_name_plural': 'Товары',
            },
        ),
    ]
