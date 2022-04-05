from django.db import models
from .user import User

class Organisme(models.Model):
    company_name = models.CharField(max_length=100)
    company_adress = models.CharField(max_length=50)
    phone_number = models.CharField(max_length=50)
    fix_number = models.CharField(max_length=50)
    company_stamp = models.FileField(upload_to="company_stamp/")
    company_logo = models.FileField(upload_to="company_logo/")


class Formateur(models.Model):
    user = models.OneToOneField(User,on_delete=models.CASCADE)
    competence = models.CharField(max_length=20)
    horaire = models.TimeField(auto_now_add=False)
    signature_former = models.FileField(upload_to="signature_former/")
    cv = models.FileField(upload_to="cv/")
    appartenir = models.ManyToManyField(Organisme)