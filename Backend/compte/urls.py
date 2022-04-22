from django.urls import path,include
from .views import RegisterStagiaire,VerifyEmail,RegisterFormateur,CreateOrganisme,RegisterResponsableP,RegisterSupResponsableP,RegisteradminOrg,login
from . import views



urlpatterns = [

    # REGISTER ENTITE

    path('register/stagiaire/', RegisterStagiaire.as_view()),
    path('register/formateur/', RegisterFormateur.as_view()),
    path('register/Rp/', RegisterResponsableP.as_view()),
    path('register/Srp/', RegisterSupResponsableP.as_view()),
    path('register/admin_org/',RegisteradminOrg.as_view()),
    path('create/organisme/', CreateOrganisme.as_view()),
    
    path('email-verify/', VerifyEmail.as_view(),name="email-verify"), 
   
        
   #LOGIN URLS

   path('login/',login.as_view()),

   #VIEW ALL USERS URLS
   path('ViewAllUser/', views.viewalluser), 

  #CRUD FORMATION URLS
  path('GetAllFormation/', views.viewallformation),
	path('DetailFormation/<str:pk>/', views.detailformation),
	path('CreateFormation/', views.createformation,name='CreateFormation'),
	path('UpdateFormation/<str:pk>/', views.updateformation),
	path('DeleteFormation/<str:pk>/', views.deleteformation),

   #CRUD DOCUMENT URLS
  path('GetAllDocument/', views.viewalldocument),
	path('DetailDocument/<str:pk>/', views.detaildocument),
	path('CreateDocument/', views.createdocument),
	path('UpdateDocument/<str:pk>/', views.updatedocument),
	path('DeleteDocument/<str:pk>/', views.deletedocument),
 
]





