from audioop import maxpp
from django.db import models
from .utilisateur import User
from .cours import formation
import uuid
class souscrir(models.Model):
    id= models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    training_status = models.CharField(max_length=20)
    hour_worked = models.CharField(max_length=20)
    training_type = models.CharField(max_length=20)
    statigiaire = models.ForeignKey(User,on_delete=models.CASCADE)
    format = models.ForeignKey(formation,on_delete=models.CASCADE)


class Presence(models.Model):
    id= models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    stagiaireform = models.ForeignKey(User,on_delete=models.CASCADE)
    # formateur = models.ForeignKey(Formateur,on_delete=models.CASCADE)
    

class reservation(models.Model):
    id= models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    reservation = models.ManyToManyField(User,related_name='reservation_content_type')
    status = models.CharField(max_length=30)
    annuler = models.BooleanField(default=False)
    proposer = models.ForeignKey(User,on_delete=models.CASCADE,related_name='proposer_content_type')
  
    etablir = models.OneToOneField(Presence,on_delete=models.CASCADE)
   

class Document(models.Model):
    id= models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    doc_type = models.FileField(upload_to="doc_type/")
    doc_content = models.CharField(max_length=255)
    administrer = models.ManyToManyField(User,related_name='administrer_content_type')
    partager = models.ForeignKey(User,on_delete=models.CASCADE,related_name='partager_content_type')
    emarger = models.ForeignKey(User,on_delete=models.CASCADE,related_name='emarger_content_type')

class Classes(models.Model):
    id= models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    superviser = models.ForeignKey(User,on_delete=models.CASCADE,related_name='superviser_content_type')
    assister = models.ManyToManyField(User,related_name='assister_content_type')
    etablir = models.OneToOneField(Presence,on_delete=models.CASCADE)
    reservation_classe = models.OneToOneField(reservation,on_delete=models.CASCADE)
    lier = models.ForeignKey(formation,on_delete=models.CASCADE)
class Opinion(models.Model):
    id= models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    rapporter = models.ForeignKey(Classes,on_delete=models.CASCADE)
    donner = models.ForeignKey(User,on_delete=models.CASCADE)
    rate = models.IntegerField(default=0)
    mind = models.CharField(max_length=255)
    
# class relationtable(models.Model):
#     id= models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
#     formateur = models.ForeignKey(User,on_delete=models.CASCADE)
#     formation = models.ForeignKey(formation,on_delete=models.CASCADE)


# Create your models here.
