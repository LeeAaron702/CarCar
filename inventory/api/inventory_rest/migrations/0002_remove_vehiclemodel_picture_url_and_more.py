# Generated by Django 4.0.3 on 2023-03-16 18:20

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('inventory_rest', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='vehiclemodel',
            name='picture_url',
        ),
        migrations.AddField(
            model_name='automobile',
            name='picture_url',
            field=models.URLField(default=0),
            preserve_default=False,
        ),
    ]
