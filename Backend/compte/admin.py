from django.contrib import admin
from .models import souscrir,Presence,reservation,Document,Classes,Opinion
from .cours import formation
from .societe import Organisme
from .user import User

class Affichage(admin.ModelAdmin):
    list_display = ('username','first_name','email','phone_number','adress','date_joined','is_active','is_superuser','is_staff','updated_at','is_admin_simple','is_client','is_formateur','is_planificateur','is_sup_planificateur','email_confirmed','organisme')
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
