from django.contrib import admin
from .models import Stagiaire,responsable_p,super_p,souscrir,Presence,reservation,Document,Classes,Opinion
from .cours import formation
from .responsable import admin_org
from .societe import Organisme,Formateur
from .user import User

class Affichage(admin.ModelAdmin):
    list_display = ('username','first_name','email','phone_number','adress','date_joined','is_active','is_superuser','is_staff','updated_at','is_admin_simple','is_client','is_formateur','is_planificateur','is_sup_planificateur','email_confirmed')
    search_fields = ['username']

class AffichageOrganisme(admin.ModelAdmin):
    list_display = ('company_name','company_adress','phone_number','fix_number','is_organisme')
    search_fields = ['company_name']


class AffichageSt(admin.ModelAdmin):
    list_display = ('user',)
    search_fields = ['username']


admin.site.register(Stagiaire,AffichageSt)
admin.site.register(responsable_p)
admin.site.register(super_p)
admin.site.register(souscrir)
admin.site.register(Presence)
admin.site.register(Document)
admin.site.register(reservation)
admin.site.register(Classes)
admin.site.register(Opinion)
admin.site.register(formation)
admin.site.register(admin_org)
admin.site.register(Organisme,AffichageOrganisme)
admin.site.register(Formateur)
admin.site.register(User,Affichage)
