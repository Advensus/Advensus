from audioop import maxpp
from django.db import models
from .model import User
from .training import formation

class souscriptionLiaison(models.Model):
    utilisateur = models.ForeignKey(User,on_delete=models.CASCADE)
    formation = models.ForeignKey(formation,on_delete=models.CASCADE)


class souscrir(models.Model):
    edof = models.CharField(max_length=50)
    training_status = models.CharField(max_length=50)
    hour_worked = models.CharField(max_length=50)
    duration = models.CharField(max_length=50)
    start_session = models.DateField(auto_now_add=False)
    end_session = models.DateField(auto_now_add=False)
    test_oral = models.BooleanField(default=False)
    souscriptionliaison = models.ManyToManyField(souscriptionLiaison,related_name='souscription_content_type')



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

class Courses(models.Model):
    superviser = models.ForeignKey(User,on_delete=models.CASCADE,related_name='superviser_content_type')
    assister = models.ManyToManyField(User,related_name='assister_content_type')
    etablir = models.OneToOneField(Presence,on_delete=models.CASCADE)
    reservation_cours = models.OneToOneField(reservation,on_delete=models.CASCADE)
    lier = models.ForeignKey(formation,on_delete=models.CASCADE)

class Opinion(models.Model):
    rapporter = models.ForeignKey(Courses,on_delete=models.CASCADE)
    donner = models.ForeignKey(User,on_delete=models.CASCADE)
    rate = models.IntegerField(default=0)
    mind = models.CharField(max_length=255)
    

# Create your models here.
