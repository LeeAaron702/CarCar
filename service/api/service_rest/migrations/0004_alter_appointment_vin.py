# Generated by Django 4.0.3 on 2023-03-08 20:33

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('service_rest', '0003_remove_appointment_date_remove_appointment_time_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='appointment',
            name='vin',
            field=models.CharField(max_length=17),
        ),
    ]