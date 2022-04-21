from django.urls import path,include
from .views import RegisterStagiaire,VerifyEmail,RegisterFormateur,CreateOrganisme,RegisterResponsableP,RegisterSupResponsableP,RegisteradminOrg,login,CreateReadFormation, UpdateRemoveFormation
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
   
        
   #ENTITE LOGIN

   path('login/',login.as_view()),

   path('ViewAllUser/', views.viewalluser), 

  #CRUD FORMATION

  path('CreateAndViewFormation/', CreateReadFormation.as_view()),
  path('UpdateAndRemoveFormation/<int:id>',UpdateRemoveFormation.as_view()),
]





