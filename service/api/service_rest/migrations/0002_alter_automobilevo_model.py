# Generated by Django 4.0.3 on 2023-03-07 22:36

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('service_rest', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='automobilevo',
            name='model',
            field=models.CharField(max_length=10000),
        ),
    ]
