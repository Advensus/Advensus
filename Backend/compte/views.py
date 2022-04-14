from django.shortcuts import render,redirect
from django.http import HttpResponse
from rest_framework import generics,status
from .serializers import AddStagiaire
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from .user import User
from .utils import Util
from django.contrib.sites.shortcuts import get_current_site
from django.urls import reverse
def home(request):
	return HttpResponse("<h1>Advensus projet</h1>")


class RegisterStagiaire(generics.GenericAPIView):
	serializer_class = AddStagiaire
	def post(self,request):
		user = request.data
		serializer = self.serializer_class(data=user)
		serializer.is_valid(raise_exception=True)
		serializer.save()
		user_data = serializer.data

		user = User.objects.get(email=user_data['email'])
		token = RefreshToken.for_user(user).access_token

		current_site = get_current_site(request).domain
		relativelink= reverse('email-verify')
		absurl = 'http://'+current_site+relativelink+"?token="+str(token)
		email_body = 'salut '+user.username+'utilise ce lien pour verifier ton compte\n'+absurl
		
		data = {'email_body': email_body,'to_email': user.email,'email_subject': 'verifier votre adress email'+current_site}
		Util.send_email(data)

		return Response(user_data,status=status.HTTP_201_CREATED)


class VerifyEmail(generics.GenericAPIView):
	def get(self):
		pass