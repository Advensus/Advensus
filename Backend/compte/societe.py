from django.db import models

# from django.db.models.signals import post_save
# from django.dispatch import receiver

class Organisme(models.Model):
   
    company_name = models.CharField(max_length=100,unique=True)
    company_adress = models.CharField(max_length=50,unique=True)
    phone_number = models.CharField(max_length=50,unique=True)
    fix_number = models.CharField(max_length=50,unique=True)
    company_stamp = models.FileField(upload_to="company_stamp/",null=True)
    is_organisme = models.BooleanField(default=False)

    
    def __str__(self):
        return self.company_name

# @receiver(post_save, sender=User)
# def create_user_profile(sender, instance, created, **kwargs):
#     if created:
#         Organisme.objects.create(user=instance)

# @receiver(post_save, sender=User)
# def save_user_profile(sender, instance, **kwargs):
#     instance.Organisme.save()