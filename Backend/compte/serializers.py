from ctypes import addressof, c_void_p
from dataclasses import field
from email.policy import default

from .training import formation,certificate,programme

from .company import OrganismeFormation, SocieteFormation
from rest_framework import serializers
from .utilisateur import User,souscrir
from django.contrib import auth
from rest_framework.exceptions import AuthenticationFailed
from .models import Document,Courses,reservation
from rest_framework_simplejwt.tokens import RefreshToken,TokenError




from django.contrib.auth.hashers import make_password


# DATA ENTITY
class SocieteData(serializers.ModelSerializer):
    class Meta:
        model=SocieteFormation
        fields = ['id','company_name','company_adress','company_phone_number','fix_number']     
class OrganismeData(serializers.ModelSerializer):
    societe_formation = SocieteData(read_only=True)
    class Meta:
        model = OrganismeFormation 


        fields=['societe_formation']
        

#END DATA ENTITY
class crudformation(serializers.ModelSerializer):
    # test_oral = serializers.BooleanField()
    
    class Meta:
        model = formation
        fields = ['intitule','id']


                
    # def get_cleaned_data(self):
    #         data = super(Adddsouscrir).get_cleaned_data()
    #         return data

    # def save(self):
    #         s = super(Adddsouscrir, self).save()
            # societe.is_organisme = True
            # s.save()

        # def validate(self):
        #    limite = 4

        #    test = super(crudformation,self).save()
        #    if test.duration < limite:
        #        test.test_oral = True
        #        test.save()

# Sign Up Users

# class Adddsouscrir(serializers.ModelSerializer):
#     class Meta:
#         model = souscrir
#         fields = '__all__'
        
#     def get_cleaned_data(self):
#             data = super(Adddsouscrir).get_cleaned_data()
#             return data

#     def save(self):
#             s = super(Adddsouscrir, self).save()
#             if s.duration > 4:
#                 s.test_oral = True
#                 s.save()

class AddStagiaire(serializers.ModelSerializer):
    username = serializers.CharField(max_length=60)
    email = serializers.CharField(max_length=60)
    adress = serializers.CharField(max_length=60)
    phone_number = serializers.CharField(max_length=60)
    password= serializers.CharField(max_length=60, min_length=8,write_only=True)
    first_name= serializers.CharField(max_length=60)
    id = serializers.UUIDField(read_only=True)
 
    # def get_user_profile(self, obj):
    #     try:
    #         user_profile = souscrir.objects.all()
    #         return  user_profile
    #     except Exception as e:
    #         return {}
   
    class Meta:
        model = User
        fields = ['username','first_name','email','phone_number','adress','password','id','organisme_formation','Rp_Stagiaire']
        
    # def update(self,instance,validated_data):
    #     user_datas = validated_data.pop('souscrir')
    #     instance = super(AddStagiaire, self).update(instance, validated_data)
        
    #     for user_data in user_datas:
    #         user = formation.objects.filter(name__iexact=user_data['intitule'])
    #         if user.exists():
    #             s = user.first()
    #         else:
    #             souscrir = formation.objects.create(**user_data)
    #         instance.souscrir.add(souscrir)
               
    #     # return instance
    # def create(self,validated_data):
    #     formation_data = validated_data.pop('lien')
    #     user = User.objects.create_user1(**validated_data)
    #     formation.objects.create(user=user,**formation_data)
    #     return user
    # def update(self, instance, validated_data):
    #     formation_data = validated_data.pop('souscrir')
        
    #     souscrir = instance.souscrir

    #     instance.username = validated_data.get('username', instance.username)
    #     instance.email = validated_data.get('email', instance.email)
    #     instance.save()
    #     souscrir.save()

# class tout(serializers.Serializer):
#     s =  Adddsouscrir(many=True)
#     t = AddStagiaire(many=True)
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
        
        fields = ['username','first_name','email','phone_number','adress','password','appartenir_societe','id']
      
    # def get_cleaned_data(self):
    #     data = super(AddRp, self).get_cleaned_data()
    #     return data

    # def create(self,validate_data):
    #     return User.objects.create_user5(**validate_data)

class AddSrp(serializers.ModelSerializer):
    username = serializers.CharField(max_length=60)
    email = serializers.CharField(max_length=60)
    adress = serializers.CharField(max_length=60)
    phone_number = serializers.CharField(max_length=60)
    password= serializers.CharField(max_length=60, min_length=8,write_only=True)
    first_name= serializers.CharField(max_length=60)
    id = serializers.UUIDField(read_only=True)
    user_type = serializers.CharField(max_length=60,read_only=True)

    class Meta:
        model = User
        fields = ['username','first_name','email','phone_number','adress','password','id','appartenir_societe','user_type']
    # def get_cleaned_data(self):
    #     data = super(AddSrp, self).get_cleaned_data()
    #     return data

    # def create(self,validate_data):
    #     return User.objects.create_user4(**validate_data)

class AddSociete(serializers.ModelSerializer):
   
    class Meta:
        model = SocieteFormation
        fields = ['id','company_name','company_adress','company_phone_number','fix_number', 'company_stamp','company_logo']
        
    # def create(self,validate_data):
    #     return User.objects.create_user3(**validate_data)
    def get_cleaned_data(self):
            data = super(AddSociete).get_cleaned_data()
            return data

    def save(self):
            company = super(AddSociete, self).save()

            company.save()
   
    # def create(self,validated_data):
    #     admin_data = validated_data.pop('admin_societe')
    #     user = User.objects.create_user3()
    #     SocieteFormation.objects.create(user=user,**admin_data)
    #     company = super(AddSociete, self).save()

    #     company.save()
          
class AddAdmin(serializers.ModelSerializer):
    # societe = AddSociete()
    username = serializers.CharField(max_length=60)
    email = serializers.CharField(max_length=60)
    adress = serializers.CharField(max_length=60)
    phone_number = serializers.CharField(max_length=60)
    password= serializers.CharField(max_length=60, min_length=8,write_only=True)
    first_name= serializers.CharField(max_length=60)
    id = serializers.UUIDField(read_only=True)
   
    class Meta:
        model = User
        fields =  ['username','first_name','email','phone_number','adress','password','id','societe']
        
    
    # def get_cleaned_data(self):
    #         data = super(AddAdmin).get_cleaned_data()
    #         return data

    def create(self,validate_data):
        return User.objects.create_user3(**validate_data)

        
class AddFormateur(serializers.ModelSerializer):
    username = serializers.CharField(max_length=60)
    email = serializers.CharField(max_length=60)
    adress = serializers.CharField(max_length=60)
    phone_number = serializers.CharField(max_length=60)
    password= serializers.CharField(max_length=60, min_length=8,write_only=True)
    first_name= serializers.CharField(max_length=70)
    cv= serializers.FileField()
    id = serializers.UUIDField(read_only=True)
   
  
    
    class Meta:
        model = User
        fields = ['username','first_name','email','phone_number','adress','password','horaire','cv','id','competence','appartenir_societe']
       
    # def validate(self,attrs):
    #     email = attrs.get('email','')
    #     username = attrs.get('username','')
    #     first_name = attrs.get('first_name','')
        
            
    #     if not username.isalnum():
    #         raise serializers.ValidationError('Le nom ne peut contenir que des caractère alphanumerique')
    #     return attrs
    # def create(request,validate_data):
    #     user = User.objects.create_user2(**validate_data)
    #     user.set(request.user)
    #     return user
    # def create_data(self,request,validate_data):
       
    #     data = super(AddFormateur,self).get_cleaned_data()
       
    #     user = User.objects.create_user2(**validate_data)
    #     user.set(request.user)
    #     user.save()
      
    #     return data




class EmailVerificationSerializer(serializers.ModelSerializer):
    token = serializers.CharField(max_length=555)

    class Meta:
        model = User
        fields = ['token']


# Login Users

class loginuser(serializers.ModelSerializer): 
    email = serializers.EmailField(max_length=50)
    password = serializers.CharField(max_length=20, write_only=True)
    username = serializers.CharField(max_length=60, min_length=8,read_only=True)
    tokens = serializers.CharField(max_length=60,read_only=True)
    user_type = serializers.CharField(max_length=60,read_only=True)
    is_superuser = serializers.BooleanField(read_only=True)
    is_active = serializers.BooleanField(read_only=True)
    id = serializers.UUIDField(read_only=True)
    appartenir_societe = serializers.PrimaryKeyRelatedField(many=True,read_only=True)
    organisme_formation = OrganismeData(many=True,read_only=True)
    competence = serializers.PrimaryKeyRelatedField(many=True,read_only=True)
    societe = serializers.PrimaryKeyRelatedField(many=True,read_only=True)
    class Meta:
        model = User
        fields = ['username','first_name','email','password','tokens','user_type','is_superuser',
            'is_active','id', 
            'organisme_formation',
            'appartenir_societe',
            'competence',
            'societe'
        ]
        read_only_fields = ()

    def validate(self,attrs):
        email = attrs.get('email','')
        password = attrs.get('password','')
        user = auth.authenticate(email=email,password=password)

        if not user:
            raise AuthenticationFailed('donnée incorrecte...')
        if not user.is_active:
            raise AuthenticationFailed('compte non activé...')
        return user


class loginorg(serializers.ModelSerializer):
    email = serializers.EmailField(max_length=40)
    password_connexion = serializers.CharField(max_length=30,write_only=True)
    company_name = serializers.CharField(max_length=100,read_only=True)
    company_adress = serializers.CharField(max_length=50,read_only=True)
    company_phone_number = serializers.CharField(max_length=50,read_only=True)
    fix_number = serializers.CharField(max_length=50,read_only=True)
    tokens = serializers.CharField(max_length=60,read_only=True)
    id = serializers.UUIDField(read_only=True)
    
    class Meta:
        model = OrganismeFormation
        fields = ['id','email','password_connexion','company_name','company_adress','company_phone_number','fix_number','tokens']
        def validate(self,attrs):
            email = attrs.get('email','')
            password_connexion = attrs.get('password_connexion','')

            organisme = auth.authenticate(email=email,password_connexion=password_connexion)

            if not organisme:
                raise AuthenticationFailed('Donnée incorrecte')
            else:
                print("je suis connecté")
            return organisme
# CRUD Operations
class cruduser(serializers.ModelSerializer):
   
    class Meta:
        model = User
        fields = ["id","email","username","first_name","is_active",
                 "avatar","phone_number","adress","horaire","signature_former","cv",
                 "user_type","competence","trainee_level","session_token","organisme_formation",'societe'
                 ]

        
            

class CreateOrganisme(serializers.ModelSerializer):
    password_connexion = serializers.CharField(max_length=100)
    password_messagerie = serializers.CharField(max_length=100)
    # donnee_formation = SocieteData(read_only=True)
    
    
    class Meta:
        model = OrganismeFormation 


        fields = ['id','company_name','company_adress','company_phone_number','email','password_connexion','password_messagerie','societe_formation', 'fix_number','company_stamp','company_logo']
   
    def create(self,validate_data):
        organisme = super(CreateOrganisme,self).create(validate_data) 
        organisme.password_connexion = make_password('password_connexion')
        # organisme.password_messagerie = make_password('password_messagerie')
        organisme.save()
        return organisme

class CrudOrganisme(serializers.ModelSerializer):
   
    societe_formation = SocieteData(read_only=True)
    
    
    class Meta:
        model = OrganismeFormation 


        fields = ['id','company_name','company_adress','company_phone_number','email','password_connexion','password_messagerie','societe_formation', 'fix_number','company_stamp','company_logo']
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




class AddSouscrir(serializers.ModelSerializer):
   
    class Meta:
        model = souscrir

        fields = ['edof','training_status','hour_worked','duration','start_session','end_session','stagiaire','formation','certification','programme_formation','objectifs_formation','level_start','level_end','lieu_formation']

   
class CrudCourses(serializers.ModelSerializer):

    class Meta:
        model = Courses
        fields = ['id','superviser','assister','lier']



class crudreservation(serializers.ModelSerializer):

    class Meta:
        model = reservation
        fields = ['id','title','description','status','start_date','end_date','reserver','proposer','concerner']

class crudcertifcate(serializers.ModelSerializer):

    class Meta:
        model = certificate
        fields = ['id','intitule','objectif','code','competence_atteste','modalite_evaluation','allouer']

class crudcertifcate(serializers.ModelSerializer):

    class Meta:
        model = certificate
        fields = ['id','intitule','description','attribue']