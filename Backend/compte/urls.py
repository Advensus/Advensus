from django.urls import path,include
from .views import RegisterStagiaire
from . import views

urlpatterns = [
    path('', views.home,name="home"),
    path('register/', RegisterStagiaire.as_view(), name="register"),    
    # path('auth/register/', include('rest_auth.registration.urls'))
    # path('register/', views.register,name="home")
]
