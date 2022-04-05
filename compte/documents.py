from django.db import models
from .user import User
from .models import admin

class document(models.Model):
    doc_type = models.FileField(upload_to="doc_type/")
    doc_content = models.CharField(max_length=50)
    administrer = models.ManyToManyField(admin)
    