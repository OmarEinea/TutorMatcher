# -*- coding: utf-8 -*-
# Generated by Django 1.11 on 2017-04-30 11:48
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('website', '0003_user_phone'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='phone',
            field=models.IntegerField(max_length=10),
        ),
    ]
