from dataclasses import field
from .models import Stagiaire,responsable_p,super_p
from .societe import Organisme,Formateur
from rest_framework import serializers
from .user import User

class AddStagiaire(serializers.ModelSerializer):
    password= serializers.CharField(max_length=60, min_length=8,write_only=True)
    first_name= serializers.CharField(max_length=60)

    class Meta:
        model = User
        fields = ['username','first_name','email','phone_number','adress','password']

    def validate(self,attrs):
        email = attrs.get('email','')
        username = attrs.get('username','')
        first_name = attrs.get('first_name','')
        
            
        if not username.isalnum():
            raise serializers.ValidationError('Le nom ne peut contenir que des caractère alphanumerique')
                
        
        return attrs
    def create(self,validated_data):
        return User.objects.create_user(**validated_data)

# class AddRp(serializers.ModelSerializer):
#     class Meta:
#         model = responsable_p
#         fields = ('username','first_name','email','phone_number','Adress',' is_planificateur','password')

# class AddSrp(serializers.ModelSerializer):
#     class Meta:
#         model = super_p
#         fields = ('username','first_name','email','phone_number','Adress','is_sup_planificateur','password')

# class AddOrg(serializers.ModelSerializer):
#     class Meta:
#         model = Organisme
#         fields = ('company_name','company_adress','phone_number','fix_number','is_organisme')

# class AddFormateur(serializers.ModelSerializer):
#     class Meta:
#         model = Formateur
#         fields = ('username','first_name','email','phone_number','Adress','is_sup_planificateur','password','horaire','competence','cv')