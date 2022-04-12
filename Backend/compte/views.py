from django.shortcuts import render,redirect
from django.http import HttpResponse
from django.contrib import messages
from .user import User
from rest_framework.response import Response
from rest_framework.decorators import api_view

@api_view(['GET'])
def home(request):
	api_urls = {
		'register':'register/',
		# 'Detail Vue':'/task-detail/<str:pk>/',
		# 'Create':'/task-create/',
		# 'Update':'/task-update/<str:pk>/',
		# 'Delete':'/task-delete/<str:pk>/',
		}

	return Response(api_urls)

   

# @api_view(['POST'])
# def register(request):
#     if method == POST:
#         first_name = request.POSt.get('frist_name')
#         email = request.POST.get('email')
#         password1 = request.POST.get('password1')
#         password2 = request.POST.get('password2')

#         if password1 == password2:
#             if User.objects.filter(email=email).exists():
#                 messages.error(request, "mail existant")
#             else: 
#                 user = User.objects.create_user(first_name=first_name,email=email)
#                 user.save()
#                 print("okkk")
#         elif password1 != password2:
#             messages.error(request,"different")
        
#     else:
#         print("accueil")

  
# Create your views here.
