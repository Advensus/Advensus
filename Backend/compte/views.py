from django.shortcuts import render,redirect
from django.http import HttpResponse
from rest_framework import generics
from .serializers import AddStagiaire

def home(request):
	return HttpResponse("<h1>Advensus projet</h1>")


class RegisterStagiaire(generics.CreateAPIView):
	serializer_class = AddStagiaire
	def post(self,request):
		user = request.data
		serializer = self.serializer_class(data=user)
		serializer.is_valid(raiser_exception=True)
		serializer.save()