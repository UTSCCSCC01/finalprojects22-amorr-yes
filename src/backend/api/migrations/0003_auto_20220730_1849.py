# Generated by Django 3.1.14 on 2022-07-30 18:49

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_post_deleted'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='certificate_verified',
            field=models.CharField(default='', max_length=30),
        ),
        migrations.AlterField(
            model_name='user',
            name='photoid_verified',
            field=models.CharField(default='', max_length=30),
        ),
    ]
