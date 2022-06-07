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

    #CRUD PROGRAMME AND CERTIFICATE
    path("GetAllProgramme/", views.viewallprogramme),
    path("GetAllCertificate/", views.viewallcertificate),
    path('create/programme/', CreateProgramme.as_view()),
    path('create/certificate/', CreateCertificate.as_view()),
    path('GetCertificationByFor/<str:pk>/',views.getcertificationbyform),
    path('GetProgrammeByCert/<str:pk>/',views.getprogrammebycert),

    # CRUD COURSES 
    path('create/courses/', CreateCourses.as_view()),
    path('GetAllCourses/',views.viewallcourses),

    #CRUD RESERVATION
    path('create/reservation/',CreateReservation.as_view()),
    path('GetAllReservation/',views.viewallreservations),
    path('UpdateReservation/<str:pk>/', views.updatereservation),
    path('DeleteReservation/<str:pk>/', views.deletereservation),
        
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
    path('UpdateOrganisme/<str:pk>/', views.updateorganisme),
    path('DeleteOrganisme/<str:pk>/', views.deleteorganisme),
   #LOGOUT URL
   # path('Logout/',LogoutUser.as_view()),

    path('GetStagaireByOrg/<str:pk>/',views.getstagiairebyorg),
    path('GetOrganismeBySoc/<str:pk>/',views.getorganismebysoc),
    path('GetReservationBySta/<str:pk>/',views.getreservationbysta),
    path('GetReservationByRp/<str:pk>/',views.getreservationbyrp),

    path('GetFormateurByFormation/<str:pk>/',views.getformateurbyformation),
    path('GetAdminBySociete/<str:pk>/',views.getadminbysociete),

    path('GetAllSouscription/', views.viewallsouscription),


]





