# from django.db import models

# import uuid
# from django.conf import settings

# class relationtable(models.Model):
#     id= models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
#     formateur = models.ForeignKey(settings.AUTH_USER_MODEL,on_delete=models.CASCADE)
#     formation = models.ForeignKey(settings.AUTH_FORMATION,on_delete=models.CASCADE)