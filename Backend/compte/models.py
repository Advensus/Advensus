from audioop import maxpp
from django.db import models
from pkg_resources import require
from .utilisateur import User
from .training import formation
import uuid
from django.conf import settings

import os

# class souscriptionliaison(models.Model):
   
#     utilisateur = models.ForeignKey(User,on_delete=models.CASCADE)
#     formation = models.ForeignKey(formation,on_delete=models.CASCADE)



    # souscriptionliaison = models.ManyToManyField(souscriptionliaison,related_name='souscription_content_type')


class Presence(models.Model):
    id= models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    stagiaireform = models.ForeignKey(User,on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    deleted_at = models.DateTimeField(auto_now=True)
class Courses(models.Model):
    id= models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    superviser = models.ForeignKey(User,on_delete=models.CASCADE,related_name='superviser')
    assister = models.ForeignKey(User,related_name='assister',on_delete=models.CASCADE,null=True)
    # etablir = models.OneToOneField(Presence,on_delete=models.CASCADE)
    lier = models.ForeignKey(formation,on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    deleted_at = models.DateTimeField(auto_now=True)
    def __str__(self):
        return self.lier.intitule
class reservation(models.Model):
    id= models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    title = models.CharField(max_length=120)
    description = models.CharField(max_length=255, null=True)
    # reserver = models.ManyToManyField(User,related_name='reservation_content_type')
    status = models.CharField(max_length=30)
    annuler = models.BooleanField(default=False)
    start_date = models.DateTimeField(auto_now_add=False)
    end_date = models.DateTimeField(auto_now_add=False)
    proposer = models.ForeignKey(User,on_delete=models.CASCADE,related_name='proposer_content_type',null=True,default=False)
    concerner = models.OneToOneField(Courses,on_delete=models.CASCADE,related_name='reservation')
    # concerner = models.OneToOneField(settings.COURSES,on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    deleted_at = models.DateTimeField(auto_now=True)


    # formateur = models.ForeignKey(Formateur,on_delete=models.CASCADE)
    

# def blue_upload_to(instance, filename):
#     doc_generate = instance.document.some_field
#     return doc_generate + os.sep + filename

class Document(models.Model):
    id= models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    path = models.FileField()
    sign = models.FileField(upload_to="signing/", null=True)
    doc_categorie = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    deleted_at = models.DateTimeField(auto_now=True)
    appartenir = models.ForeignKey(User,on_delete=models.CASCADE,related_name='appartenir_content_type')
    partager = models.ForeignKey(User,on_delete=models.CASCADE,related_name='partager_content_type',null=True)
   


        
class Opinion(models.Model):
    id= models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    rapporter = models.ForeignKey(Courses,on_delete=models.CASCADE)
    donner = models.ForeignKey(User,on_delete=models.CASCADE)
    rate = models.IntegerField(default=0)
    mind = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    deleted_at = models.DateTimeField(auto_now=True)
    
# class relationtable(models.Model):
#     id= models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
#     formateur = models.ForeignKey(User,on_delete=models.CASCADE)
#     formation = models.ForeignKey(formation,on_delete=models.CASCADE)

class WeekleSchedule(models.Model):
    id= models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    monday = models.CharField(max_length=250, null= True)
    tuesday = models.CharField(max_length=250, null= True)
    wednesday = models.CharField(max_length=250, null= True)
    thursday = models.CharField(max_length=250, null= True)
    friday = models.CharField(max_length=250, null= True)
    saturday = models.CharField(max_length=250, null= True)
    sunday = models.CharField(max_length=250,null= True)
    attached = models.OneToOneField(User,on_delete=models.CASCADE,related_name='trainer_related_schedule')
# Create your models here.
