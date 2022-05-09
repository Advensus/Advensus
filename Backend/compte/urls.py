from django.urls import path,include
from .views import CreateSociete,getallorganisme, RegisterStagiaire,CreateOrganisme,VerifyEmail,RegisterFormateur,CreateSociete,RegisterResponsableP,RegisterSupResponsableP,RegisteradminOrg,login,LogoutUser,CreateFormation,CreateDocument

from . import views



urlpatterns = [

    # REGISTER ENTITE

    path('register/stagiaire/', RegisterStagiaire.as_view()),
    path('register/formateur/', RegisterFormateur.as_view()),
    path('register/Rp/', RegisterResponsableP.as_view()),
    path('register/Srp/', RegisterSupResponsableP.as_view()),
    path('register/admin_societe/',RegisteradminOrg.as_view()),
    path('create/societe/', CreateSociete.as_view()),
    path('email-verify/', VerifyEmail.as_view(),name="email-verify"), 
  
        
   #LOGIN URLS

    path('login/',login.as_view()),
    path('DetailUser/<str:pk>/', views.detailuser),

   #VIEW ALL USERS URLS
    path('ViewAllUser/', views.viewalluser), 

   #CRUD FORMATION URLS
    path('CreateFormation/', views.CreateFormation.as_view()),
  
    path('GetAllFormation/', views.viewallformation),
    path('DetailFormation/<str:pk>/', views.detailformation),
    path('UpdateFormation/<str:pk>/', views.updateformation),
    path('DeleteFormation/<str:pk>/', views.deleteformation),

   #CRUD DOCUMENT URLS
    path('GetAllDocument/', views.viewalldocument),
    path('DetailDocument/<str:pk>/', views.detaildocument),

    path('CreateDocument/', views.CreateDocument.as_view()),
    path('UpdateDocument/<str:pk>/', views.updatedocument),
    path('DeleteDocument/<str:pk>/', views.deletedocument),
   #CRUDORGANISME
   path('GetAllOrganisme/',views.getallorganisme),
   path('create/organisme/', CreateOrganisme.as_view()),
   #LOGOUT URL
    # path('Logout/',LogoutUser.as_view()),
 
]





