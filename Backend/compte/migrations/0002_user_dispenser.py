# Generated by Django 4.0.3 on 2022-05-12 07:33

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('compte', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='dispenser',
            field=models.ManyToManyField(related_name='dispenser_content_type', to='compte.formation'),
        ),
    ]
