from audioop import maxpp
from django.db import models
from .user import User
from .cours import formation
from .responsable import admin_org
from .societe import Organisme,Formateur

class Stagiaire(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    trainee_level = models.CharField(max_length=50)
    provenir = models.ManyToManyField(Organisme)
    collaborer = models.ManyToManyField(Formateur)
 
  
    
class responsable_p(models.Model):
    user = models.OneToOneField(User,on_delete=models.CASCADE)
    affecter = models.ManyToManyField(Stagiaire)

class super_p(models.Model):
    user = models.OneToOneField(User,on_delete=models.CASCADE)

class souscrir(models.Model):
    training_status = models.CharField(max_length=20)
    hour_worked = models.CharField(max_length=20)
    training_type = models.CharField(max_length=20)
    statigiaire = models.ForeignKey(Stagiaire,on_delete=models.CASCADE)
    format = models.ForeignKey(formation,on_delete=models.CASCADE)



class Presence(models.Model):
    stagiaire = models.ForeignKey(Stagiaire,on_delete=models.CASCADE)
    formateur = models.ForeignKey(Formateur,on_delete=models.CASCADE)
    

class reservation(models.Model):
    reservation = models.ManyToManyField(responsable_p)
    status = models.CharField(max_length=30)
    annuler = models.BooleanField(default=False)
    proposer = models.ForeignKey(Stagiaire,on_delete=models.CASCADE)
    proposer = models.ForeignKey(Formateur,on_delete=models.CASCADE)
    etablir = models.OneToOneField(Presence,on_delete=models.CASCADE)
   

class Document(models.Model):
    doc_type = models.FileField(upload_to="doc_type/")
    doc_content = models.CharField(max_length=255)
    administrer = models.ManyToManyField(admin_org)
    partager = models.ForeignKey(Formateur,on_delete=models.CASCADE)
    emarger = models.ForeignKey(Stagiaire,on_delete=models.CASCADE)

class Classes(models.Model):
    superviser = models.ForeignKey(Formateur,on_delete=models.CASCADE)
    assister = models.ManyToManyField(Stagiaire)
    etablir = models.OneToOneField(Presence,on_delete=models.CASCADE)
    reservation_classe = models.OneToOneField(reservation,on_delete=models.CASCADE)
    lier = models.ForeignKey(formation,on_delete=models.CASCADE)
class Opinion(models.Model):
    rapporter = models.ForeignKey(Classes,on_delete=models.CASCADE)
    donner = models.ForeignKey(Stagiaire,on_delete=models.CASCADE)
    rate = models.IntegerField(default=0)
    mind = models.CharField(max_length=255)
    

# Create your models here.
