# Generated by Django 4.0.3 on 2023-03-16 19:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('sales_rest', '0007_alter_automobilevo_picture_url'),
    ]

    operations = [
        migrations.AddField(
            model_name='automobilevo',
            name='manufacturer',
            field=models.CharField(default=0, max_length=10000),
            preserve_default=False,
        ),
    ]
