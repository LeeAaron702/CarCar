# Generated by Django 4.0.3 on 2023-03-16 19:11

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('sales_rest', '0006_automobilevo_picture_url_alter_automobilevo_is_sold'),
    ]

    operations = [
        migrations.AlterField(
            model_name='automobilevo',
            name='picture_url',
            field=models.URLField(null=True),
        ),
    ]
