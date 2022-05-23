
from urllib import response
from django.shortcuts import render,redirect
from django.http import HttpResponse
from .company import  OrganismeFormation,SocieteFormation
from rest_framework import generics,status,views,permissions
from .serializers import AddStagiaire,AddSouscrir,AddFormateur,AddSociete,AddRp,AddSrp,EmailVerificationSerializer,AddAdmin,login,cruduser,crudformation,cruddocuments,LogoutUse,CrudOrganisme,CrudCourses
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated,IsAdminUser
from rest_framework_simplejwt.tokens import RefreshToken
from .utilisateur import User,souscrir
from .utils import Util
from django.contrib.sites.shortcuts import get_current_site
from django.urls import reverse
from rest_framework.permissions import IsAuthenticated
import jwt
from django.conf import settings
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi
from rest_framework.decorators import api_view,permission_classes
from rest_framework.generics import ListCreateAPIView,RetrieveUpdateDestroyAPIView
from .training import formation
from .models import Document,Courses
from django.views.decorators.csrf import csrf_exempt
from .permissions import autorisation
from django.http import JsonResponse

from .mixin import ReadWriteSerializerMixin
from django.template.loader import render_to_string

from rest_framework.generics import CreateAPIView,ListAPIView,DestroyAPIView,UpdateAPIView
from django.conf import settings
from django.shortcuts import get_object_or_404
def home(request):
	return HttpResponse("<h1>Advensus projet</h1>")


class RegisterStagiaire(generics.GenericAPIView):
	serializer_class = AddStagiaire
	
	def post(self,request,*args,**kwargs):
		data = request.data
		new_stagiaire = User.objects.create_user1(
			username=data['username'],
			first_name=data['first_name'],
			email=data['email'],
			phone_number=data['phone_number'],
			adress=data['adress'],
			password=data['password'],
			)
		new_stagiaire.save()

		
		
		# nom_for = formation.objects.get(intitule=data["souscrir.intitule"])
		org = OrganismeFormation.objects.get(id=data['organisme_formation'])
		rp_peda = User.objects.get(id=data["Rp_Stagiaire"])
		
		new_stagiaire.Rp_Stagiaire.add(rp_peda)
		# new_stagiaire.souscription.add(f)
		new_stagiaire.organisme_formation.add(org)

		# 	f = formation.objects.get(intitule=data["souscrir"])
		# new_stagiaire.souscrir.add(f)
		# form = formsouscrir(request.data)
		serializer =  self.serializer_class(new_stagiaire)
		# serializer.is_valid(raise_exception=True)
		# f = form.save(commit=False)
		# f.save()
		# serializer.save()
		user_data = serializer.data
		# user = User.objects.get(email=user_data['email'])
		# token = RefreshToken.for_user(user).access_token

		# current_site = get_current_site(request).domain
		# relativeLink= reverse('email-verify')
		# absurl = 'http://'+current_site+relativeLink+"?token="+str(token)
	    
		# # 
	
		# email_body =  org.company_logo.url  +"\n\n"+"Bonjour " +user.username+ " "+ user.first_name +",\n\n" +"Tout d’abord nous tenons à vous remercier de la confiance que vous nous accordez en choisissant notre organisme pour suivre votre formation :\n\n"+str(f)+ " " +"d'une durée de xx" + "\n\n"+"Vous allez être très prochainement contacté.e par votre responsable pédagogique," + str(rp_peda) + " "+  "pour :" +"\n\n"+"-Préparer au mieux votre parcours de formation en déterminant votre profil et identifiant vos attentes et besoins,\n\n"+"- Vous expliquer le déroulement de votre formation \n\n"+"- Convenir d’une date de rendez-vous avec votre formateur \n\n"+ "Votre responsable pédagogique est votre principal interlocuteur, n’hésitez pas à le joindre au"+ " "+ str(rp_peda.phone_number) + " "  +"pour toute question liée à votre formation." +"\n\n"+"Bonne journée et à bientôt !\n\n"+"L’équipe"+ " "+ str(org)+"\n\n"+"Une question ? joignez nous en complétant notre formulaire => lien vers formulaire de contact\n\n"+"Veuillez utiliser ce lien pour activer votre compte"+"\n\n"+absurl
			
		# data = {'email_body': email_body,'to_email': user.email,'email_subject': 'verifier votre adress email'+current_site}
		# Util.send_email(data)

		return Response(user_data,status=status.HTTP_201_CREATED)
       
	
class AddSouscrir(generics.GenericAPIView):
	# permission_classes = (IsAuthenticated,IsAdminUser)
	
	serializer_class = AddSouscrir
	def post(self,request):
		data= request.data
		duration = data['duration']
		# organisme_formation = data['organisme_formation']
		serializer = self.serializer_class(data=data)
		serializer.is_valid(raise_exception=True)
		serializer.save()
		
		user_data = serializer.data
		user = User.objects.get(id=data['stagiaire'])
		# org = OrganismeFormation.objects.get(id=data['organisme_sous'])
		# org__in = OrganismeFormation.objects.all()
		user_org = user.organisme_formation.all().get()
		rp_stagiaire = user.Rp_Stagiaire.all().get()
		# org_user = user_org..all()
		# print(user_org.organisme_formation.email)
		
		# print(org_user)
		# print(org__in)
		# if user.organisme_formation == org.id:
		# 	print("ok")
		
		
		# org = OrganismeFormation.objects.get(company_name=data['user_org'])
		token = RefreshToken.for_user(user).access_token
		# s = souscrir.objects.get(duration=self.duration)
		current_site = get_current_site(request).domain
		relativeLink= reverse('email-verify')
		absurl = 'http://'+current_site+relativeLink+"?token="+str(token)
	
		settings.EMAIL_HOST_USER = user_org.email
		settings.EMAIL_HOST_PASSWORD = user_org.password
		f = formation.objects.get(id=data["formation"])
		# rp_peda = User.objects.get(id=data["Rp_Stagiaire"])
		email_body = user_org.company_logo.url + "\n\n"+"Bonjour " +user.username+ " "+ user.first_name +",\n\n" +"Tout d’abord nous tenons à vous remercier de la confiance que vous nous accordez en choisissant notre organisme pour suivre votre formation :\n\n"+str(f)+ " " +"d'une durée de"+ " " +duration+ " "+ "heure(s)"+ "\n\n"+"Vous allez être très prochainement contacté.e par votre responsable pédagogique," + rp_stagiaire.username + " "+  "pour :" +"\n\n"+"-Préparer au mieux votre parcours de formation en déterminant votre profil et identifiant vos attentes et besoins,\n\n"+"- Vous expliquer le déroulement de votre formation \n\n"+"- Convenir d’une date de rendez-vous avec votre formateur \n\n"+ "Votre responsable pédagogique est votre principal interlocuteur, n’hésitez pas à le joindre au"+ rp_stagiaire.phone_number +" "+ " "  +"pour toute question liée à votre formation." +"\n\n"+"Bonne journée et à bientôt !\n\n"+"L’équipe"+ " "+ user_org.company_name + "\n\n"+"Veuillez utiliser ce lien pour activer votre compte"+"\n\n"+absurl

			
		data = {'email_body': email_body,'from_email':settings.EMAIL_HOST_USER ,'to_email': user.email,'email_subject': 'verifier votre adress email'+current_site}
		Util.send_email(data)

	
		return Response(user_data,status=status.HTTP_201_CREATED)

class RegisterFormateur(generics.GenericAPIView):
	serializer_class = AddFormateur
	def post(self,request,*args,**kwargs): 
		data = request.data
		new_formateur= User.objects.create_user2(
			username=data['username'],
			first_name=data['first_name'],
			email=data['email'],
			phone_number=data['phone_number'],
			adress=data['adress'],
			password=data['password'],
			cv=data['cv'],
			horaire=data['horaire'],
			)
		new_formateur.save()
		forma = formation.objects.get(id=data['competence'])
		societe = SocieteFormation.objects.get(id=data['appartenir_societe'])
		
	
		new_formateur.competence.add(forma)
		new_formateur.appartenir_societe.add(societe)
	
		serializer = self.serializer_class(new_formateur)
		# serializer.is_valid(raise_exception=True)
		# serializer.save()
		# serializer.user.set[(formateur)]
		user_data = serializer.data

		# formateur = User.objects.get(email=user_data['email'])
		# token = RefreshToken.for_user(formateur).access_token

		# current_site = get_current_site(request).domain
		# relativelink= reverse('email-verify')
		# absurl = 'http://'+current_site+relativelink+"?token="+str(token)
		# email_body = 'salut '+formateur.username+'utilise ce lien pour verifier ton compte\n'+absurl
		
		# data = {'email_body': email_body,'to_email': formateur.email,'email_subject': 'verifier votre adress email'+current_site}
		# Util.send_email(data)

		return Response(user_data,status=status.HTTP_201_CREATED)
    

class RegisterResponsableP(generics.GenericAPIView):
	serializer_class = AddRp
	def post(self,request):
		data = request.data
		new_Rp = User.objects.create_user5(
			username=data['username'],
			first_name=data['first_name'],
			email=data['email'],
			phone_number=data['phone_number'],
			adress=data['adress'],
			password=data['password'],
		)
		new_Rp.save()
		societe = SocieteFormation.objects.get(id=data['appartenir_societe'])
		new_Rp.appartenir_societe.add(societe)
		serializer = self.serializer_class(new_Rp)
		# serializer.is_valid(raise_exception=True)
		# serializer.save()
		user_data = serializer.data
		return Response(user_data,status=status.HTTP_201_CREATED)


class RegisterSupResponsableP(generics.GenericAPIView):
	serializer_class = AddSrp
	def post(self,request):
		data = request.data
		new_Super_Rp = User.objects.create_user4(
			username=data['username'],
			first_name=data['first_name'],
			email=data['email'],
			phone_number=data['phone_number'],
			adress=data['adress'],
			password=data['password'],
		)
		new_Super_Rp.save()
		societe = SocieteFormation.objects.get(id=data['appartenir_societe'])
		new_Super_Rp.appartenir_societe.add(societe)
		serializer = self.serializer_class(new_Super_Rp)
		# serializer.is_valid(raise_exception=True)
		# serializer.save()
		user_data = serializer.data
		return Response(user_data,status=status.HTTP_201_CREATED)
class RegisteradminOrg(generics.GenericAPIView):
	serializer_class = AddAdmin
	def post(self,request):
		admin_org = request.data
		serializer = self.serializer_class(data=admin_org)
		serializer.is_valid(raise_exception=True)
		serializer.save()
		user_data = serializer.data
		return Response(user_data,status=status.HTTP_201_CREATED)
		
class CreateSociete(generics.GenericAPIView):
	# permission_classes = (IsAuthenticated,IsAdminUser)
	serializer_class = AddSociete
	def post(self,request):
		organisme= request.data
		serializer = self.serializer_class(data=organisme)
		serializer.is_valid(raise_exception=True)
		serializer.save()
		organisme_data = serializer.data
		return Response(organisme_data,status=status.HTTP_201_CREATED)



@api_view(['GET'])
def viewallsociete(request):
	serializer_class = AddSociete
	donnee =  SocieteFormation.objects.all()

	serializer = serializer_class(donnee,many=True)

	return Response(serializer.data)


#UPDATE SOCIETE


class VerifyEmail(views.APIView):
    serializer_class = EmailVerificationSerializer

    token_param_config = openapi.Parameter(
        'token', in_=openapi.IN_QUERY, description='Description', type=openapi.TYPE_STRING)

    @swagger_auto_schema(manual_parameters=[token_param_config])
    def get(self, request):
        token = request.GET.get('token')
        try:
            payload = jwt.decode(token, settings.SECRET_KEY,algorithms=["HS256"])
            user = User.objects.get(id=payload['user_id'])
            if not user.email_confirmed:
                user.email_confirmed = True
                user.save()
            return Response({'email': 'Successfully activated'}, status=status.HTTP_200_OK)
        except jwt.ExpiredSignatureError as identifier:
            return Response({'error': 'Activation Expired'}, status=status.HTTP_400_BAD_REQUEST)
        except jwt.exceptions.DecodeError as identifier:
            return Response({'error': 'Invalid token'}, status=status.HTTP_400_BAD_REQUEST)


# LOGIN USER
class login(generics.GenericAPIView):
	serializer_class = login
	def post(self,request):
		serializer = self.serializer_class(data=request.data)
		serializer.is_valid(raise_exception=True)

		return Response({"user": serializer.data},status=status.HTTP_200_OK)


# CRUD OPERATION VIEW ALL USERS

@api_view(['GET'])
@csrf_exempt
# @permission_classes([IsAuthenticated,autorisation])	
def viewalluser(request):
	serializer_class = cruduser
	org = OrganismeFormation.objects.all()
	donnee = User.objects.all()
    
	serializer = serializer_class(donnee, many=True)
	# serializer.data[10] = org
	return Response({'user':serializer.data})
@api_view(['GET'])
@csrf_exempt
# @permission_classes([IsAuthenticated,autorisation])	
def detailuser(request, pk):
	serializer_class = cruduser
	donnee = User.objects.get(id=pk)
	serializer = serializer_class(donnee, many=False)
	return Response(serializer.data)
# FIN CRUD GET ALL USERS

# CRUD OPERATION FORMATION
class CreateFormation(CreateAPIView):
    serializer_class = crudformation
    queryset = formation.objects.all()
    # permission_classes = (permissions.IsAuthenticated,autorisation)

    def perform_create(self, serializer):
        return serializer.save()

    def get_queryset(self):
        return self.queryset.filter()

    def get_queryset(self):
        return self.queryset.filter()
@api_view(['GET'])
@csrf_exempt
# @permission_classes([IsAuthenticated,autorisation])	
def viewallformation(request):
	serializer_class = crudformation
	donnee = formation.objects.all()
	serializer = serializer_class(donnee, many=True)
	return Response(serializer.data)

@api_view(['GET'])
@csrf_exempt
# @permission_classes([IsAuthenticated,autorisation])	
def detailformation(request, pk):
	serializer_class = crudformation
	donnee = formation.objects.get(id=pk)
	serializer = serializer_class(donnee, many=False)
	return Response(serializer.data)

# @api_view(['POST'])
# @csrf_exempt
# @permission_classes([IsAuthenticated,autorisation])	
# def createformation(request):
# 	serializer_class = crudformation
# 	queryset = formation.objects.all()
# 	donnee = serializer_class(data=request.data)
# 	if donnee.is_valid():
# 		donnee.save()
# 	return Response(donnee.data)
# class CreateAPIView(CreateAPIView):
#     queryset = formation.objects.all()
#     serializer_class = crudformation	
	

@api_view(['POST'])
@csrf_exempt
# @permission_classes([IsAuthenticated,autorisation])	
def updateformation(request, pk):
	serializer_class = crudformation
	donnee = formation.objects.get(id=pk)
	serializer = serializer_class(instance=donnee, data=request.data)
	if serializer.is_valid():
		serializer.save()

	return Response(serializer.data)
@api_view(['DELETE'])
@csrf_exempt
# @permission_classes([IsAuthenticated,autorisation])	
def deleteformation(request, pk):
	donnee = formation.objects.get(id=pk)
	donnee.delete()
# FIN CRUD OPERATION FOR FORMATION

# CRUD OPERATION DOCUMENTS

class CreateDocument(CreateAPIView):
    serializer_class = cruddocuments
    queryset = Document.objects.all()
    permission_classes = (permissions.IsAuthenticated,autorisation)

    def perform_create(self, serializer):
        return serializer.save()

    def get_queryset(self):
        return self.queryset.filter()

    def get_queryset(self):
        return self.queryset.filter()

@api_view(['GET'])
@csrf_exempt
# @permission_classes([IsAuthenticated])
def viewalldocument(request):
	serializer_class = cruddocuments
	donnee = Document.objects.all()

	serializer = serializer_class(donnee, many=True)
	return Response(serializer.data)


@api_view(['GET'])
@csrf_exempt
# @permission_classes([IsAuthenticated])	
def detaildocument(request, pk):
	serializer_class = cruddocuments
	donnee = Document.objects.get(id=pk)
	serializer = serializer_class(donnee, many=False)
	return Response(serializer.data)


# @api_view(['POST'])
# @csrf_exempt
# @permission_classes([IsAuthenticated])	
# def createdocument(request):
# 	serializer_class = cruddocuments
# 	donnee = serializer_class(data=request.data)
# 	if donnee.is_valid():
# 		donnee.save()
# 	return Response(donnee.data)

@api_view(['POST'])
@csrf_exempt
# @permission_classes([IsAuthenticated])	
def updatedocument(request, pk):
	serializer_class = cruddocuments
	donnee = Document.objects.get(id=pk)
	serializer = serializer_class(instance=donnee, data=request.data)
	if serializer.is_valid():
		serializer.save()

@api_view(['DELETE'])
@csrf_exempt
# @permission_classes([IsAuthenticated])	
def deletedocument(request, pk):
	donnee = Document.objects.get(id=pk)
	donnee.delete()

# FIN CRUD OPERATION FOR DOCUMENTS

#CRUD ORGANISME
class CreateOrganisme(CreateAPIView):
    serializer_class =  CrudOrganisme
    queryset =  OrganismeFormation.objects.all()
    # permission_classes = (permissions.IsAuthenticated,autorisation)

    def perform_create(self, serializer):
        return serializer.save()

    def get_queryset(self):
        return self.queryset.filter()

    def get_queryset(self):
        return self.queryset.filter()

#FIN CRUD ORGANISME
@api_view(['GET'])
def getallorganisme(request):
	serializer_class = CrudOrganisme
	donnee = OrganismeFormation.objects.all()

	serializer = serializer_class(donnee, many=True)
	return Response(serializer.data)

#FIN CRUD ORGANISME
class LogoutUser(generics.GenericAPIView):
	serializer_class = LogoutUse
	permission_classes = (permissions.IsAuthenticated,)

	def post(self,request):
		serializer = self.serializer_class(data=request.data)
		serializer.is_valid(raise_exception=True)
		serializer.save()

		return Response(status=status.HTTP_204_NO_CONTENT)

# CRUD COURSES
class CrudCourses(CreateAPIView):
    serializer_class = CrudCourses
    queryset = Courses.objects.all()
    # permission_classes = (permissions.IsAuthenticated,autorisation)

    def perform_create(self, serializer):
        return serializer.save()

    def get_queryset(self):
        return self.queryset.filter()

    def get_queryset(self):
        return self.queryset.filter()


@api_view(['GET'])
def viewallcourses(request):
	serializer_class = CrudCourses
	donnee = Courses.objects.all()

	serializer = serializer_class(donnee, many=True)
	return Response(serializer.data)