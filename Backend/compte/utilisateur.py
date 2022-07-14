from __future__ import unicode_literals

import uuid

from django.db import models
from django.core.mail import send_mail

from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin

from django.contrib.auth.base_user import AbstractBaseUser

from django.utils.translation import gettext_lazy as _ 

from rest_framework_simplejwt.tokens import RefreshToken
from .company import SocieteFormation, OrganismeFormation
from .training import formation
from django.conf import settings

# classe de modification de gestion des utilisateur par defaut de django
class UserManager(BaseUserManager):

    def create_user1(self,email,username,first_name=None,adress=None,phone_number=None,password=None):
        if email is None:
            raise TypeError('Mail est obligatoire')
        if username is None:
            raise TypeError('Nom est bligatoire')

        user=self.model(username=username,email=self.normalize_email(email), first_name=first_name,adress=adress,phone_number=phone_number)
        user.user_type= 'is_client'
        user.set_password(password)
        user.save(using=self._db)
        return user
        
    def create_user2(self,email,username,first_name=None,adress=None,phone_number=None,password=None, horaire=None,cv=None):
        if email is None:
            raise TypeError('le mail est obligatoire')
        if username is None:
            raise TypeError('le nom est obligatoire')

        
        user=self.model(username=username,email=self.normalize_email(email), first_name=first_name,adress=adress,phone_number=phone_number,horaire=horaire,cv=cv)
        user.user_type= 'is_formateur'
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_user3(self,email,username,first_name=None,adress=None,phone_number=None,password=None,societe=None):
        if email is None:
            raise TypeError('le mail est obligatoire')
        if username is None:
            raise TypeError('le nom est obligatoire')

        user=self.model(username=username,email=self.normalize_email(email), first_name=first_name,adress=adress,phone_number=phone_number,societe=societe)
        user.user_type= 'is_admin'
        user.is_autorise  = True
        user.set_password(password)
        user.save(using=self._db)
      
        return user
    def create_user4(self,email,username,first_name=None,adress=None,phone_number=None,password=None):
        if email is None:
            raise TypeError('Le mail est obligatoire')
        if username is None:
            raise TypeError('Le nom est bligatoire')

        user=self.model(username=username,email=self.normalize_email(email), first_name=first_name,adress=adress,phone_number=phone_number)
        user.user_type = 'is_sup_planificateur'
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_user5(self,email,username,first_name=None,adress=None,phone_number=None,password=None):
        if email is None:
            raise TypeError('Le mail est obligatoire')
        if username is None:
            raise TypeError('Le nom est bligatoire')

        user=self.model(username=username,email=self.normalize_email(email), first_name=first_name,adress=adress,phone_number=phone_number)
        user.user_type= 'is_planificateur'
        user.set_password(password)
        user.save(using=self._db)
        return user
    

    def create_admin(self,email,username,first_name=None,adress=None,phone_number=None,password=None):
        if email is None:
            raise TypeError('Le mail est obligatoire')
        if username is None:
            raise TypeError('Le nom est obligatoire')
        user = self.model(username=username,email=self.normalize_email(email),first_name=first_name,adress=adress,phone_number=phone_number)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self,username,email,first_name,adress,phone_number,password=None):
        user = self.create_admin(
            
            email,
            username,
            first_name,
            adress,
            phone_number,
            password=password,

        )
        user.is_staff = True
        user.is_superuser= True
        user.is_autorise  = True
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

    def create_souscription(self,edof,training_status=None,hour_worked=None,duration=None,start_session=None,end_session=None,test_oral=None):
        if edof is None:
            raise TypeError('Le mail est obligatoire')
        
        s = self.model(edof=edof,training_status=training_status,hour_worked=hour_worked,adress=duration,start_session=start_session,end_session=end_session,test_oral=test_oral)
        s.save(using=self._db)
        return s

class souscrir(models.Model):
    id =  models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    edof = models.CharField(max_length=50 ,unique=True)
    training_status = models.CharField(max_length=150, default="Accepté")
    hour_worked = models.CharField(max_length=50, default="0")
    duration = models.CharField(max_length=50)
    start_session = models.DateField(auto_now_add=False)
    end_session = models.DateField(auto_now_add=False)
    test_oral = models.BooleanField(default=False)
    stagiaire = models.ForeignKey(settings.AUTH_USER_MODEL ,related_name='souscrirs',on_delete=models.CASCADE)
    formation = models.ForeignKey(formation,on_delete=models.CASCADE)
    level_start = models.CharField(max_length=50)
    level_end = models.CharField(max_length=50)
    lieu_formation = models.CharField(max_length=100)
    montant_formation=models.CharField(max_length=250, null=True)
    solde = models.CharField(max_length=200, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    deleted_at = models.DateTimeField(auto_now=True)
    
    # organisme_sous = models.ForeignKey(OrganismeFormation,on_delete=models.CASCADE)
class User(AbstractBaseUser, PermissionsMixin):
    id= models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    email = models.EmailField(_('email address'), unique=True)
    username = models.CharField(_('username '), max_length=30,unique=True)
    first_name = models.CharField(_('first name'), max_length=30, blank=True,null=True)
    last_name = models.CharField(_('last name'), max_length=30, blank=True)
    date_joined = models.DateTimeField(_('date joined'), auto_now_add=True)
    email_confirmed = models.BooleanField(default=False)
    is_active = models.BooleanField(_('active'), default=True) 
    avatar = models.FileField(upload_to='avatars/', null=True, blank=True)
    signature_former = models.BooleanField(default=False)
    phone_number = models.CharField(max_length=20,null=True)
    adress = models.CharField(max_length=100,null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now_add=True)
    deleted_at = models.DateTimeField(auto_now=True)
    horaire = models.TimeField(auto_now_add=False,null=True)
    signature_former = models.FileField(upload_to="signature_former/")
    cv = models.FileField(upload_to="cv/",null=True)
    user_type =models.CharField(max_length=30,null=False)
  
    trainee_level = models.CharField(max_length=50)
 
    
    


    organisme_formation = models.ManyToManyField(OrganismeFormation, null=True,related_name='organisme')
    # societe_formation = models.ForeignKey(SocieteFormation, on_delete=models.CASCADE,related_name='org_content_type',null=True)
    appartenir_societe = models.ManyToManyField(SocieteFormation,related_name='appartenir_content_type',null=True)
    # souscription = models.ManyToManyField(formation,related_name="souscrir_training")
    # appartenir_organisme = models.ForeignKey(OrganismeFormation,on_delete=models.CASCADE,related_name='org_stagiare_appt_type')
    competence = models.ManyToManyField(formation,related_name='dispenser_content_type', null=True)
    societe = models.OneToOneField(SocieteFormation,on_delete=models.CASCADE,related_name='societe_admin_type',null=True)
    is_autorise = models.BooleanField(default=False)

    Rp_Stagiaire = models.ManyToManyField('self')
    objects = UserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username','first_name','adress','phone_number']

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
        return self.username
    def tokens(self):
        refresh = RefreshToken.for_user(self)
        return {
            'refresh': str(refresh),
            'access': str(refresh.access_token)
        }