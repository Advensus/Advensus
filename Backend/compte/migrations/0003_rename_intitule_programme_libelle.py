# Generated by Django 4.0.3 on 2022-06-06 04:11

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('compte', '0002_remove_organismeformation_connected'),
    ]

    operations = [
        migrations.RenameField(
            model_name='programme',
            old_name='intitule',
            new_name='libelle',
        ),
    ]