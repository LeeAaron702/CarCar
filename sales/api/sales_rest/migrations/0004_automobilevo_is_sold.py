# Generated by Django 4.0.3 on 2023-03-08 00:37

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('sales_rest', '0003_alter_salesrecord_price'),
    ]

    operations = [
        migrations.AddField(
            model_name='automobilevo',
            name='is_sold',
            field=models.BooleanField(default=False),
        ),
    ]
