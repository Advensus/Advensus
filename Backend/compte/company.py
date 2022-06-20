import uuid
from django.db import models
# from django.contrib.auth.models import AbstractUser
# from django.db.models.signals import post_save
# from django.dispatch import receiver

from rest_framework_simplejwt.tokens import RefreshToken
from django.conf import settings
class Company(models.Model):

    id= models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    company_name = models.CharField(max_length=100,unique=True)
    company_adress = models.CharField(max_length=50,unique=True)
    company_phone_number = models.CharField(max_length=50,unique=True)
    fix_number = models.CharField(max_length=50,unique=True)
    company_stamp = models.FileField(upload_to="company_stamp/",null=True)
    company_logo = models.FileField(upload_to="company_logo/",null=True)

    def __str__(self):
        return self.company_name
    class Meta:
        abstract = True 

# @receiver(post_save, sender=User)
# def create_user_profile(sender, instance, created, **kwargs):
#     if created:
#         Organisme.objects.create(user=instance)

# @receiver(post_save, sender=User)
# def save_user_profile(sender, instance, **kwargs):
#     instance.Organisme.save()

class SocieteFormation(Company):
    id= models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    # company_relation = models.OneToOneField(
    #     Company,
    #     on_delete=models.CASCADE,
    # )
    create_at = models.DateTimeField(auto_now_add=True)
    update_at = models.DateTimeField(auto_now=True)
    delete_at = models.DateTimeField(auto_now=True)
    



   
class OrganismeFormation(Company):
    id= models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    # company_relation = models.OneToOneField(
    #     Company,
    #     on_delete=models.CASCADE,
    
    # )
    email = models.EmailField(max_length=150)
    password_connexion = models.CharField(max_length=100)
    password_messagerie = models.CharField(max_length=100)
    societe_formation = models.ForeignKey(SocieteFormation, on_delete=models.CASCADE)
    # connected = models.OneToOneField(settings.AUTH_USER_MODEL,on_delete=models.CASCADE,default="connected")
    create_at = models.DateTimeField(auto_now_add=True)
    update_at = models.DateTimeField(auto_now=True)
    delete_at = models.DateTimeField(auto_now=True)
    def tokens(self):
        refresh = RefreshToken.for_user(self)
        return {
            'refresh': str(refresh),
            'access': str(refresh.access_token)
        }
        # return refresh.access_token