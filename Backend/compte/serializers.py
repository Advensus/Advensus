from dataclasses import field
from .models import Stagiaire,responsable_p,super_p
from .societe import Organisme,Formateur
from rest_framework import serializers
from .user import User






# class AddStagiaire(serializers.ModelSerializer):
#     stagiaire = serializers.PrimaryKeyRelatedField(read_only=True,) #by default allow_null = False
#     username = serializers.CharField(max_length=60)
#     email = serializers.CharField(max_length=60)
#     adress = serializers.CharField(max_length=60)
#     phone_number = serializers.CharField(max_length=60)
#     password= serializers.CharField(max_length=60, min_length=8,write_only=True)
#     first_name= serializers.CharField(max_length=60)

#     class Meta:
#         model = Stagiaire
#         fields = ['username','first_name','email','phone_number','adress','password','stagiaire']
   
    
#     def get_cleaned_data(self):
#             data = super(AddStagiaire, self).get_cleaned_data()
#             extra_data = {
#                 'trainee_level' : self.validated_data.get('trainee_level', ''),
               
#             }
#             data.update(extra_data)
#             return data

#     def save(self, request):
#         user = super(AddStagiaire, self).save()
#         user.is_client = True
#         user.save()
#         stagiaire = Stagiaire(stagiaire=user,  trainee_level=self.cleaned_data.get('trainee_level'))
#         stagiaire.save()
#         return user

class AddStagiaire(serializers.ModelSerializer):

    username = serializers.CharField(max_length=60)
    email = serializers.CharField(max_length=60)
    adress = serializers.CharField(max_length=60)
    phone_number = serializers.CharField(max_length=60)
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
        return User.objects.create_user1(**validated_data)

# class AddRp(serializers.ModelSerializer):
#     class Meta:
#         model = responsable_p
#         fields = ('username','first_name','email','phone_number','Adress',' is_planificateur','password')

# class AddSrp(serializers.ModelSerializer):
#     class Meta:
#         model = super_p
#         fields = ('username','first_name','email','phone_number','Adress','is_sup_planificateur','password')

class AddOrg(serializers.ModelSerializer):
    class Meta:
        model = Organisme
        fields = ['company_name','company_adress','phone_number','fix_number','is_organisme']
    def get_cleaned_data(self):
            data = super(AddOrg, self).get_cleaned_data()
            return data

    def save(self, request):
            societe = super(AddOrg, self).save()
            societe.is_organisme = True
            societe.save()
        
class AddFormateur(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username','first_name','email','phone_number','adress','password','horaire','competence','cv']
    def get_cleaned_data(self):
            data = super(AddFormateur, self).get_cleaned_data()
            return data

    def save(self, request):
            user = super(AddFormateur, self).save()
            user.is_formateur = True
            user.save()
            formateur = User(formateur=user)
            formateur.save()
            return formateur
    # username = serializers.CharField(max_length=60)
    # email = serializers.CharField(max_length=60)
    # adress = serializers.CharField(max_length=60)
    # phone_number = serializers.CharField(max_length=60)
    # password= serializers.CharField(max_length=60, min_length=8,write_only=True)
    # first_name= serializers.CharField(max_length=60)
    
    
    # class Meta:
    #     model = User
    #     fields = ['username','first_name','email','phone_number','adress','password','horaire','competence','cv']

    #     def validate(self,attrs):
    #         email = attrs.get('email','')
    #         username = attrs.get('username','')
    #         first_name = attrs.get('first_name','')
        
            
    #         if not username.isalnum():
    #             raise serializers.ValidationError('Le nom ne peut contenir que des caractère alphanumerique')
    #         return attrs
    #     def create(self,validated_data):
    #         return User.objects.create_user(**validated_data)



