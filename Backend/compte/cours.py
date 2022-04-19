from django.db import models
from .responsable import admin_org
from .societe import Organisme,Formateur

class formation(models.Model):
    edof = models.CharField(max_length=20)
    intitule = models.CharField(max_length=20)
    duration = models.CharField(max_length=10)
    start_session = models.DateField(auto_now_add=False)
    end_session = models.DateField(auto_now_add=False)
    admin = models.ManyToManyField(admin_org)
    dispenser = models.ManyToManyField(Formateur)
    organiser = models.ManyToManyField(Organisme)
    test_oral = models.BooleanField(default=False)