from audioop import maxpp
from django.db import models

class Organisme(models.Model):
    company_name = models.CharField(max_length=100)
    company_adress = models.CharField(max_length=50)
    phone_number = models.CharField(max_length=50)
    fix_number = models.CharField(max_length=50)
    company_stamp = models.FileField(upload_to="company_stamp/")
    company_logo = models.FileField(upload_to="company_logo/")

class formateur(models.Model):
    competence = models.CharField(max_length=20)



# Create your models here.
