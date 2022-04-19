from django.urls import path,include
from .views import RegisterStagiaire,VerifyEmail,RegisterFormateur,CreateOrganisme,RegisterResponsableP,RegisterSupResponsableP
from . import views

from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi



schema_view = get_schema_view(
   openapi.Info(
      title="Advensus API",
      default_version='v1',
      description="Test description",
      terms_of_service="https://www.Advensus.com/policies/terms/",
      contact=openapi.Contact(email="contact@Advensus.local"),
      license=openapi.License(name="Test License"),
   ),
   public=True,
   permission_classes=(permissions.AllowAny,),
)

urlpatterns = [

    # REGISTER ENTITE
    path('', views.home,name="home"),
    path('register/stagiaire/', RegisterStagiaire.as_view(), name="register"),
    path('register/formateur/', RegisterFormateur.as_view(), name="formateur"),
    path('register/Rp/', RegisterResponsableP.as_view(), name="Rp"),
    path('register/Srp/', RegisterSupResponsableP.as_view(), name="Srp"),
    path('create/organisme/', CreateOrganisme.as_view(), name="organisme"),

    # DOCUMENTATION API
    path('email-verify/', VerifyEmail.as_view(), name="email-verify"), 
    path('^swagger(?P<format>\.json|\.yaml)$', schema_view.without_ui(cache_timeout=0), name='schema-json'),
    path('^swagger/$', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    path('^redoc/$', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),      
   
]




