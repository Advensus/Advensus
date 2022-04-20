from django.urls import path,include
from .views import RegisterStagiaire,VerifyEmail,RegisterFormateur,CreateOrganisme,RegisterResponsableP,RegisterSupResponsableP,RegisteradminOrg,loginadmin_org
from . import views



urlpatterns = [

    # REGISTER ENTITE

    path('register/stagiaire/', RegisterStagiaire.as_view(), name="register"),
    path('register/formateur/', RegisterFormateur.as_view(), name="formateur"),
    path('register/Rp/', RegisterResponsableP.as_view(), name="Rp"),
    path('register/Srp/', RegisterSupResponsableP.as_view(), name="Srp"),
    path('register/admin_org/',RegisteradminOrg.as_view(), name="admin_org"),
    path('create/organisme/', CreateOrganisme.as_view(), name="organisme"),
    
    path('email-verify/', VerifyEmail.as_view(), name="email-verify"), 
   
        
   #ENTITE LOGIN

   path('login/admin_org/',loginadmin_org.as_view(), name="log_admin_org"),
]




