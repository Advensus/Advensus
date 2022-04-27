from django.db import models

from .societe import Organisme
from .model import User
import uuid
class formation(models.Model):
    id= models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    edof = models.CharField(max_length=20)
    intitule = models.CharField(max_length=20)
    duration = models.CharField(max_length=10)
    start_session = models.DateField(auto_now_add=False)
    end_session = models.DateField(auto_now_add=False)
    admin = models.ManyToManyField(User,related_name='admin_content_type')
    dispenser = models.ManyToManyField(User,related_name='dispenser_content_type')
    organiser = models.ManyToManyField(Organisme,related_name='organiser_content_type')
    test_oral = models.BooleanField(default=False)

    