import uuid
from django.db import models

# from django.db.models.signals import post_save
# from django.dispatch import receiver

class Company(models.Model):

    id= models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    company_name = models.CharField(max_length=100,unique=True)
    company_adress = models.CharField(max_length=50,unique=True)
    phone_number = models.CharField(max_length=50,unique=True)
    fix_number = models.CharField(max_length=50,unique=True)
    company_stamp = models.FileField(upload_to="company_stamp/",null=True)
    company_logo = models.FileField(upload_to="company_logo/",null=True)

    def __str__(self):
        return self.company_name
    class Meta:
        abstract = True 

# @receiver(post_save, sender=User)
# def create_user_profile(sender, instance, created, **kwargs):
#     if created:
#         Organisme.objects.create(user=instance)

# @receiver(post_save, sender=User)
# def save_user_profile(sender, instance, **kwargs):
#     instance.Organisme.save()

class SocieteFormation(Company):
    id= models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    # company_relation = models.OneToOneField(
    #     Company,
    #     on_delete=models.CASCADE,
    # )
    


class OrganismeFormation(Company):
    id= models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    # company_relation = models.OneToOneField(
    #     Company,
    #     on_delete=models.CASCADE,
    # )
    societe_formation = models.ForeignKey(SocieteFormation, on_delete=models.CASCADE)