
from functools import partial
from urllib import response
from django.shortcuts import render,redirect
from django.http import HttpResponse
from .company import  OrganismeFormation,SocieteFormation
from rest_framework import generics,status,views,permissions
from .serializers import createnewscheduleserialize,updatedocuments,CreateGenerate,createdocuments,CreatCourses,createreservation,createprogramme,crudsouscrir,createcertificate,crudcertificate,crudprogramme,CreateOrganisme,loginorg, AddStagiaire,AddSouscrir,AddFormateur,AddSociete,AddRp,AddSrp,EmailVerificationSerializer,AddAdmin,loginuser,cruduser,crudformation,cruddocuments,LogoutUse,CrudOrganisme,CrudCourses,crudreservation
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
from .models import Document,Courses, reservation, WeekleSchedule
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
from django.core.files.base import ContentFile
import requests
from reportlab.graphics.shapes import *
from reportlab.lib.colors import HexColor
from reportlab.platypus import Frame,Table 
from django.utils.html import mark_safe
from django.utils.html import format_html

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
	
		# email_body =  org.company_logo.url  +"\n\n"+"Bonjour " +user.username+ " "+ user.first_name +",\n\n" +"Tout d???abord nous tenons ?? vous remercier de la confiance que vous nous accordez en choisissant notre organisme pour suivre votre formation :\n\n"+str(f)+ " " +"d'une dur??e de xx" + "\n\n"+"Vous allez ??tre tr??s prochainement contact??.e par votre responsable p??dagogique," + str(rp_peda) + " "+  "pour :" +"\n\n"+"-Pr??parer au mieux votre parcours de formation en d??terminant votre profil et identifiant vos attentes et besoins,\n\n"+"- Vous expliquer le d??roulement de votre formation \n\n"+"- Convenir d???une date de rendez-vous avec votre formateur \n\n"+ "Votre responsable p??dagogique est votre principal interlocuteur, n???h??sitez pas ?? le joindre au"+ " "+ str(rp_peda.phone_number) + " "  +"pour toute question li??e ?? votre formation." +"\n\n"+"Bonne journ??e et ?? bient??t !\n\n"+"L?????quipe"+ " "+ str(org)+"\n\n"+"Une question ? joignez nous en compl??tant notre formulaire => lien vers formulaire de contact\n\n"+"Veuillez utiliser ce lien pour activer votre compte"+"\n\n"+absurl
			
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
		email_body = format_html(mark_safe(f'<img src="{user_org.company_logo.url}"width="150" height="150" />'))+ "\n\n"+"Bonjour " +user.username+ " "+ user.first_name +",\n\n" +"Tout d???abord nous tenons ?? vous remercier de la confiance que vous nous accordez en choisissant notre organisme pour suivre votre formation :\n\n"+str(f)+ " " +"d'une dur??e de"+ " " +duration+ " "+ "heure(s)"+ "\n\n"+"Vous allez ??tre tr??s prochainement contact??.e par votre responsable p??dagogique," + rp_stagiaire.username + " "+  "pour :" +"\n\n"+"-Pr??parer au mieux votre parcours de formation en d??terminant votre profil et identifiant vos attentes et besoins,\n\n"+"- Vous expliquer le d??roulement de votre formation \n\n"+"- Convenir d???une date de rendez-vous avec votre formateur \n\n"+ "Votre responsable p??dagogique est votre principal interlocuteur, n???h??sitez pas ?? le joindre au"+ " " + rp_stagiaire.phone_number +" "+ " "  +"pour toute question li??e ?? votre formation." +"\n\n"+"Bonne journ??e et ?? bient??t !\n\n"+"L?????quipe"+ " "+ user_org.company_name + "\n\n"+"Veuillez utiliser ce lien pour activer votre compte"+"\n\n"+absurl

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
@permission_classes([IsAuthenticated,autorisation])	
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
		return JsonResponse({'message':'Formation supprim?? avec succ??s'},status=status.HTTP_204_NO_CONTENT)
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
		user_org = user.organisme_formation.all().get()
		# image_path = bytes(user_org.company_logo.url)
		
		rp_stagiaire = user.Rp_Stagiaire.all().get()
		souscris_formation = souscrir.objects.get(stagiaire=user)
	
		# url = settings.MEDIA_ROOT+'doc_generate'
		#document_contrat

		paths = "media/doc_generate/"+user.username.replace(" ", "")+"_"+souscris_formation.formation.intitule+"_contrat"+".pdf"

		my_canvas = canvas.Canvas(paths, pagesize=letter)
		my_canvas.setLineWidth(.3)
		my_canvas.setFont('Helvetica', 12)
		# my_canvas.drawImage(image_path, 30, 690, width=100, height=100)
		my_canvas.drawString(220,750, "Contrat de formation professionnelle")
		my_canvas.drawString(190,720, "(Articles L. 6353-3 ?? L. 6353-7 du code du travail)")
		my_canvas.drawString(15, 670, "Entre l'organisme de formation: "+ " " +user.username)
		my_canvas.drawString(15, 640, "Et le b??n??ficiaire:"+ " "+ user.username)
		my_canvas.drawString(15, 610, "Est conclue la convention suivante en application des dispositions du livre III de la sixi??me partie du code du")
		my_canvas.drawString(15, 590, "travail portant sur l'organisation de la formation professionnelle.")
		my_canvas.setFillColor(HexColor(0xff0800))
		my_canvas.drawString(15, 540, "1. Objet, nature et dur??e de la formation")
		my_canvas.setFillColor(HexColor(0x000000))
		my_canvas.drawString(15, 510, "Le b??n??ficiaire entend participer ?? l???action de formation suivante organis??e par l???organisme de formation")
		my_canvas.drawString(15, 490, souscris_formation.formation.intitule+".")
        
		my_canvas.setFillColor(HexColor(0xff0800))
		my_canvas.drawString(15, 460, "Objet de la formation :")
		my_canvas.setFillColor(HexColor(0x000000))
		my_canvas.setFont('Helvetica', 10)
		my_canvas.drawString(35, 430, "I. Les actions de formation ont pour objet de permettre ?? toute personne sans qualification ")
		my_canvas.drawString(45, 410, "professionnelle ou sans contrat de travail d'acc??der dans les meilleures conditions ?? un emploi.")
		my_canvas.drawString(33, 380, "II. Favoriser l'adaptation des travailleurs ?? leur poste de travail, ?? l'??volution des emplois ainsi que leur ")
		my_canvas.drawString(45, 360, "maintien dans l'emploi et de participer au d??veloppement des comp??tences en lien ou non avec leur")
		my_canvas.drawString(45, 340, "poste de travail. Elles peuvent permettre ?? des travailleurs d'acqu??rir une qualification plus ??lev??e.")
		my_canvas.drawString(30, 310, "III. R??duire, pour les travailleurs dont l'emploi est menac??, les risques r??sultant d'une qualification")
		my_canvas.drawString(45, 290, "inadapt??e ?? l'??volution des techniques et des structures des entreprises, en les pr??parant ?? une mutation")
		my_canvas.drawString(45, 270, "d'activit?? soit dans le cadre, soit en dehors de leur entreprise. Elles peuvent permettre ?? des salari??s")
		my_canvas.drawString(45, 250, "dont le contrat de travail est rompu d'acc??der ?? des emplois exigeant une qualification diff??rente, ou ??")
		my_canvas.drawString(45, 230, "des non-salari??s d'acc??der ?? de nouvelles activit??s professionnelle")
		my_canvas.drawString(33, 200, "IV. Favoriser la mobilit?? professionnelle.")
        
		my_canvas.setFillColor(HexColor(0xff0800))
		my_canvas.setFont('Helvetica', 12)
		my_canvas.drawString(15, 170, "Type d???action de formation (art. L6313-1 du code du travail):" + " " +souscris_formation.lieu_formation)
		my_canvas.setFillColor(HexColor(0x000000))
		my_canvas.drawString(15, 150, "Dur??e: " + souscris_formation.duration+ " heure(s)")
		my_canvas.drawString(15, 130, "Lieu de la formation: " + souscris_formation.lieu_formation)
		my_canvas.drawString(15, 110, "P??riode de la formation: " + "Du " + str(souscris_formation.start_session) +" au " + str(souscris_formation.end_session))

		my_canvas.setFillColor(HexColor(0xff0800))
		my_canvas.drawString(15, 80, "2. Programme de la formation et formateur")
		my_canvas.setFillColor(HexColor(0x000000))
		my_canvas.drawString(15, 60, "La description d??taill??e du programme de formation et du formateur est joint en annexe.Le niveau de")
		my_canvas.drawString(15, 40, "connaissances pr??alables requis pour suivre la formation et obtenir les qualifications auxquelles")
		my_canvas.drawString(15, 20, "elle pr??pare est d??taill?? dans ce programme.")
		my_canvas.showPage()

		my_canvas.drawString(15,1500, "")
		my_canvas.setFillColor(HexColor(0xff0800))
		my_canvas.drawString(15,750, "3. Engagement de participation ?? l'action de formation")
		my_canvas.setFillColor(HexColor(0x000000))
		my_canvas.drawString(15,730, "Le b??n??ficiaire s???engage ?? assurer sa pr??sence aux dates pr??vues avec" + " " +rp_stagiaire.username +".")
        
		my_canvas.setFillColor(HexColor(0xff0800))
		my_canvas.drawString(15,700, "4. Prix de la formation")
		my_canvas.setFillColor(HexColor(0x000000))
		my_canvas.drawString(15,680, "En contrepartie de cette action de formation,"+user.username+ " " +"s 'acquittera des co??ts suivants qui couvrent l'int??gralit??")
		my_canvas.drawString(15,660, "des frais engag??s par l'organisme de formation pour cette session:")
		my_canvas.drawString(15,640, "Co??t total HT: ???")
		my_canvas.drawString(15,620, "Montant de la TVA:???")
		my_canvas.drawString(15,600, "TOTAL TTC: ???")

		my_canvas.setFillColor(HexColor(0xff0800))
		my_canvas.drawString(15,570, "5. Modalit??s de r??glement")
		my_canvas.setFillColor(HexColor(0x000000))
		my_canvas.drawString(15,550, "Le paiement sera d??  ?? r??ception d'une facture ??mise par l'organisme de formation ?? destination de" + " "+ user.username)
		my_canvas.drawString(15,530, "du financeur sur la base des heures r??alis??es.")
		
		my_canvas.setFillColor(HexColor(0xff0800))
		my_canvas.drawString(15,500, "6. Moyens p??dagogiques et techniques mis en ??uvre")
		my_canvas.setFillColor(HexColor(0x000000))
		my_canvas.drawString(15,480, "Voir le programme de formation en annexe d??taillant les moyens mis en ??uvre pour r??aliser techniquement")
		my_canvas.drawString(15,460, "l'action,suivre son ex??cution et appr??cier ses r??sultats. Un ??margement sign?? par le stagiaire et le formateur")
		my_canvas.drawString(15,440, "pour chaque session dispens??e permettra de justifier de la r??alisation de la prestation.")
        
		my_canvas.setFillColor(HexColor(0xff0800))
		my_canvas.drawString(15,410, "7. Sanction de la formation")
		my_canvas.setFillColor(HexColor(0x000000))
		my_canvas.drawString(15,390, "En application de l???article L.6353-1 du Code du Travail, une attestation mentionnant les objectifs,")
		my_canvas.drawString(15,370, "la nature et la dur??e de l???action et les r??sultats de l?????valuation des acquis de la formation ")
		my_canvas.drawString(15,350, "sera remise au stagiaire ?? l???issue de la formation.")

		my_canvas.setFillColor(HexColor(0xff0800))
		my_canvas.drawString(15,330, "8. Non r??alisation de la prestation de formation")
		my_canvas.setFillColor(HexColor(0x000000))
		my_canvas.drawString(15,310, "En application de l???article L6354-1 du Code du travail, il est convenu entre les signataires de la pr??sente")
		my_canvas.drawString(15,290, "convention,que faute de r??alisation totale ou partielle de la prestation de formation, l???organisme prestataire")
		my_canvas.drawString(15,270, "doit rembourser au cocontractant les sommes ind??ment per??ues de ce fait.")

		my_canvas.setFillColor(HexColor(0xff0800))
		my_canvas.drawString(15,230, "9. Propri??t?? intellectuelle")
		my_canvas.setFillColor(HexColor(0x000000))
		my_canvas.drawString(15,210, "Les supports de formation, quelle qu???en soit la forme, et les contenus de toute nature (textes, images, visuels,")
		my_canvas.drawString(15,190, "musiques, logos, marques, base de donn??es, etc.) exploit??s par" + " " +user_org.company_name + " dans le cadre de")
		my_canvas.drawString(15,170, "l???action de formation sont prot??g??s par tous droits de propri??t?? intellectuelle ou droits des producteurs de")
		my_canvas.drawString(15,150, "bases de donn??es en vigueur. Tous d??sassemblages, d??compilations, d??cryptages, extractions, r??utilisations,")
		my_canvas.drawString(15,130, "copies et plus g??n??ralement, tous actes de reproduction, repr??sentation, diffusion et utilisation de l???un")
		my_canvas.drawString(15,110, "quelconque de ces ??l??ments, en tout ou partie, sans l???autorisation de"+ " "+ user_org.company_name +" sont strictement")
		my_canvas.drawString(15,90, "interdits et pourront faire l???objet de poursuites judiciaires.")

		my_canvas.setFillColor(HexColor(0xff0800))
		my_canvas.drawString(15,60, "10. Politique d'annulation et d'absence du fait du stagiaire")
		my_canvas.setFillColor(HexColor(0x000000))
		my_canvas.drawString(15,40, "Les conditions s'appliquant sont celles des CG de moncompteformation.gouv.fr. et sont reprises dans les")
		my_canvas.drawString(15,20, "conditions g??n??rales de vente. Toute absence doit ??tre notifi??e au moins 48h ?? l'avance.")
		my_canvas.showPage()

		my_canvas.drawString(15,3000, "")
		my_canvas.drawString(15,750, "En cas de non respect de ce d??lai de pr??venance, la session pr??vue est due int??gralement. Les absences")
		my_canvas.drawString(15,730, "sont tol??r??es si force majeure mais elles doivent dans ce cas ??tre justifi??es.")
        
		my_canvas.setFillColor(HexColor(0xff0800))
		my_canvas.drawString(15,700, "11. Litiges")
		my_canvas.setFillColor(HexColor(0x000000))
		my_canvas.drawString(15,680, "Si une contestation ou un diff??rend ne peuvent pas ??tre r??gl??s ?? l???amiable, le Tribunal de" + " " +user_org.company_adress)
		my_canvas.drawString(15,660, "sera seul comp??tent pour r??gler le litige. Document r??alis?? en 2 exemplaires ??" + " " +user_org.company_adress +" le" )
		my_canvas.drawString(15,640, "la Date de cr??ation du document.")
		my_canvas.showPage()

		my_canvas.drawString(15,4500, "")
		my_canvas.drawString(15,750, "Pour l'organisme de formation,")
		my_canvas.drawString(15,730, user_org.company_name + ",")
		my_canvas.drawString(490,750, "Pour le b??n??ficiaire")
		my_canvas.drawString(490,730, user.username + ",")
		my_canvas.drawString(220,650, "Conditions G??n??rales de Vente")
        
		my_canvas.setFillColor(HexColor(0xff0800))
		my_canvas.drawString(15,600, "D??signation")
		my_canvas.setFillColor(HexColor(0x000000))
		my_canvas.drawString(15,580, "La soci??t?? "+ user_org.company_name +" d??signe un organisme de formation professionnelle, dont le si??ge social est")
		my_canvas.setFillColor(HexColor(0x000000))
		my_canvas.drawString(15,560, "situ?? " +user_org.company_adress+ " "+ user_org.company_name +" met en place et dispense des formations inter et intra entreprises, et aupr??s")
		my_canvas.drawString(15,540, "des particuliers sur l???ensemble du territoire national.")
		my_canvas.drawString(15,520, "Dans les paragraphes qui suivent, il est convenu de d??signer par : ")
		my_canvas.setFont('Helvetica', 10)
		my_canvas.drawString(15,500, "- client : toute personne physique ou morale qui s???inscrit ou passe commande d???une formation aupr??s de")
		my_canvas.drawString(15,480, " la soci??t?? "+ user_org.company_name)
		my_canvas.drawString(15,460, "- stagiaire : la personne physique qui participe ?? une formation.")
		my_canvas.drawString(15,440, "- CGV : les conditions g??n??rales de vente, d??taill??es ci-dessous.")
		my_canvas.drawString(15,420, "- le financeur : l???op??rateur agr???? charg?? de collecter et g??rer l???effort de formation des entreprises et")
		my_canvas.drawString(20,400, "particuliers")
        
		my_canvas.setFont('Helvetica', 12)
		my_canvas.setFillColor(HexColor(0xff0800))
		my_canvas.drawString(15,370, "Objet et champ d???application")
		my_canvas.setFillColor(HexColor(0x000000))
		my_canvas.drawString(15,350, "Les pr??sentes Conditions G??n??rales de Vente d??terminent les conditions applicables aux prestations de")
		my_canvas.drawString(15,330, "formation effectu??es par la soci??t??"+ user_org.company_name + " " + "pour le compte d???un client. Toute commande de")
		my_canvas.drawString(15,310, "formation aupr??s de la soci??t?? implique l???acceptation sans r??serve du client des pr??sentes Conditions")
		my_canvas.drawString(15,290, "G??n??rales de Vente.  Ces conditions pr??valent sur tout autre document du client, en particulier sur")
		my_canvas.drawString(15,270, "toutes conditions g??n??rales d???achat.")
        
		my_canvas.setFillColor(HexColor(0xff0800))
		my_canvas.drawString(15,240, "Devis et attestation")
		my_canvas.setFillColor(HexColor(0x000000))
		my_canvas.drawString(15,220, "Pour chaque formation, la soci??t??"+user_org.company_name + " " + "s???engage ?? fournir un devis au client.Ce dernier")
		my_canvas.drawString(15,200, "est tenu de retourner ?? la soci??t?? un exemplaire renseign??, dat??, sign?? et tamponn??, avec la mention")
		my_canvas.drawString(15,180, "?? Bon pour accord ??. Le cas ??ch??ant une convention peut ??tre ??tablie entre la soci??t??" + user_org.company_name +",le financeur")
		my_canvas.drawString(15,160, "ou le client.?? la demande du client, une attestation de pr??sence ou de fin de formation,ainsi que des feuilles")
		my_canvas.drawString(15,140, "d?????margement peuvent lui ??tre fournies.")
		
		my_canvas.setFillColor(HexColor(0xff0800))
		my_canvas.drawString(15,110, "Prix et modalit??s de paiement")
		my_canvas.setFillColor(HexColor(0x000000))
		my_canvas.drawString(15,90, "Les prix des formations sont indiqu??s en euros hors taxes. Le paiement est ?? effectuer apr??s ex??cution ") 
		my_canvas.drawString(15,70, "de la prestation, ?? r??ception de la facture. Le r??glement des factures peut ??tre effectu?? par virement")
		my_canvas.drawString(15,50, "bancaire ou par ch??que. Dans des situations exceptionnelles, il peut ??tre proc??d?? ?? un paiement ??chelonn??.")
		my_canvas.drawString(15,30, "En tout ??tat de cause, ses modalit??s devront avoir ??t?? formalis??es avant le d??marrage de la formation.")

		
		my_canvas.showPage()
		my_canvas.drawString(15,6000, "")
		my_canvas.setFillColor(HexColor(0xff0800))
		my_canvas.drawString(15,750, " Prise en charge")
		my_canvas.setFillColor(HexColor(0x000000))
		my_canvas.drawString(15,730, "Si le client b??n??ficie d???un financement, il doit faire une demande de prise en charge avant le d??but de la")
		my_canvas.drawString(15,710, "prestation.Le client est tenu de fournir l???accord de financement lors de l???inscription.Dans le cas o?? ")
		my_canvas.drawString(15,690, "la soci??t?? " +user_org.company_name+ " ne re??oit pas d???accord de prise en charge au")
		my_canvas.drawString(15,670, "1er jour de la formation, l???int??gralit?? des co??ts de formation sera factur??e au client.")
		
		my_canvas.setFillColor(HexColor(0xff0800))
		my_canvas.drawString(15,640, "Conditions de report et d???annulation d???une s??ance de formation")
		my_canvas.setFont('Helvetica', 10)
		my_canvas.setFillColor(HexColor(0x000000))
		my_canvas.drawString(15,620, "- pour les formations aupr??s des entreprises : En cas d???annulation tardive par le Client d???une")
		my_canvas.drawString(15,600, "session de formation, des indemnit??s compensatrices sont dues dans les conditions suivantes :")

		my_canvas.drawString(15,580, "- report ou annulation communiqu?? au moins 30 jours ouvr??s avant la session : aucune indemnit??;")
		my_canvas.drawString(15,560, "report ou annulation communiqu?? moins de 30 jours et au moins 15 jours ouvr??s avant la session:30% ")
		my_canvas.drawString(15,540, "des honoraires relatifs ?? la session seront factur??s au Client ;")
		my_canvas.drawString(15,520, "- report ou annulation communiqu?? moins de 15 jours ouvr??s avant la session : 70 % des honoraires")
		my_canvas.setFont('Helvetica', 12)
		my_canvas.drawString(15,495, "relatifs ?? la session seront factur??s au Client.")
		my_canvas.drawString(15,475, "Dans l???hypoth??se o?? le stagiaire ne se pr??sente par le jour de la formation, le co??t de la session") 
		my_canvas.drawString(15,455, "sera factur?? ?? 100 % au Client.")
		my_canvas.drawString(15,435, user_org.company_name + " offre la possibilit?? de remplacer un stagiaire emp??ch?? par un autre stagiaire")
		my_canvas.drawString(15,415, "ayant le m??me profil et les m??mes besoins en formation. Ce remplacement est possible sans indemnit??")
		my_canvas.drawString(15,395, "jusqu????? 10 jours ouvr??s. Si le remplacement intervient moins de 10 jours ouvr??s avant le d??marrage")
		my_canvas.drawString(15,375, "de la formation, il ouvre droit ?? une indemnit?? forfaitaire de 50 ??? au profit de " +user_org.company_name+".")
        
		
		my_canvas.drawString(30,355, "Tout frais d'annulation ou de remplacement ne pourra en aucun cas pris en charge par un financeur.")
		my_canvas.drawString(15,335, " - pour les formations aupr??s des particuliers : pour toute annulation tardive intervenant moins de")
		my_canvas.drawString(15,315, "7 jours ouvr??s avant le d??marrage de la formation ou de non pr??sentation ?? la formation apr??s le d??lai")
		my_canvas.drawString(15,295, "de r??tractation de 15 jours calendaires," + user_org.company_name +" "+ "percevra une indemnit?? d???annulation ?? hauteur")
		my_canvas.drawString(15,275, "de 5% du montant total de la formation initiale.")

		my_canvas.drawString(15,255, "Concernant les reports ou annulations de sessions, le client est tenu ?? un d??lai de pr??venance")
		my_canvas.drawString(15,235, "d'au moins 48 heures avant une session planifi??e sous peine de se voir appliquer une p??nalit??")
		my_canvas.drawString(15,215, "??quivalente ?? 100% du co??t de la session pr??vue.Toute annulation doit faire l???objet d???une")
		my_canvas.drawString(15,195, "notification par e-mail ?? l???adresse " +user_org.email+ " ou aupr??s du formateur directement")
		my_canvas.drawString(15,175, "En cas d???inex??cution de ses obligations suite ?? un ??v??nement fortuit ou ?? un cas de force majeur,")
		my_canvas.drawString(15,155, "la soci??t?? " +user_org.company_name+ " ne pourra ??tre tenue responsable ?? l?????gard de ses clients.")
		my_canvas.drawString(15,135, "Ces derniers seront inform??s par mail.")

		my_canvas.setFillColor(HexColor(0xff0800))
		my_canvas.drawString(15,105, "Programme des formations")
		my_canvas.setFillColor(HexColor(0x000000))
		my_canvas.drawString(15,85, "S???il le juge n??cessaire, l???intervenant pourra modifier les contenus des formations suivant l???actualit??,")
		my_canvas.drawString(15,65, "la dynamique de groupe, ou le niveau des participants. Les contenus des programmes figurant sur les fiches")
		my_canvas.drawString(15,45, "de pr??sentation ne sont ainsi fournis qu????? titre indicatif.")

		my_canvas.showPage()
		my_canvas.drawString(15,7500, "")
		my_canvas.setFillColor(HexColor(0xff0800))
		my_canvas.drawString(15,750, "Propri??t?? intellectuelle et droit d???auteur")
		my_canvas.setFillColor(HexColor(0x000000))
		my_canvas.drawString(15,730, "Les supports de formation, quelle qu???en soit la forme (papier, num??rique, ??lectronique???), sont prot??g??s")
		my_canvas.drawString(15,710, "par la propri??t?? intellectuelle et le droit d???auteur.Leur reproduction, partielle ou totale, ne peut ??tre")
		my_canvas.drawString(15,690, "effectu??e sans l???accord expr??s de la soci??t??. Le client s???engage ?? ne pas utiliser, transmettre ou reproduire")
		my_canvas.drawString(15,670, "tout ou partie de ces documents en vue de l???organisation ou de l???animation de formations.")

		my_canvas.setFillColor(HexColor(0xff0800))
		my_canvas.drawString(15,640, "Informatique et libert??s")
		my_canvas.setFillColor(HexColor(0x000000))
		my_canvas.drawString(15,620, "Les informations ?? caract??re personnel communiqu??es par le client ?? la soci??t??" +user_org.company_name+ " sont utiles")
		my_canvas.drawString(15,600, "pour le traitement de l???inscription ainsi que pour la constitution d???un fichier client??le pour des prospections")
		my_canvas.drawString(15,580, "commerciales. Suivant la loi ?? informatique et libert??s ?? du 6 janvier 1978, le client dispose d???un droit d???acc??s,")
		my_canvas.drawString(15,560, "de rectification et d???opposition des donn??es personnelles le concernant.")
		my_canvas.drawString(15,540, "La soci??t?? " +user_org.company_name+ " s???engage ?? appliquer les mesures administratives, physiques et techniques appropri??es")
		my_canvas.drawString(15,520, "pour pr??server la s??curit??, la confidentialit?? et l???int??grit?? des donn??es du client. Elle s???interdit de divulguer les")
		my_canvas.drawString(15,500, "donn??es du client,sauf en cas de contrainte l??gale.")
        
		my_canvas.setFillColor(HexColor(0xff0800))
		my_canvas.drawString(15,470, "Loi applicable et attribution de comp??tence")
		my_canvas.setFillColor(HexColor(0x000000))
		my_canvas.drawString(15,450, "Les pr??sentes Conditions G??n??rales de Vente sont encadr??es par la loi fran??aise. En cas de litige survenant entre")
		my_canvas.drawString(15,430, "la soci??t?? " +user_org.company_name+ " et le client, la recherche d???une solution ?? l???amiable sera privil??gi??e. ?? d??faut, l???affaire")
		my_canvas.drawString(15,410, "sera port??e devant les tribunaux de Paris.")
		my_canvas.save()
		# Fin document_contrat
		# response = requests.get(settings.MEDIA_URL+paths, stream=True)
		
		sauvegarde_contrat = Document(
			
		)
	
		sauvegarde_contrat.path.save(paths, ContentFile("test"), save=False)


	
		print(sauvegarde_contrat.path)
		
	  
 		
		
		
		serializer = self.serializer_class(sauvegarde_contrat,data=data)
		serializer.is_valid(raise_exception=True)
		
		serializer.save()

		# doc = Document.objects.all()

		# for d in doc:
		# 	print("url")
		# 	print(d.path.url)
		# 	print(d.sign.url)

		#fiche information
		paths2 = "media/doc_generate/"+user.username.replace(" ", "")+"_"+souscris_formation.formation.intitule+"_formation"+".pdf"
		p = canvas.Canvas(paths2,pagesize=letter)

    


		# p.drawImage(user_org.company_logo.url,width=100,height=100)


		framh=Frame(70,600,500,50,showBoundary=1)
		flow_obj=[]
		p.setFontSize(30)
		table=Table([["Fiche Information"]])
		flow_obj.append(table)
		framh.addFromList(flow_obj,p)


		p.setFontSize(12)
		p.drawString(70, 570, "DATE DEBUT DE FORMATION : ")
		p.drawString(250, 570, str(souscris_formation.start_session))
		p.drawString(350, 570, "DATE FIN FORMATION :")
		p.drawString(490, 570, str(souscris_formation.end_session))


		p.drawString(70, 540, "RENDEZ-VOUS :")
		p.drawString(170, 540, "PHYSIQUE")


		p.drawString(350, 540, "TELEPHONIQUE :")
		p.drawString(453, 540, user.phone_number)


		p.drawString(70, 510, "NOM : ")
		p.drawString(120, 510, user.username)


		p.drawString(70, 480, "PRENOM :")
		p.drawString(140, 480, user.first_name)

		p.drawString(70, 450, "STATUT :")
		p.drawString(140, 450, "Etudiant")



		p.drawString(70, 420, "NIVEAU ACTUEL : ")
		p.drawString(190, 420, souscris_formation.level_start)

		p.drawString(350, 420, "NIVEAU VISE :")
		p.drawString(448, 420, souscris_formation.level_end)


		p.drawString(70, 390, "OBJECTIFS DE LA FORMATION :")


		framh=Frame(70,260,500,120,showBoundary=1)
		flow_obj=[]
		p.setFontSize(30)
		tableo=Table([["\n\n\n"]])
		flow_obj.append(tableo)
		framh.addFromList(flow_obj,p)

		p.showPage()
		p.save()
	
		sauvegarde_formation = Document(
			
		)
		sauvegarde_formation.path.save(paths2,ContentFile("test"),save=False) 
	 
	
		print(sauvegarde_formation.path)

		serializer = self.serializer_class(sauvegarde_formation,data=data)
		serializer.is_valid(raise_exception=True)
		
		serializer.save()
		#fin fiche information

		#Programme de formation
		# paths3 = "media/doc_generate/"+user.username.replace(" ", "")+"_programme"+".pdf"
		# p = canvas.Canvas(paths3,pagesize=letter)

		# p.drawImage(image_path,30,680,width=100,height=100)

		# p.setFontSize(13)
		# p.setFont("Helvetica", 13)
		# p.setFillColor(HexColor(0xff0800))
		# p.drawString(200, 660, "Programme de formation individuelle")
		# p.setFillColor(HexColor(0x000000))
		
		# p.setFontSize(12)
		# p.setFillColor(HexColor(0xff0800))
		# p.drawString(70, 620, "Destinataire :")
		# p.setFillColor(HexColor(0x000000))
		# p.setFontSize(10)
		# p.drawString(70, 600, "Mr"+ user.username+ " souhaite :")
		# p.drawString(75, 580, "progresser en " + souscris_formation.formation.intitule)
		# p.drawString(75, 560, "atteindre un niveau" + " " +souscris_formation.level_end)
		# p.drawString(75, 520, "Compr??hension orale.")
		# p.drawString(75, 500, "Expression ??crite.")


		# p.drawString(75, 480, "Evaluation des comp??tences dans le cadre de mises en situation communicatives. ")
		# p.setFontSize(12)
		# p.setFillColor(HexColor(0xff0800))
		# p.drawString(70, 460, "Pr??requis :")
		# p.setFillColor(HexColor(0x000000))
		# p.setFontSize(10)

		# p.setFontSize(12)
		# p.setFillColor(HexColor(0xff0800))
		# p.drawString(70, 540, "Objectifs :")
		# p.setFillColor(HexColor(0x000000))
		# p.setFontSize(10)
		# p.drawString(70, 440, "R??alisation d???une ??valuation du niveau initial d???apr??s le bar??me europ??en du ?? Cadre Europ??en")
		# p.drawString(70, 420, "Commun de R??f??rence pour les Langues ?? pour d??terminer les objectifs de formation.")

		# p.drawString(80, 400, "Date de d??but :"+ souscris_formation.start_session)
		# p.drawString(80, 380, "Niveau d???admission suite au test de positionnement : "+ souscris_formation.level_start+".")

		#Fin programme de formation
			
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
@api_view(['PATCH'])
def updatedocument(request,pk):

	if request.method == "PATCH":
		donnee = Document.object.get(id=pk)
		serializer = updatedocuments(donnee,data=request.data,partial=True)

		if serializer.is_valid():
			serializer.save()
			
			print(serializer.data)
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

@api_view(['GET'])
def getprogrammebytrainingandcert(request,pk1,pk2):
	serializer_class = crudprogramme
	donnee = programme.objects.filter(attribue=pk1,training=pk2)

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

@csrf_exempt
@api_view(['PATCH'])
def UpdateSouscription(request,pk):
	donnee =  souscrir.objects.get(id=pk)
	
	if request.method == "PATCH":
		souscription_data = JSONParser().parse(request)
		serializer = crudsouscrir(donnee,data=souscription_data)
	
		if serializer.is_valid():
			serializer.save()
			return Response(serializer.data) 
		return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST) 


@api_view(['GET'])
@csrf_exempt
# @permission_classes([IsAuthenticated])	
def GetSouscriptionById(request, pk):
	serializer_class = crudsouscrir
	donnee = souscrir.objects.get(id=pk)
	serializer = serializer_class(donnee, many=False)
	return Response(serializer.data)


#ADD NEW SCHEDULE FOR FORMER
class CreateFormerSchedule(CreateAPIView):
    serializer_class = createnewscheduleserialize
    queryset = WeekleSchedule.objects.all()
    # permission_classes = (permissions.IsAuthenticated,autorisation)

    def perform_create(self, serializer):
        return serializer.save()

    def get_queryset(self):
        return self.queryset.filter()

    def get_queryset(self):
        return self.queryset.filter()



