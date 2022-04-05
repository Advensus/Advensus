from django.db import models
from .user import User
from .models import formation


class Organisme(models.Model):
    company_name = models.CharField(max_length=100)
    company_adress = models.CharField(max_length=50)
    phone_number = models.CharField(max_length=50)
    fix_number = models.CharField(max_length=50)
    company_stamp = models.FileField(upload_to="company_stamp/")
    company_logo = models.FileField(upload_to="company_logo/")
    organiser = models.ManyToManyField(formation)