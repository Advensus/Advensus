
from urllib import response
from django.shortcuts import render,redirect
from django.http import HttpResponse
from .company import  OrganismeFormation,SocieteFormation
from rest_framework import generics,status,views,permissions
from .serializers import CreateGenerate,createdocuments,CreatCourses,createreservation,createprogramme,crudsouscrir,createcertificate,crudcertificate,crudprogramme,CreateOrganisme,loginorg, AddStagiaire,AddSouscrir,AddFormateur,AddSociete,AddRp,AddSrp,EmailVerificationSerializer,AddAdmin,loginuser,cruduser,crudformation,cruddocuments,LogoutUse,CrudOrganisme,CrudCourses,crudreservation
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
from .training import formation,certificate,programme
from .models import Document,Courses, reservation
from django.views.decorators.csrf import csrf_exempt
from .permissions import autorisation
from django.http import JsonResponse
from rest_framework.parsers import JSONParser 
from .mixin import ReadWriteSerializerMixin
from django.template.loader import render_to_string

from rest_framework.generics import CreateAPIView,ListAPIView,DestroyAPIView,UpdateAPIView
from django.conf import settings
from django.shortcuts import get_object_or_404

from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas
from django.http.response import JsonResponse

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
		settings.EMAIL_HOST_PASSWORD = user_org.password_messagerie
		f = formation.objects.get(id=data["formation"])
		# rp_peda = User.objects.get(id=data["Rp_Stagiaire"])
		email_body = u'<img src="{{user_org.company_logo.url}}">'+ "\n\n"+"Bonjour " +user.username+ " "+ user.first_name +",\n\n" +"Tout d’abord nous tenons à vous remercier de la confiance que vous nous accordez en choisissant notre organisme pour suivre votre formation :\n\n"+str(f)+ " " +"d'une durée de"+ " " +duration+ " "+ "heure(s)"+ "\n\n"+"Vous allez être très prochainement contacté.e par votre responsable pédagogique," + rp_stagiaire.username + " "+  "pour :" +"\n\n"+"-Préparer au mieux votre parcours de formation en déterminant votre profil et identifiant vos attentes et besoins,\n\n"+"- Vous expliquer le déroulement de votre formation \n\n"+"- Convenir d’une date de rendez-vous avec votre formateur \n\n"+ "Votre responsable pédagogique est votre principal interlocuteur, n’hésitez pas à le joindre au"+ " " + rp_stagiaire.phone_number +" "+ " "  +"pour toute question liée à votre formation." +"\n\n"+"Bonne journée et à bientôt !\n\n"+"L’équipe"+ " "+ user_org.company_name + "\n\n"+"Veuillez utiliser ce lien pour activer votre compte"+"\n\n"+absurl

			
		data = {'email_body': email_body,'from_email':settings.EMAIL_HOST_USER ,'to_email': user.email,'email_subject': 'verifier votre adress email'+current_site}
		Util.send_email(data)
		return Response(user_data,
            status=status.HTTP_201_CREATED)


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
		user_data = {"user":serializer.data}
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
		societe_data = serializer.data
		return Response(societe_data,status=status.HTTP_201_CREATED)



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
	serializer_class = loginuser
	def post(self,request):
		serializer = self.serializer_class(data=request.data)
		serializer.is_valid(raise_exception=True)

		return Response({"user": serializer.data},status=status.HTTP_200_OK)

#LOGIN ORGANISME
class login_org(generics.GenericAPIView):
	serializer_class = loginorg
	def post(self,request):
		serializer = self.serializer_class(data=request.data)
		serializer.is_valid(raise_exception=True)

		return Response({'organisme':serializer.data},status=status.HTTP_200_OK)
# CRUD OPERATION VIEW ALL USERS

@api_view(['GET'])
@csrf_exempt
# @permission_classes([IsAuthenticated,autorisation])	
def viewalluser(request):
	serializer_class = cruduser
	# org = OrganismeFormation.objects.all()
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
	
	
	serializer = serializer_class(donnee,many=True)
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
	

@csrf_exempt
@api_view(['PUT','PATCH'])
# @permission_classes([IsAuthenticated,autorisation])	
def updateformation(request, pk):
	serializer_class = crudformation
	donnee = formation.objects.get(id=pk)
	serializer = serializer_class(instance=donnee, data=request.data)
	if serializer.is_valid():
		serializer.save()

	return Response(serializer.data)

@csrf_exempt
@api_view(['DELETE'])
# @permission_classes([IsAuthenticated,autorisation])	
def deleteformation(request, pk):

	if request.method == "DELETE":
		donnee = formation.objects.get(id=pk)
		donnee.delete()
		return JsonResponse({'message':'Formation supprimé avec succès'},status=status.HTTP_204_NO_CONTENT)
	return JsonResponse({'message':'Formation DoesNotExist'},status=status.HTTP_500_NO_CONTENT)
# FIN CRUD OPERATION FOR FORMATION

# CRUD OPERATION DOCUMENTS

class CreateDocument(CreateAPIView):
    serializer_class = createdocuments
    queryset = Document.objects.all()
    # permission_classes = (permissions.IsAuthenticated,autorisation)

    def perform_create(self, serializer):
        return serializer.save()

    def get_queryset(self):
        return self.queryset.filter()

    def get_queryset(self):
        return self.queryset.filter()

class CreateDocumentsStagiaire(generics.GenericAPIView):
	serializer_class = CreateGenerate
	def post(self,request): 
		# path_generatedocument = request.path
		data = request.data
      
		# print('path')
		user = User.objects.get(id=data['appartenir'])
		# url = settings.MEDIA_ROOT+'doc_generate'
		#document_contrat
		paths = "doc_generate/"+user.username+"contrat"+".pdf"
		my_canvas = canvas.Canvas(paths, pagesize=letter)
		my_canvas.setLineWidth(.3)
		my_canvas.setFont('Helvetica', 12)
		my_canvas.drawString(30, 750, 'Documents')
		my_canvas.drawString(30, 735, user.username)
		
		my_canvas.save()
		#document_contrat

		

		print(paths)
		sauvegarde = Document(
			path=paths,		
		)
	
		print(sauvegarde.path)
		
	  
		
		
		user_org = user.organisme_formation.all().get()
		rp_stagiaire = user.Rp_Stagiaire.all().get()
		serializer = self.serializer_class(sauvegarde,data=data)
		serializer.is_valid(raise_exception=True)
		
		serializer.save()

		# doc = Document.objects.all()

		# for d in doc:
		# 	print("url")
		# 	print(d.path.url)
		# 	print(d.sign.url)

		#fiche information
		# paths2 = "document/"+user.username+"_information"+".pdf"
		# p = canvas.Canvas(paths2,pagesize=letter)

    


		# p.drawImage(user_org.company_logo.url,width=100,height=100)


		# framh=Frame(70,600,500,50,showBoundary=1)
		# flow_obj=[]
		# p.setFontSize(30)
		# table=Table([["Fiche Information"]])
		# flow_obj.append(table)
		# framh.addFromList(flow_obj,p)


		# p.setFontSize(12)
		# p.drawString(70, 570, "DATE DEBUT DE FORMATION : ")
		# p.drawString(250, 570, "16/11/2021")
		# p.drawString(350, 570, "DATE FIN FORMATION :")
		# p.drawString(490, 570, "10/12/2022")


		# p.drawString(70, 540, "RENDEZ-VOUS :")
		# p.drawString(170, 540, "PHYSIQUE")


		# p.drawString(350, 540, "TELEPHONIQUE :")
		# p.drawString(453, 540, "+33 7 56 28 36 44")


		# p.drawString(70, 510, "NOM : ")
		# p.drawString(120, 510, "MEJHOUD")


		# p.drawString(70, 480, "PRENOM :")
		# p.drawString(140, 480, "Abdelkabir")

		# p.drawString(70, 450, "STATUT :")
		# p.drawString(140, 450, "Etudiant")



		# p.drawString(70, 420, "NIVEAU ACTUEL : ")
		# p.drawString(190, 420, "A1")

		# p.drawString(350, 420, "NIVEAU VISE :")
		# p.drawString(448, 420, "A2")


		# p.drawString(70, 390, "OBJECTIFS DE LA FORMATION :")


		# framh=Frame(70,260,500,120,showBoundary=1)
		# flow_obj=[]
		# p.setFontSize(30)
		# tableo=Table([["\n\n\n"]])
		# flow_obj.append(tableo)
		# framh.addFromList(flow_obj,p)

		



		
		# p.showPage()
		# p.save()
		#fin fiche information
			
		generate_data = serializer.data
			
			
			
		return Response(generate_data,status=status.HTTP_201_CREATED)


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


@csrf_exempt
@api_view(['PUT'])
def updatedocument(request,pk):
	donnee =  Document.objects.get(id=pk)
	
	if request.method == "PUT":
		document_data = JSONParser().parse(request)
		serializer = cruddocuments(donnee,data=document_data)
	
		if serializer.is_valid():
			serializer.save()
			return Response(serializer.data) 
		return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST) 

@api_view(['DELETE'])
@csrf_exempt
# @permission_classes([IsAuthenticated])	
def deletedocument(request, pk):
	donnee = Document.objects.get(id=pk)
	donnee.delete()

# FIN CRUD OPERATION FOR DOCUMENTS

#CRUD ORGANISME
class CreateOrganisme(generics.GenericAPIView):
   
	# permission_classes = (IsAuthenticated,IsAdminUser)
	serializer_class = CreateOrganisme
	def post(self,request):
		organisme= request.data
		serializer = self.serializer_class(data=organisme)
		serializer.is_valid(raise_exception=True)
		serializer.save()
		societe_data = serializer.data
		return Response(societe_data,status=status.HTTP_201_CREATED)


@api_view(['GET'])
def getallorganisme(request):
	serializer_class = CrudOrganisme
	donnee = OrganismeFormation.objects.all()

	serializer = serializer_class(donnee, many=True)
	return Response(serializer.data)

@api_view(['POST'])
@csrf_exempt
def updateorganisme(request,pk):
	serializer_class = CrudOrganisme
	donnee =  OrganismeFormation.objects.filter(id=pk)

	serializer = serializer_class(donnee,data=request.data,many=True)

	if serializer.is_valid():
		serializer.save()
		return Response(serializer.data)
@api_view(['DELETE'])
@csrf_exempt
# @permission_classes([IsAuthenticated])	
def deleteorganisme(request, pk):
	donnee = OrganismeFormation.objects.get(id=pk)
	donnee.delete()

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
class CreateCourses(CreateAPIView):
    serializer_class = CreatCourses
    queryset = Courses.objects.all()
    # permission_classes = (permissions.IsAuthenticated,autorisation)

    def perform_create(self, serializer):
        return serializer.save()

    def get_queryset(self):
        return self.queryset.filter()

    def get_queryset(self):
        return self.queryset.filter()


# class ViewAllCourses(ListAPIView):
# 	serializer_class=CrudCourses
# 	queryset = Courses.objects.all()

# 	def get_queryset(self):
# 		return self.queryset.filter()


# @api_view(['GET'])
# def viewallcourses(request):
    
#     # checking for the parameters from the URL
#     if request.query_params:
#         courses = Courses.objects.filter(**request.query_param.dict())
#     else:
#         courses = Courses.objects.all()
  
#     # if there is something in items else raise error
#     if courses:
#         data = CrudCourses(courses,many=True)
#         return Response(data)
#     else:
#         return Response(status=status.HTTP_404_NOT_FOUND)

@api_view(['GET'])
@csrf_exempt
# @permission_classes([IsAuthenticated])
def viewallcourses(request):
	serializer_class = CrudCourses
	donnee = Courses.objects.all()

	serializer = serializer_class(donnee, many=True)
	return Response({"courses":serializer.data})

#END CRUD COURSES

#CRUD RESERVATION
class CreateReservation(CreateAPIView):
    serializer_class = createreservation
    queryset = reservation.objects.all()
    # permission_classes = (permissions.IsAuthenticated,autorisation)

    def perform_create(self, serializer):
        return serializer.save()

    def get_queryset(self):
        return self.queryset.filter()

    def get_queryset(self):
        return self.queryset.filter()

@api_view(['GET'])
def viewallreservations(request):
	serializer_class = crudreservation
	donnee = reservation.objects.all()

	serializer = serializer_class(donnee,many=True)

	return Response(serializer.data)


@csrf_exempt
@api_view(['PATCH'])
def updatereservation(request,pk):
	donnee =  reservation.objects.get(id=pk)
	
	if request.method == "PATCH":
		reservation_data = JSONParser().parse(request)
		serializer = crudreservation(donnee,data=reservation_data)
	
		if serializer.is_valid():
			serializer.save()
			return Response(serializer.data) 
		return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST) 
@csrf_exempt		
@api_view(['DELETE'])
# @permission_classes([IsAuthenticated])	
def deletereservation(request, pk):
	
	if request.method == "DELETE":
		donnee = reservation.objects.get(id=pk)
		donnee.delete()
		return JsonResponse({'message': 'Reservation was deleted successfully!'}, status=status.HTTP_204_NO_CONTENT)

# ALL GET BY

@api_view(['GET'])
def getstagiairebyorg(request,pk):
	serializer_class = cruduser
	donnee = User.objects.filter(organisme_formation=pk)


	serializer = serializer_class(donnee, many=True)

	return Response(serializer.data) 

@api_view(['GET'])
def getorganismebysoc(request,pk):
	serializer_class = CrudOrganisme
	donnee = OrganismeFormation.objects.filter(societe_formation=pk)


	serializer = serializer_class(donnee, many=True)

	return Response(serializer.data) 

@api_view(['GET'])
def getreservationbysta(request,pk):
	serializer_class = crudreservation
	donnee = reservation.objects.filter(proposer=pk)


	serializer = serializer_class(donnee, many=True)

	return Response(serializer.data) 

@api_view(['GET'])
def getreservationbyrp(request,pk):
	serializer_class = crudreservation
	donnee = reservation.objects.filter(reserver=pk)


	serializer = serializer_class(donnee, many=True)

	return Response(serializer.data) 

@api_view(['GET'])
def getformateurbyformation(request,pk):
	serializer_class = cruduser
	donnee = User.objects.filter(competence=pk)

	serializer = serializer_class(donnee,many=True)

	return Response(serializer.data)

@api_view(['GET'])
def getadminbysociete(request,pk):
	serializer_class = cruduser
	donnee = User.objects.filter(societe=pk)

	serializer = serializer_class(donnee,many=True)
	return Response(serializer.data)

#END GET BY


# CRUD PRGRAMME AND CERTIFICATE
class CreateProgramme(CreateAPIView):
    serializer_class = createprogramme
    queryset = programme.objects.all()
    # permission_classes = (permissions.IsAuthenticated,autorisation)

    def perform_create(self, serializer):
        return serializer.save()

    def get_queryset(self):
        return self.queryset.filter()

    def get_queryset(self):
        return self.queryset.filter()

@api_view(['GET'])
def viewallprogramme(request):
	serializer_class = crudprogramme
	donnee = programme.objects.all()

	serializer = serializer_class(donnee,many=True)

	return Response(serializer.data)

@api_view(['GET'])
def getprogrammebycert(request,pk):
	serializer_class = crudprogramme
	donnee = programme.objects.filter(attribue=pk)

	serializer = serializer_class(donnee,many=True)

	return Response(serializer.data)
class CreateCertificate(CreateAPIView):
    serializer_class = createcertificate
    queryset = certificate.objects.all()
    # permission_classes = (permissions.IsAuthenticated,autorisation)

    def perform_create(self, serializer):
        return serializer.save()

    def get_queryset(self):
        return self.queryset.filter()

    def get_queryset(self):
        return self.queryset.filter()

@api_view(['GET'])
def viewallcertificate(request):
	serializer_class = crudcertificate
	donnee = certificate.objects.all()

	serializer = serializer_class(donnee,many=True)

	return Response(serializer.data)

@api_view(['GET'])
def getcertificationbyform(request,pk):
	serializer_class = crudcertificate
	donnee = certificate.objects.filter(allouer=pk)

	serializer = serializer_class(donnee,many=True)

	return Response(serializer.data)

#END PROGRAMME AND CERTIFICAT

#SOUSCRIR CRUD
@api_view(['GET'])
def viewallsouscription(request):
	serializer_class = crudsouscrir
	donnee = souscrir.objects.all()

	serializer = serializer_class(donnee,many=True)

	return Response(serializer.data)


#CRUD DOCUMENT 



