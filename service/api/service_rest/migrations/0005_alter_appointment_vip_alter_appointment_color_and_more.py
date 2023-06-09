# Generated by Django 4.0.3 on 2023-03-08 20:39

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('service_rest', '0004_alter_appointment_vin'),
    ]

    operations = [
        migrations.AlterField(
            model_name='appointment',
            name='VIP',
            field=models.BooleanField(default=False, null=True),
        ),
        migrations.AlterField(
            model_name='appointment',
            name='color',
            field=models.CharField(max_length=50, null=True),
        ),
        migrations.AlterField(
            model_name='appointment',
            name='completed',
            field=models.BooleanField(default=False, null=True),
        ),
        migrations.AlterField(
            model_name='appointment',
            name='in_progress',
            field=models.BooleanField(default=False, null=True),
        ),
        migrations.AlterField(
            model_name='appointment',
            name='model',
            field=models.CharField(max_length=50, null=True),
        ),
        migrations.AlterField(
            model_name='appointment',
            name='year',
            field=models.PositiveSmallIntegerField(null=True),
        ),
    ]
