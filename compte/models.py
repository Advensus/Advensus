from audioop import maxpp
from django.db import models
from .user import User
class Organisme(models.Model):
    company_name = models.CharField(max_length=100)
    company_adress = models.CharField(max_length=50)
    phone_number = models.CharField(max_length=50)
    fix_number = models.CharField(max_length=50)
    company_stamp = models.FileField(upload_to="company_stamp/")
    company_logo = models.FileField(upload_to="company_logo/")




class formateur(models.Model):
    user = models.OneToOneField(User,on_delete=models.CASCADE)
    competence = models.CharField(max_length=20)
    horaire = models.TimeField(auto_now_add=False)
    signature_former = models.ImageField(upload_to="signature_former/")
    cv = models.FileField(upload_to="cv/")
    appartenir = models.ManyToManyField(Organisme)
    
    

class stagiaire(models.Model):
    user = models.OneToOneField(User)
    trainee_level = models.CharField(max_length=50)
    provenir = models.ManyToManyField(Organisme)
    collaborer = models.ManyToManyField(formateur)


class admin(models.Model):
    user = models.OneToOneField(User,on_delete=models.CASCADE)
    organisme = models.ForeignKey(Organisme, on_delete=models.CASCADE)


class responsable_p(models.Models):
    user = models.OneToOneField(User,on_delete=models.CASCADE)
    affecter = models.ManyToManyField(stagiaire)

class super_p(models.Models):
    user = models.OneToOneField(User,on_delete=models.CASCADE)

class souscrir(models.Model):
    training_status = models.CharField(max_length=20)
    hour_worked = models.CharField(max_length=20)
    training_type = models.CharField(max_length=20)
    statigiaire = models.ForeignKey(stagiaire)
    formation = models.ForeignKey(formation)
class formation(models.Model):
    edof = models.CharField(max_length=20)
    intitulé = models.CharField(max_length=20)
    duration = models.CharField(max_length=10)
    start_session = models.DateField(auto_now_add=False)
    end_session = models.DateField(auto_now_add=False)
    admin = models.ManyToManyField(admin)
    dispenser = models.ManyToManyField(formateur)
# Create your models here.
