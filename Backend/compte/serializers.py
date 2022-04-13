from dataclasses import field
from rest_framework import ModelSerializer
from .models import Stagiaire,responsable_p,super_p
from .societe import Organisme,Formateur
from rest_framework import serializers

class AddStagiaire(ModelSerializer):
    password= serializers.CharField(max_length=60, min_length=8,write_only=True)
    class Meta:
        model = Stagiaire
        fields = ('username','first_name','email','phone_number','Adress','is_client','password')

    def validate(self,attrs):
        email = attrs.get('email','')
        username = attrs.get('username','')
        first_name = attrs.get('first_name','')
        phone_number = attrs.get('phone_number','')
        Adress = attrs.get('Adress','')
            
        if username.isalnum():
            raise serializers.ValidationError('Le nom ne peut contenir que des caractère alphanumerique')
                
        elif first_name.isalnum():
            raise serializers.ValidationError('Le prenom ne peut contenir que des caractère alphanumerique')
        return attrs
        

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

