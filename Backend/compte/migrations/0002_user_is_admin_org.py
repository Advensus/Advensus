# Generated by Django 3.2.13 on 2022-04-25 08:41

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('compte', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='is_admin_org',
            field=models.BooleanField(default=False),
        ),
    ]
