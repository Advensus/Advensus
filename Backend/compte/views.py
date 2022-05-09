from re import X
from urllib import response
from django.shortcuts import render,redirect
from django.http import HttpResponse
from .company import  OrganismeFormation
from rest_framework import generics,status,views,permissions
from .serializers import AddStagiaire,AddFormateur,AddSociete,Adddsouscrir,AddRp,AddSrp,EmailVerificationSerializer,AddAdmin,login,cruduser,crudformation,cruddocuments,LogoutUse,CrudOrganisme
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated,IsAdminUser
from rest_framework_simplejwt.tokens import RefreshToken
from .utilisateur import User
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
from .models import Document
from django.views.decorators.csrf import csrf_exempt
from .permissions import autorisation
from django.http import JsonResponse
from .forms import formsouscrir
from .mixin import ReadWriteSerializerMixin


from rest_framework.generics import CreateAPIView,ListAPIView,DestroyAPIView,UpdateAPIView

def home(request):
	return HttpResponse("<h1>Advensus projet</h1>")


class RegisterStagiaire(generics.GenericAPIView):
	# serializer_class = AddStagiaire
	serializer_class = Adddsouscrir
	
	def post(self,request):
		user = request.data
		# form = formsouscrir(request.data)
		serializer =  self.serializer_class(data=user)
		serializer.is_valid(raise_exception=True)
		# f = form.save(commit=False)
		# f.save()
		serializer.save()
		user_data = serializer.data
		user = User.objects.get(email=user_data['email'])
		token = RefreshToken.for_user(user).access_token

		current_site = get_current_site(request).domain
		relativeLink= reverse('email-verify')
		absurl = 'http://'+current_site+relativeLink+"?token="+str(token)
		email_body = 'salut '+user.username+ '\n' +'utilise ce lien pour verifier ton compte\n'+absurl
			
		data = {'email_body': email_body,'to_email': user.email,'email_subject': 'verifier votre adress email'+current_site}
		Util.send_email(data)

		return Response(user_data,status=status.HTTP_201_CREATED)

	


class RegisterFormateur(generics.GenericAPIView):
	serializer_class = AddFormateur
	def post(self,request,*args,**kwargs): 
		formateur = request.data
		serializer = self.serializer_class(data=formateur)
		serializer.is_valid(raise_exception=True)
		serializer.save()
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
	# def get_cleaned_data(self,request):
	# 	formateur = request.data
	# 	serializer = self.serializer_class(data=formateur)
	# 	self.serializer_class.dispenser = serializer.get_cleaned_data()
	# 	serializer.save()
		
    	
    

class RegisterResponsableP(generics.GenericAPIView):
	serializer_class = AddRp
	def post(self,request):
		rp = request.data
		serializer = self.serializer_class(data=rp)
		serializer.is_valid(raise_exception=True)
		serializer.save()
		user_data = serializer.data
		return Response(user_data,status=status.HTTP_201_CREATED)

class RegisterSupResponsableP(generics.GenericAPIView):
	serializer_class = AddSrp
	def post(self,request):
		srp = request.data
		serializer = self.serializer_class(data=srp)
		serializer.is_valid(raise_exception=True)
		serializer.save()
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
	serializer_class = AddSociete
	def post(self,request):
		organisme= request.data
		serializer = self.serializer_class(data=organisme)
		serializer.is_valid(raise_exception=True)
		serializer.save()
		organisme_data = serializer.data
		return Response(organisme_data,status=status.HTTP_201_CREATED)

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

		return Response(serializer.data,status=status.HTTP_200_OK)


# CRUD OPERATION VIEW ALL USERS

@api_view(['GET'])
@csrf_exempt
# @permission_classes([IsAuthenticated,autorisation])	
def viewalluser(request):
	serializer_class = cruduser
	donnee = User.objects.all()
	serializer = serializer_class(donnee, many=True)
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
@permission_classes([IsAuthenticated,autorisation])	
def updateformation(request, pk):
	serializer_class = crudformation
	donnee = formation.objects.get(id=pk)
	serializer = serializer_class(instance=donnee, data=request.data)
	if serializer.is_valid():
		serializer.save()

	return Response(serializer.data)
@api_view(['DELETE'])
@csrf_exempt
@permission_classes([IsAuthenticated,autorisation])	
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
@permission_classes([IsAuthenticated])
def viewalldocument(request):
	serializer_class = cruddocuments
	donnee = Document.objects.all()

	serializer = serializer_class(donnee, many=True)
	return Response(serializer.data)


@api_view(['GET'])
@csrf_exempt
@permission_classes([IsAuthenticated])	
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
@permission_classes([IsAuthenticated])	
def updatedocument(request, pk):
	serializer_class = cruddocuments
	donnee = Document.objects.get(id=pk)
	serializer = serializer_class(instance=donnee, data=request.data)
	if serializer.is_valid():
		serializer.save()

@api_view(['DELETE'])
@csrf_exempt
@permission_classes([IsAuthenticated])	
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

@api_view(['GET'])
def getallorganisme(request):
	serializer_class = CrudOrganisme
	donnee = OrganismeFormation.objects.all()

	serializer = serializer_class(donnee, many=True)
	return Response(serializer.data)


class LogoutUser(generics.GenericAPIView):
	serializer_class = LogoutUse
	permission_classes = (permissions.IsAuthenticated,)

	def post(self,request):
		serializer = self.serializer_class(data=request.data)
		serializer.is_valid(raise_exception=True)
		serializer.save()

		return Response(status=status.HTTP_204_NO_CONTENT)

