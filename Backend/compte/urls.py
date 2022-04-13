from django.urls import path,include
from . import views

urlpatterns = [
    path('', views.home,name="home"),
    # path('auth/', include('rest_auth.urls')),    
    # path('auth/register/', include('rest_auth.registration.urls'))
    # path('register/', views.register,name="home")
]
