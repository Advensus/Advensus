from ctypes import addressof, c_void_p
from dataclasses import field

from .cours import formation

from .societe import Organisme
from rest_framework import serializers
from .model import User
from django.contrib import auth
from rest_framework.exceptions import AuthenticationFailed
from .models import Document
from rest_framework_simplejwt.tokens import RefreshToken,TokenError




# Sign Up Users
class AddStagiaire(serializers.ModelSerializer):
    
    username = serializers.CharField(max_length=60)
    email = serializers.CharField(max_length=60)
    adress = serializers.CharField(max_length=60)
    phone_number = serializers.CharField(max_length=60)
    password= serializers.CharField(max_length=60, min_length=8,write_only=True)
    first_name= serializers.CharField(max_length=60)
    id = serializers.UUIDField(read_only=True)

    class Meta:
        model = User
        fields = ['username','first_name','email','phone_number','adress','password','id']

    def validate(self,attrs):
        email = attrs.get('email','')
        username = attrs.get('username','')
        first_name = attrs.get('first_name','')
        
            
        if not username.isalnum():
            raise serializers.ValidationError('Le nom ne peut contenir que des caractère alphanumerique')
                
        
        return attrs
    def create(self,validated_data):
        return User.objects.create_user1(**validated_data)

class AddRp(serializers.ModelSerializer):
    username = serializers.CharField(max_length=60)
    email = serializers.CharField(max_length=60)
    adress = serializers.CharField(max_length=60)
    phone_number = serializers.CharField(max_length=60)
    password= serializers.CharField(max_length=60, min_length=8,write_only=True)
    first_name= serializers.CharField(max_length=60)
    id = serializers.UUIDField(read_only=True)

    class Meta:
        model = User
        fields = ['username','first_name','email','phone_number','adress','password','id']
    def get_cleaned_data(self):
        data = super(AddRp, self).get_cleaned_data()
        return data

    def create(self,validate_data):
        return User.objects.create_user5(**validate_data)

class AddSrp(serializers.ModelSerializer):
    username = serializers.CharField(max_length=60)
    email = serializers.CharField(max_length=60)
    adress = serializers.CharField(max_length=60)
    phone_number = serializers.CharField(max_length=60)
    password= serializers.CharField(max_length=60, min_length=8,write_only=True)
    first_name= serializers.CharField(max_length=60)
    id = serializers.UUIDField(read_only=True)

    class Meta:
        model = User
        fields = ['username','first_name','email','phone_number','adress','password','id']
    def get_cleaned_data(self):
        data = super(AddSrp, self).get_cleaned_data()
        return data

    def create(self,validate_data):
        return User.objects.create_user4(**validate_data)

           

class AddOrg(serializers.ModelSerializer):
  
    class Meta:
        model = Organisme
        fields = ['company_name','company_adress','phone_number','fix_number']
        
    
    def get_cleaned_data(self):
            data = super(AddOrg).get_cleaned_data()
            return data

    def save(self):
            societe = super(AddOrg, self).save()
            societe.is_organisme = True
            societe.save()

class AddAdmin(serializers.ModelSerializer):
    username = serializers.CharField(max_length=60)
    email = serializers.CharField(max_length=60)
    adress = serializers.CharField(max_length=60)
    phone_number = serializers.CharField(max_length=60)
    password= serializers.CharField(max_length=60, min_length=8,write_only=True)
    first_name= serializers.CharField(max_length=60)
    id = serializers.UUIDField(read_only=True)
   
    class Meta:
        model = User
        fields =  ['username','first_name','email','phone_number','adress','password','organisme','id']
        
    
    def get_cleaned_data(self):
            data = super(AddAdmin).get_cleaned_data()
            return data

    def create(self,validate_data):
        return User.objects.create_user3(**validate_data)




            
        
class AddFormateur(serializers.ModelSerializer):
    username = serializers.CharField(max_length=60)
    email = serializers.CharField(max_length=60)
    adress = serializers.CharField(max_length=60)
    phone_number = serializers.CharField(max_length=60)
    password= serializers.CharField(max_length=60, min_length=8,write_only=True)
    first_name= serializers.CharField(max_length=70)
    id = serializers.UUIDField(read_only=True)
  
    class Meta:
        model = User
        fields = ['username','first_name','email','phone_number','adress','password','horaire','competence','cv','id']

    def create(self,validate_data):
        return User.objects.create_user2(**validate_data)
            




class EmailVerificationSerializer(serializers.ModelSerializer):
    token = serializers.CharField(max_length=555)

    class Meta:
        model = User
        fields = ['token']


# Login Users
class login(serializers.ModelSerializer): 
    email = serializers.EmailField(max_length=50)
    password = serializers.CharField(max_length=20, write_only=True)
    username = serializers.CharField(max_length=60, min_length=8,read_only=True)
    tokens = serializers.CharField(max_length=60,read_only=True)
    user_type = serializers.CharField(max_length=60,read_only=True)
    is_superuser = serializers.BooleanField(read_only=True)
    is_active = serializers.BooleanField(read_only=True)
    id = serializers.UUIDField(read_only=True)
    class Meta:
        model = User
        fields = ['username','email','password','tokens','user_type','is_superuser','is_active','id']

    def validate(self,attrs):
        email = attrs.get('email','')
        password = attrs.get('password','')
        user = auth.authenticate(email=email,password=password)

        if not user:
            raise AuthenticationFailed('donnée incorrecte...')
        if not user.is_active:
            raise AuthenticationFailed('compte non activé...')
        return user
       
# CRUD Operations

class crudformation(serializers.ModelSerializer):
    test_oral = serializers.BooleanField()
    duration = serializers.CharField()
    id = serializers.UUIDField(read_only=True)
    
    class Meta:
        model = formation
        fields = ['edof','intitule','duration','start_session','end_session','test_oral','id']

        # def validate(self,attrs):
        #     test_oral = attrs.get('test_oral',)
        #     duration = attrs.get('duration')

        #     if duration < 4:
        #         test_oral = True
        #     else


class cruduser(serializers.ModelSerializer):
    
    class Meta:
        model = User
        fields = ["id","email","username","first_name","is_active",
                 "avatar","phone_number","adress","horaire","signature_former","cv",
                 "user_type","competence","trainee_level","session_token","organisme",
                 ]

        
            
        


class cruddocuments(serializers.ModelSerializer):
    id = serializers.UUIDField(read_only=True)
    class Meta:
        model = Document
        fields = ['doc_content','doc_type','id']

class LogoutUse(serializers.Serializer):
    refresh = serializers.CharField()
    default_error_message = {
        'Mauvais token': ('Token expiré ou invalid')
    }
    
    def validate(self,attrs):
        self.token=attrs['refresh']

        return attrs

    def save(self, **kwargs):
        try:
            RefreshToken(self.token).blacklist()
        except TokenError:
            self.fail('Mauvais token')
