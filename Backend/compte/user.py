from __future__ import unicode_literals

from django.db import models
from django.core.mail import send_mail

from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin

from django.contrib.auth.base_user import AbstractBaseUser

from django.utils.translation import gettext_lazy as _ 





# classe de modification de gestion des utilisateur par defaut de django
class UserManager(BaseUserManager):

    def create_user(self,email,username,password=None):
        if email is None:
            raise TypeError('le mail est obligatoire')
        if username is None:
            raise TypeError('le nom est obligatoire')

        user=self.model(username=username,email=self.normalize_email(email))
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self,username, email,password=None):
        user = self.create_user(
            
            email,
            username,
            password=password,
        )
        user.is_staff = True
        user.is_superuser = True
        user.save(using=self._db)
        return user
    def email_user(self, *args, **kwargs):
        send_mail(
        '{}'.format(args[0]),
        '{}'.format(args[1]),
        '{}'.format(args[2]),
        [self.email],
        fail_silently=False,
    )



class User(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(_('email address'), unique=True)
    username = models.CharField(_('username '), max_length=30,unique=True)
    first_name = models.CharField(_('first name'), max_length=30, blank=True)
    last_name = models.CharField(_('last name'), max_length=30, blank=True)
    date_joined = models.DateTimeField(_('date joined'), auto_now_add=True)
    is_active = models.BooleanField(_('active'), default=True)
    avatar = models.FileField(upload_to='avatars/', null=True, blank=True)
    signature_former = models.BooleanField(default=False)
    phone_number = models.CharField(max_length=20)
    Adress = models.CharField(max_length=20)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now_add=True)
    
    trainee_level = models.CharField(max_length=40)
    is_admin_simple = models.BooleanField(default=False)
    is_client = models.BooleanField(default=False)
    
    is_formateur = models.BooleanField(default=False)
    is_planificateur = models.BooleanField(default=False)
    is_sup_planificateur = models.BooleanField(default=False)
    

    objects = UserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    session_token = models.CharField(max_length=10, default=0)

    active = models.BooleanField(default=True)
    
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False) 

    # fontction personalisé pour envoie des messages à l'utilisateur
    def email_user(self, *args, **kwargs):
        send_mail(
        '{}'.format(args[0]),
        '{}'.format(args[1]),
        '{}'.format(args[2]),
        [self.email],
        fail_silently=False,
    )

    objects = UserManager()

    def __str__(self):
        return self.email
    def tokens(self):
        return ''

