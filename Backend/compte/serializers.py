from dataclasses import field
from rest_framework import ModelSerializer
from .models import Stagiaire,responsable_p,super_p
from .societe import Organisme,Formateur

class AddStagiaire(ModelSerializer):
    class Meta:
        model = Stagiaire
        fields = ('username','first_name','email','phone_number','Adress','is_client','password')

class AddRp(ModelSerializer):
    class Meta:
        model = responsable_p
        fields = ('username','first_name','email','phone_number','Adress',' is_planificateur','password')

class AddSrp(ModelSerializer):
    class Meta:
        model = super_p
        fields = ('username','first_name','email','phone_number','Adress','is_sup_planificateur','password')

class AddOrg(ModelSerializer):
    class Meta:
        model = Organisme
        fields = ('company_name','company_adress','phone_number','fix_number','is_organisme')

class AddFormateur(ModelSerializer):
    class Meta:
        model = Formateur
        fields = ('username','first_name','email','phone_number','Adress','is_sup_planificateur','password','horaire','competence','cv')

