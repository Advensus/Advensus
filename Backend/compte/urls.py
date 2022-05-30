from django.urls import path,include
from .views import CreateCertificate,CreateProgramme,CreateCourses,CreateReservation,login_org,CreateSociete,AddSouscrir,RegisterStagiaire,CreateOrganisme,VerifyEmail,RegisterFormateur,CreateSociete,RegisterResponsableP,RegisterSupResponsableP,RegisteradminOrg,login,LogoutUser,CreateFormation,CreateDocument, viewallreservations

from . import views


urlpatterns = [

    # REGISTER ENTITE

    path('register/stagiaire/', RegisterStagiaire.as_view()),
    path('register/formateur/', RegisterFormateur.as_view()),
    path('register/Rp/', RegisterResponsableP.as_view()),
    path('register/Srp/', RegisterSupResponsableP.as_view()),
    path('register/admin_societe/',RegisteradminOrg.as_view()),
    path('email-verify/', VerifyEmail.as_view(),name="email-verify"), 
    
    #CRUD SOCIETE
    path("GetAllSociete/", views.viewallsociete),
    path('create/societe/', CreateSociete.as_view()),
    path('create/souscrir/', AddSouscrir.as_view()),

    #CRUD SOCIETE
    path("GetAllProgramme/", views.viewallprogramme),
    path("GetAllCertificate/", views.viewallcertificate),
    path('create/programme/', CreateProgramme.as_view()),
    path('create/certificate/', CreateCertificate.as_view()),

    # CRUD COURSES 
    path('create/courses/', CreateCourses.as_view()),
    path('GetAllCourses/',views.viewallcourses),

    #CRUD RESERVATION
    path('create/reservation/',CreateReservation.as_view()),
    path('GetAllReservation/',views.viewallreservations),
        
   #LOGIN URLS

    path('login/',login.as_view()),
    path('login_org/',login_org.as_view()),
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

    path('GetStagaireByOrg/<str:pk>/',views.getstagiairebyorg),
    path('GetOrganismeBySoc/<str:pk>/',views.getorganismebysoc),
    path('GetReservationBySta/<str:pk>/',views.getreservationbysta),
    path('GetReservationByRp/<str:pk>/',views.getreservationbyrp),


]





