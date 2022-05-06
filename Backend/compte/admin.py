from django.contrib import admin
from .models import souscrir,Presence,reservation,Document,Courses,Opinion
from .training import formation
from .company import *
from .utilisateur import User

class Affichage(admin.ModelAdmin):
    list_display = ('username','first_name','email','phone_number','adress','date_joined','is_active','is_superuser','user_type','is_staff','updated_at','email_confirmed','societe_formation','is_autorise')
    search_fields = ['username']

class AffichageSociete(admin.ModelAdmin):
    list_display = ('company_name','company_adress','phone_number','fix_number')
    search_fields = ['company_name']



admin.site.register(souscrir)
admin.site.register(Presence)
admin.site.register(Document)
admin.site.register(reservation)
admin.site.register(Courses)
admin.site.register(Opinion)
admin.site.register(formation)
# admin.site.register(Company,AffichageCompany)
admin.site.register(SocieteFormation,AffichageSociete)
admin.site.register(OrganismeFormation)
admin.site.register(User,Affichage)
