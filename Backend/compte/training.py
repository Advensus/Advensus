import uuid
from django.db import models

from .company import OrganismeFormation
# from .utilisateur import User
class formation(models.Model):
    id= models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False,unique=True)
    intitule = models.CharField(max_length=20)
  
    # dispenser = models.ManyToManyField(User,related_name='dispenser_content_type')
    # coordonner = models.ManyToManyField(User,related_name='admin_content_type')
    organiser = models.ManyToManyField(OrganismeFormation,related_name='organiser_content_type')

    def __str__(self):
        return self.intitule

class certificate(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False,unique=True)
    intitule = models.CharField(max_length=100)
    objectif = models.TextField(max_length=255)
    code = models.CharField(max_length=50)
    competence_atteste = models.CharField(max_length=100)
    modalite_evaluation = models.CharField(max_length=100)
    allouer = models.ManyToManyField(formation,related_name='certification')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    deleted_at = models.DateTimeField(auto_now=True)
    def __str__(self):
        return self.intitule

class programme(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False,unique=True)
    libelle = models.CharField(max_length=100)
    description = models.TextField(max_length=255)
    attribue = models.ForeignKey(certificate,on_delete=models.CASCADE,related_name='programmes')
    training = models.ForeignKey(formation, on_delete=models.CASCADE, related_name='training_content')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    deleted_at = models.DateTimeField(auto_now=True)
    def __str__(self):
        return self.libelle