from django.urls import path,include
from .views import RegisterStagiaire,VerifyEmail,RegisterFormateur,CreateOrganisme,RegisterResponsableP,RegisterSupResponsableP
from . import views

urlpatterns = [
    path('', views.home,name="home"),
    path('register/stagiaire/', RegisterStagiaire.as_view(), name="register"),
    path('register/formateur/', RegisterFormateur.as_view(), name="formateur"),
    path('register/Rp/', RegisterResponsableP.as_view(), name="Rp"),
    path('register/Srp/', RegisterSupResponsableP.as_view(), name="Srp"),
    path('create/organisme/', CreateOrganisme.as_view(), name="organisme"),
    path('email-verify/', VerifyEmail.as_view(), name="email-verify"),       
    # path('auth/register/', include('rest_auth.registration.urls'))
    # path('register/', views.register,name="home")
]
