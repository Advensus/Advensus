from django.db import models


class Organisme(models.Model):
    company_name = models.CharField(max_length=100,unique=True)
    company_adress = models.CharField(max_length=50,unique=True)
    phone_number = models.CharField(max_length=50,unique=True)
    fix_number = models.CharField(max_length=50,unique=True)
    company_stamp = models.FileField(upload_to="company_stamp/",null=True)
    is_organisme = models.BooleanField(default=False)

    
    def __str__(self):
        return self.company_name