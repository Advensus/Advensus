from django.db import models
from .user import User

class Organisme(models.Model):
    company_name = models.CharField(max_length=100,unique=True)
    company_adress = models.CharField(max_length=50,unique=True)
    phone_number = models.CharField(max_length=50,unique=True)
    fix_number = models.CharField(max_length=50,unique=True)
    company_stamp = models.FileField(upload_to="company_stamp/")
    company_logo = models.FileField(upload_to="company_logo/")
    is_organisme = models.BooleanField(default=False)
class Formateur(models.Model):
    user = models.OneToOneField(User,on_delete=models.CASCADE)
    
    appartenir = models.ManyToManyField(Organisme)