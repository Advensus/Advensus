from django.contrib import admin
from .models import souscrir,Presence,reservation,Document,Classes,Opinion
from .cours import formation
from .societe import Organisme
from .model import User

class Affichage(admin.ModelAdmin):
    list_display = ('username','first_name','email','phone_number','adress','date_joined','is_active','is_superuser','user_type','is_staff','updated_at','email_confirmed','organisme','is_autorise')
    search_fields = ['username']

class AffichageOrganisme(admin.ModelAdmin):
    list_display = ('company_name','company_adress','phone_number','fix_number','is_organisme')
    search_fields = ['company_name']



admin.site.register(souscrir)
admin.site.register(Presence)
admin.site.register(Document)
admin.site.register(reservation)
admin.site.register(Classes)
admin.site.register(Opinion)
admin.site.register(formation)
admin.site.register(Organisme,AffichageOrganisme)
admin.site.register(User,Affichage)
