from audioop import maxpp
from django.db import models
from .user import User
from .cours import formation



  
 
 
  
    




class souscrir(models.Model):
    training_status = models.CharField(max_length=20)
    hour_worked = models.CharField(max_length=20)
    training_type = models.CharField(max_length=20)
    statigiaire = models.ForeignKey(User,on_delete=models.CASCADE)
    format = models.ForeignKey(formation,on_delete=models.CASCADE)


class Presence(models.Model):
    stagiaireform = models.ForeignKey(User,on_delete=models.CASCADE)
    # formateur = models.ForeignKey(Formateur,on_delete=models.CASCADE)
    

class reservation(models.Model):
    reservation = models.ManyToManyField(User,related_name='reservation_content_type')
    status = models.CharField(max_length=30)
    annuler = models.BooleanField(default=False)
    proposer = models.ForeignKey(User,on_delete=models.CASCADE,related_name='proposer_content_type')
  
    etablir = models.OneToOneField(Presence,on_delete=models.CASCADE)
   

class Document(models.Model):
    doc_type = models.FileField(upload_to="doc_type/")
    doc_content = models.CharField(max_length=255)
    administrer = models.ManyToManyField(User,related_name='administrer_content_type')
    partager = models.ForeignKey(User,on_delete=models.CASCADE,related_name='partager_content_type')
    emarger = models.ForeignKey(User,on_delete=models.CASCADE,related_name='emarger_content_type')

class Classes(models.Model):
    superviser = models.ForeignKey(User,on_delete=models.CASCADE,related_name='superviser_content_type')
    assister = models.ManyToManyField(User,related_name='assister_content_type')
    etablir = models.OneToOneField(Presence,on_delete=models.CASCADE)
    reservation_classe = models.OneToOneField(reservation,on_delete=models.CASCADE)
    lier = models.ForeignKey(formation,on_delete=models.CASCADE)
class Opinion(models.Model):
    rapporter = models.ForeignKey(Classes,on_delete=models.CASCADE)
    donner = models.ForeignKey(User,on_delete=models.CASCADE)
    rate = models.IntegerField(default=0)
    mind = models.CharField(max_length=255)
    

# Create your models here.
