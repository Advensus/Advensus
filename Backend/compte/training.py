import uuid
from django.db import models

from .company import OrganismeFormation
# from .utilisateur import User
class formation(models.Model):
    id= models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False,unique=True)
    intitule = models.CharField(max_length=20)
  
    # dispenser = models.ManyToManyField(User,related_name='dispenser_content_type')
    # coordonner = models.ManyToManyField(User,related_name='admin_content_type')
    organiser = models.ManyToManyField(OrganismeFormation,related_name='organiser_content_type')

    def __str__(self):
        return self.intitule