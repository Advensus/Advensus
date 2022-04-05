from django.db import models
from .user import User
from .models import responsable_p

class reservation(models.Model):
    reservation = models.ManyToManyField(responsable_p)
    status = models.CharField(max_length=30)
    annuler = models.BooleanField(default=False)
