# Generated by Django 3.2.13 on 2022-04-21 04:50

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import uuid


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('auth', '0012_alter_user_first_name_max_length'),
    ]

    operations = [
        migrations.CreateModel(
            name='User',
            fields=[
                ('password', models.CharField(max_length=128, verbose_name='password')),
                ('last_login', models.DateTimeField(blank=True, null=True, verbose_name='last login')),
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('email', models.EmailField(max_length=254, unique=True, verbose_name='email address')),
                ('username', models.CharField(max_length=30, unique=True, verbose_name='username ')),
                ('first_name', models.CharField(blank=True, max_length=30, null=True, verbose_name='first name')),
                ('last_name', models.CharField(blank=True, max_length=30, verbose_name='last name')),
                ('date_joined', models.DateTimeField(auto_now_add=True, verbose_name='date joined')),
                ('email_confirmed', models.BooleanField(default=False)),
                ('is_active', models.BooleanField(default=True, verbose_name='active')),
                ('avatar', models.FileField(blank=True, null=True, upload_to='avatars/')),
                ('phone_number', models.CharField(max_length=20, null=True)),
                ('adress', models.CharField(max_length=100, null=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now_add=True)),
                ('horaire', models.TimeField(null=True)),
                ('signature_former', models.FileField(upload_to='signature_former/')),
                ('cv', models.FileField(null=True, upload_to='cv/')),
                ('user_type', models.CharField(max_length=30)),
                ('competence', models.CharField(max_length=80)),
                ('trainee_level', models.CharField(max_length=40)),
                ('session_token', models.CharField(default=0, max_length=10)),
                ('active', models.BooleanField(default=True)),
                ('is_staff', models.BooleanField(default=False)),
                ('is_superuser', models.BooleanField(default=False)),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='Classes',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('assister', models.ManyToManyField(related_name='assister_content_type', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='formation',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('edof', models.CharField(max_length=20)),
                ('intitule', models.CharField(max_length=20)),
                ('duration', models.CharField(max_length=10)),
                ('start_session', models.DateField()),
                ('end_session', models.DateField()),
                ('test_oral', models.BooleanField(default=False)),
                ('admin', models.ManyToManyField(related_name='admin_content_type', to=settings.AUTH_USER_MODEL)),
                ('dispenser', models.ManyToManyField(related_name='dispenser_content_type', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Organisme',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('company_name', models.CharField(max_length=100, unique=True)),
                ('company_adress', models.CharField(max_length=50, unique=True)),
                ('phone_number', models.CharField(max_length=50, unique=True)),
                ('fix_number', models.CharField(max_length=50, unique=True)),
                ('company_stamp', models.FileField(null=True, upload_to='company_stamp/')),
                ('is_organisme', models.BooleanField(default=False)),
            ],
        ),
        migrations.CreateModel(
            name='Presence',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('stagiaireform', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='souscrir',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('training_status', models.CharField(max_length=20)),
                ('hour_worked', models.CharField(max_length=20)),
                ('training_type', models.CharField(max_length=20)),
                ('format', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='compte.formation')),
                ('statigiaire', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='reservation',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('status', models.CharField(max_length=30)),
                ('annuler', models.BooleanField(default=False)),
                ('etablir', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='compte.presence')),
                ('proposer', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='proposer_content_type', to=settings.AUTH_USER_MODEL)),
                ('reservation', models.ManyToManyField(related_name='reservation_content_type', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Opinion',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('rate', models.IntegerField(default=0)),
                ('mind', models.CharField(max_length=255)),
                ('donner', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
                ('rapporter', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='compte.classes')),
            ],
        ),
        migrations.AddField(
            model_name='formation',
            name='organiser',
            field=models.ManyToManyField(related_name='organiser_content_type', to='compte.Organisme'),
        ),
        migrations.CreateModel(
            name='Document',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('doc_type', models.FileField(upload_to='doc_type/')),
                ('doc_content', models.CharField(max_length=255)),
                ('administrer', models.ManyToManyField(related_name='administrer_content_type', to=settings.AUTH_USER_MODEL)),
                ('emarger', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='emarger_content_type', to=settings.AUTH_USER_MODEL)),
                ('partager', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='partager_content_type', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.AddField(
            model_name='classes',
            name='etablir',
            field=models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='compte.presence'),
        ),
        migrations.AddField(
            model_name='classes',
            name='lier',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='compte.formation'),
        ),
        migrations.AddField(
            model_name='classes',
            name='reservation_classe',
            field=models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='compte.reservation'),
        ),
        migrations.AddField(
            model_name='classes',
            name='superviser',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='superviser_content_type', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='user',
            name='appartenir',
            field=models.ManyToManyField(related_name='appartenir_content_type', to='compte.Organisme'),
        ),
        migrations.AddField(
            model_name='user',
            name='groups',
            field=models.ManyToManyField(blank=True, help_text='The groups this user belongs to. A user will get all permissions granted to each of their groups.', related_name='user_set', related_query_name='user', to='auth.Group', verbose_name='groups'),
        ),
        migrations.AddField(
            model_name='user',
            name='organisme',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='org_content_type', to='compte.organisme'),
        ),
        migrations.AddField(
            model_name='user',
            name='provenir',
            field=models.ManyToManyField(related_name='provenir_content_type', to='compte.Organisme'),
        ),
        migrations.AddField(
            model_name='user',
            name='user_permissions',
            field=models.ManyToManyField(blank=True, help_text='Specific permissions for this user.', related_name='user_set', related_query_name='user', to='auth.Permission', verbose_name='user permissions'),
        ),
    ]
