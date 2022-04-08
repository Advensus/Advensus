from django.contrib import admin
from .models import Stagiaire,responsable_p,super_p,souscrir,Presence,reservation,Document,Classes,Opinion
from .cours import formation
from .responsable import admin_org
from .societe import Organisme,Formateur




admin.site.register(Stagiaire)
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
admin.site.register(Organisme)
admin.site.register(Formateur)
admin.site.register(Stagiaire)
admin.site.register(Stagiaire)
admin.site.register(Stagiaire)
admin.site.register(Stagiaire)
admin.site.register(Stagiaire)