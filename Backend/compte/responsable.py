from .user import User
from django.db import models
from .societe import Organisme

class admin_org(models.Model):
    user = models.OneToOneField(User,on_delete=models.CASCADE)
    organisme = models.ForeignKey(Organisme, on_delete=models.CASCADE)