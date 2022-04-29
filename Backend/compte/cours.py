from django.db import models
# from .liaison import relationtable
from .societe import Organisme

import uuid
class formation(models.Model):
    id= models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    edof = models.CharField(max_length=20)
    intitule = models.CharField(max_length=20)
    duration = models.CharField(max_length=10)
    start_session = models.DateField(auto_now_add=False)
    end_session = models.DateField(auto_now_add=False)
    # formateur = models.OneToOneField(relationtable,on_delete=models.CASCADE,related_name='relation_liaison_formateur')
    organiser = models.ManyToManyField(Organisme,related_name='organiser_content_type')
    test_oral = models.BooleanField(default=False)

    def __str__(self):
        return self.edof


