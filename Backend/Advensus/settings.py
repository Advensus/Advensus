"""
Django settings for Advensus project.

Generated by 'django-admin startproject' using Django 3.2.12.

For more information on this file, see
https://docs.djangoproject.com/en/3.2/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/3.2/ref/settings/
"""

from pathlib import Path
import os
import datetime

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/3.2/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'django-insecure-+z2h$-7tdrh5esp7#xo@_8lw&h$=txq9n_+7(_h5(40h$jnzi1'

# SECURITY WARNING: don't run with debug turned on in production!
# DEBUG = False
DEBUG = True

ALLOWED_HOSTS = ['*']
# ALLOWED_HOSTS = ['185.215.180.164']


# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    "corsheaders", 
    'compte',
    'drf_yasg',
    'rest_framework',
    'rest_framework_simplejwt',
    'rest_framework_simplejwt.token_blacklist',
    
   
]

MIDDLEWARE = [
    "corsheaders.middleware.CorsMiddleware",
    "django.middleware.common.CommonMiddleware",
    'django.middleware.security.SecurityMiddleware',
    # 'whitenoise.middleware.WhiteNoiseMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'Advensus.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
                'django.template.context_processors.media',
            ],
        },
    },
]

WSGI_APPLICATION = 'Advensus.wsgi.application'


# Database
# https://docs.djangoproject.com/en/3.2/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'advansus',
        'USER': 'advansus',
        'PASSWORD': 'JrmkAV22@97',
        'HOST': 'db',
        'PORT': 5432,
    }
}


# Password validation
# https://docs.djangoproject.com/en/3.2/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalizationjuventussoh@gmail.com



# Default primary key field type
# https://docs.djangoproject.com/en/3.2/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'
AUTH_USER_MODEL = "compte.User"



CORS_ALLOW_ALL_ORIGINS = True
# CORS_ALLOW_ALL_ORIGINS = False
# CORS_ORIGIN_WHITELIST = ['http://185.215.180.164:3000']
# CORS_ORIGIN_WHITELIST = ['http://185.215.180.164:3000']
CORS_ALLOW_METHODS = [
    "DELETE",
    "GET",
    "OPTIONS",
    "PATCH",
    "POST",
    "PUT",
]

CORS_ALLOW_HEADERS = [
    "accept",
    "accept-encoding",
    "authorization",
    "content-type",
    "dnt",
    "origin",
    "user-agent",
    "x-csrftoken",
    "x-requested-with",
]

EMAIL_BACKEND = 'django.core.mail.backends.console.EmailBackend'

# AUTHENTICATION_BACKENDS = ("django.contrib.auth.backends.ModelBackend",    
# "allauth.account.auth_backends.AuthenticationBackend",)

# SITE_ID = 1 
# ACCOUNT_EMAIL_REQUIRED = True
# ACCOUNT_USERNAME_REQUIRED = False
# ACCOUNT_SESSION_REMEMBER = True
# ACCOUNT_AUTHENTICATION_METHOD = 'email'
# ACCOUNT_UNIQUE_EMAIL = True

# REST_FRAMEWORK = {    
# 'DATETIME_FORMAT': "%m/%d/%Y %I:%M%P",    
# 'DEFAULT_AUTHENTICATION_CLASSES': [
    
#     'rest_framework.authentication.TokenAuthentication',    

# ],
# }

# s122@22@z
REST_FRAMEWORK = {
    'NON_FIELD_ERRORS_KEY': 'erro',
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    ),
   
}
SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME':datetime.timedelta(minutes=60),
    'REFRESH_TOKEN_LIFETIME':datetime.timedelta(days=1),
}
SWAGGER_SETTINGS ={
    'SECURITY_DEFINITIONS':{
        'Bearer':{
            'type':'apiKey',
            'name':'Authorization',
            'in':'header'
        }
    }
}

EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
EMAIL_HOST = 'smtp.mailgun.com'
EMAIL_USE_TLS =  True
EMAIL_PORT =  587
EMAIL_HOST_USER = ""
EMAIL_HOST_PASSWORD = ""
EMAIL_USE_TLS: True

# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/3.2/howto/static-files/



# MEDIA_ROOT =  BASE_DIR / 'media'
MEDIA_ROOT = os.path.join(BASE_DIR, 'media')
MEDIA_URL = '/media/'



STATIC_URL = '/static/'
STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')

# STATICFILES_STORAGE = "whitenoise.storage.CompressedManifestStaticFilesStorage"


COURSES = "compte.Courses"

