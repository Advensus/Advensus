# Generated by Django 3.2.13 on 2022-04-20 10:42

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('compte', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='organisme',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='org_content_type', to='compte.organisme'),
        ),
    ]
