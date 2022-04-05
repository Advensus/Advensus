from audioop import maxpp
from django.db import models
from .user import User
from .model import Organisme



class Formateur(models.Model):
    user = models.OneToOneField(User,on_delete=models.CASCADE)
    competence = models.CharField(max_length=20)
    horaire = models.TimeField(auto_now_add=False)
    signature_former = models.ImageField(upload_to="signature_former/")
    cv = models.FileField(upload_to="cv/")
    appartenir = models.ManyToManyField(Organisme)
    
    
    
    

class Stagiaire(models.Model):
    user = models.OneToOneField(User)
    trainee_level = models.CharField(max_length=50)
    provenir = models.ManyToManyField(Organisme)
    collaborer = models.ManyToManyField(Formateur)
  
    


class Admin(models.Model):
    user = models.OneToOneField(User,on_delete=models.CASCADE)
    organisme = models.ForeignKey(Organisme, on_delete=models.CASCADE)


class responsable_p(models.Models):
    user = models.OneToOneField(User,on_delete=models.CASCADE)
    affecter = models.ManyToManyField(Stagiaire)

class super_p(models.Models):
    user = models.OneToOneField(User,on_delete=models.CASCADE)

class souscrir(models.Model):
    training_status = models.CharField(max_length=20)
    hour_worked = models.CharField(max_length=20)
    training_type = models.CharField(max_length=20)
    statigiaire = models.ForeignKey(Stagiaire)
    formation = models.ForeignKey(formation)

class formation(models.Model):
    edof = models.CharField(max_length=20)
    intitulé = models.CharField(max_length=20)
    duration = models.CharField(max_length=10)
    start_session = models.DateField(auto_now_add=False)
    end_session = models.DateField(auto_now_add=False)
    admin = models.ManyToManyField(Admin)
    dispenser = models.ManyToManyField(Formateur)

class Presence(models):
    stagiaire = models.ForeignKey(Stagiaire,on_delete=models.CASCADE)
    formateur = models.ForeignKey(Formateur,on_delete=models.CASCADE)

class reservation(models.Model):
    reservation = models.ManyToManyField(responsable_p)
    status = models.CharField(max_length=30)
    annuler = models.BooleanField(default=False)
    proposer = models.ForeignKey(Stagiaire,on_delete=models.CASCADE)
    proposer = models.ForeignKey(Formateur,on_delete=models.CASCADE)

class document(models.Model):
    doc_type = models.FileField(upload_to="doc_type/")
    doc_content = models.CharField(max_length=50)
    administrer = models.ManyToManyField(Admin)
    partager = models.ForeignKey(Formateur,on_delete=models.CASCADE)
    emarger = models.ForeignKey(Stagiaire,on_delete=models.CASCADE)

class Classes(models.Model):
    superviser = models.ForeignKey(Formateur)

# Create your models here.
