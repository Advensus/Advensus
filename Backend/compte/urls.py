from django.urls import path,include
from .views import RegisterStagiaire,VerifyEmail
from . import views

urlpatterns = [
    path('', views.home,name="home"),
    path('register/stagiaire/', RegisterStagiaire.as_view(), name="register"),
    path('email-verify/', VerifyEmail.as_view(), name="email-verify"),       
    # path('auth/register/', include('rest_auth.registration.urls'))
    # path('register/', views.register,name="home")
]
