# Generated by Django 4.1.2 on 2023-05-21 17:48

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app_auction', '0010_alter_comment_pic_alter_product_image'),
    ]

    operations = [
        migrations.AddField(
            model_name='product',
            name='start_price',
            field=models.CharField(default=0, max_length=255, verbose_name='Стартовая цена'),
            preserve_default=False,
        ),
    ]
