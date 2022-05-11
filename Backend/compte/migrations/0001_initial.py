# Generated by Django 4.0.3 on 2022-05-11 10:01

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
                ('is_autorise', models.BooleanField(default=False)),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='Courses',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('assister', models.ManyToManyField(related_name='assister_content_type', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='formation',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('intitule', models.CharField(max_length=20)),
            ],
        ),
        migrations.CreateModel(
            name='Presence',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('stagiaireform', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='SocieteFormation',
            fields=[
                ('company_name', models.CharField(max_length=100, unique=True)),
                ('company_adress', models.CharField(max_length=50, unique=True)),
                ('company_phone_number', models.CharField(max_length=50, unique=True)),
                ('fix_number', models.CharField(max_length=50, unique=True)),
                ('company_stamp', models.FileField(null=True, upload_to='company_stamp/')),
                ('company_logo', models.FileField(null=True, upload_to='company_logo/')),
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='souscriptionliaison',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('formation', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='compte.formation')),
                ('utilisateur', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='souscrir',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('edof', models.CharField(max_length=50)),
                ('training_status', models.CharField(max_length=50)),
                ('hour_worked', models.CharField(max_length=50)),
                ('duration', models.CharField(max_length=50)),
                ('start_session', models.DateField()),
                ('end_session', models.DateField()),
                ('test_oral', models.BooleanField(default=False)),
                ('souscriptionliaison', models.ManyToManyField(related_name='souscription_content_type', to='compte.souscriptionliaison')),
            ],
        ),
        migrations.CreateModel(
            name='reservation',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('status', models.CharField(max_length=30)),
                ('annuler', models.BooleanField(default=False)),
                ('etablir', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='compte.presence')),
                ('proposer', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='proposer_content_type', to=settings.AUTH_USER_MODEL)),
                ('reservation', models.ManyToManyField(related_name='reservation_content_type', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='OrganismeFormation',
            fields=[
                ('company_name', models.CharField(max_length=100, unique=True)),
                ('company_adress', models.CharField(max_length=50, unique=True)),
                ('company_phone_number', models.CharField(max_length=50, unique=True)),
                ('fix_number', models.CharField(max_length=50, unique=True)),
                ('company_stamp', models.FileField(null=True, upload_to='company_stamp/')),
                ('company_logo', models.FileField(null=True, upload_to='company_logo/')),
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('societe_formation', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='compte.societeformation')),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='Opinion',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('rate', models.IntegerField(default=0)),
                ('mind', models.CharField(max_length=255)),
                ('donner', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
                ('rapporter', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='compte.courses')),
            ],
        ),
        migrations.AddField(
            model_name='formation',
            name='organiser',
            field=models.ManyToManyField(related_name='organiser_content_type', to='compte.organismeformation'),
        ),
        migrations.CreateModel(
            name='Document',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('doc_type', models.FileField(upload_to='doc_type/')),
                ('doc_content', models.CharField(max_length=255)),
                ('administrer', models.ManyToManyField(related_name='administrer_content_type', to=settings.AUTH_USER_MODEL)),
                ('emarger', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='emarger_content_type', to=settings.AUTH_USER_MODEL)),
                ('partager', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='partager_content_type', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.AddField(
            model_name='courses',
            name='etablir',
            field=models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='compte.presence'),
        ),
        migrations.AddField(
            model_name='courses',
            name='lier',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='compte.formation'),
        ),
        migrations.AddField(
            model_name='courses',
            name='reservation_cours',
            field=models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='compte.reservation'),
        ),
        migrations.AddField(
            model_name='courses',
            name='superviser',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='superviser_content_type', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='user',
            name='appartenir_organisme',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='org_stagiare_appt_type', to='compte.organismeformation'),
        ),
        migrations.AddField(
            model_name='user',
            name='appartenir_societe',
            field=models.ManyToManyField(related_name='appartenir_content_type', to='compte.societeformation'),
        ),
        migrations.AddField(
            model_name='user',
            name='groups',
            field=models.ManyToManyField(blank=True, help_text='The groups this user belongs to. A user will get all permissions granted to each of their groups.', related_name='user_set', related_query_name='user', to='auth.group', verbose_name='groups'),
        ),
        migrations.AddField(
            model_name='user',
            name='organisme_formation',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='org_content_type', to='compte.organismeformation'),
        ),
        migrations.AddField(
            model_name='user',
            name='societe_formation',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='org_content_type', to='compte.societeformation'),
        ),
        migrations.AddField(
            model_name='user',
            name='souscrir',
            field=models.ManyToManyField(related_name='souscrir_training', to='compte.formation'),
        ),
        migrations.AddField(
            model_name='user',
            name='user_permissions',
            field=models.ManyToManyField(blank=True, help_text='Specific permissions for this user.', related_name='user_set', related_query_name='user', to='auth.permission', verbose_name='user permissions'),
        ),
    ]
