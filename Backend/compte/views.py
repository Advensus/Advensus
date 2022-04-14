from django.shortcuts import render,redirect
from django.http import HttpResponse
from rest_framework import generics,status
from .serializers import AddStagiaire
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from .user import User

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
		token = RefreshToken.for_user(user)

		return Response(user_data,status=status.HTTP_201_CREATED)