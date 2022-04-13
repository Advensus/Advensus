from django.shortcuts import render,redirect
from django.http import HttpResponse
from rest_framework import generics

def home(request):
	return HttpResponse("<h1>Advensus projet</h1>")


class RegisterStagiaire(generics.CreateAPIView):
	serializer_class = 
	def post(self,request):
		user = request.data