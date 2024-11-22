import os
from decouple import config
from datetime import timedelta
from decouple import AutoConfig

import dj_database_url



config = AutoConfig(search_path=os.path.dirname(os.path.abspath(__file__)))

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
print(config('DATABASE_URL', default='Not Found'))

# Secret Key
SECRET_KEY = config('DJANGO_SECRET_KEY', default='unsafe-secret-key-for-dev')

# Debug Mode
DEBUG = config('DJANGO_DEBUG', default=False, cast=bool)

# Allowed Hosts

ALLOWED_HOSTS = config('DJANGO_ALLOWED_HOSTS', default='localhost,127.0.0.1').split(',')

# Database Configuration
DATABASES = {
    'default': dj_database_url.config(default=config('DATABASE_URL'))
}



# Application definition
INSTALLED_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    "summary",
    "rest_framework",
    "rest_framework_simplejwt",
]


MIDDLEWARE = [
    "django.middleware.security.SecurityMiddleware",
    'whitenoise.middleware.WhiteNoiseMiddleware',
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",

    
]

ROOT_URLCONF = "summayies_app.urls"

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [os.path.join(BASE_DIR, "templates")],  # Set templates directory
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]

WSGI_APPLICATION = "summayies_app.wsgi.application"



AUTH_PASSWORD_VALIDATORS = [
    {
        "NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator"
    },
    {"NAME": "django.contrib.auth.password_validation.MinimumLengthValidator"},
    {"NAME": "django.contrib.auth.password_validation.CommonPasswordValidator"},
    {"NAME": "django.contrib.auth.password_validation.NumericPasswordValidator"},
]




LANGUAGE_CODE = "en-us"
TIME_ZONE = "UTC"
USE_I18N = True
USE_TZ = True

# # Static files Settings
# STATIC_URL = "/static/"
# # STATICFILES_DIRS = [os.path.join(BASE_DIR, "static")]
# STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')


    
    
# MEDIA_URL = "/media/"
# MEDIA_ROOT = os.path.join(BASE_DIR, "summary/media")

# Static files settings
STATIC_URL = '/static/'
STATICFILES_DIRS = [os.path.join(os.path.dirname(os.path.abspath(__file__)), "static")]
STATIC_ROOT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "staticfiles")

# Media files settings
# MEDIA_URL = '/media/'
# MEDIA_ROOT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "media")
# Media files settings
MEDIA_URL = '/media/'  # المسار الذي تستخدمه في التطبيق للوصول إلى الوسائط
MEDIA_ROOT = os.path.join(BASE_DIR, 'media')  # الموقع الفعلي للوسائط في الخادم


# اعدادت تفعل مع النشر
SECURE_SSL_REDIRECT = True
CSRF_COOKIE_SECURE = True
SECURE_HSTS_PRELOAD = True


# Default primary key field type
DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"
AUTH_USER_MODEL = "summary.User"

# IsAuthenticated
REST_FRAMEWORK = {
    "DEFAULT_AUTHENTICATION_CLASSES": (
        "rest_framework_simplejwt.authentication.JWTAuthentication",
        # 'rest_framework.authentication.SessionAuthentication',
        # 'rest_framework.authentication.BasicAuthentication',
    ),
    "DEFAULT_PERMISSION_CLASSES": (
        "rest_framework.permissions.IsAuthenticatedOrReadOnly",
    ),
    "DEFAULT_RENDERER_CLASSES": ("rest_framework.renderers.JSONRenderer",),
    "DEFAULT_THROTTLE_CLASSES": [
        "rest_framework.throttling.UserRateThrottle",
        "rest_framework.throttling.AnonRateThrottle",
    ],
    # to disable throttling
    "DEFAULT_THROTTLE_CLASSES": [],
    #  to set the throttle rate
    # 'DEFAULT_THROTTLE_RATES': {
    #     'user': '10000/day',
    #     'anon': '1000/day',
    # },
}


# Jwt settings
SIMPLE_JWT = {
    "ACCESS_TOKEN_LIFETIME": timedelta(minutes=60),  # Set the token lifetime
    "REFRESH_TOKEN_LIFETIME": timedelta(days=1),     # Set the refresh token lifetime
    "ROTATE_REFRESH_TOKENS": True,                   # to rotate the refresh token
    "BLACKLIST_AFTER_ROTATION": True,                # to blacklist the old token
    "ALGORITHM": "HS256",                            # Set the algorithm
    "SIGNING_KEY": SECRET_KEY,                       # Set the signing key to the secret key
    "AUTH_HEADER_TYPES": ("Bearer",),                # Set the auth header type
}


# Security Headers
SECURE_HSTS_SECONDS = 31536000         # 1 year
SECURE_HSTS_INCLUDE_SUBDOMAINS = True  # to include subdomains
SECURE_SSL_REDIRECT = False            # True # to redirect http to https
SECURE_BROWSER_XSS_FILTER = True       # to enable XSS protection
SECURE_CONTENT_TYPE_NOSNIFF = True     # to prevent MIME type sniffing
SESSION_COOKIE_SECURE = True           # to prevent session cookie from being sent over HTTP
CSRF_COOKIE_SECURE = True             # to prevent CSRF cookie from being sent over HTTP
X_FRAME_OPTIONS = "DENY"               # to prevent clickjacking

# LOGGING = {
#     'version': 1,
#     'disable_existing_loggers': False,
#     'handlers': {
#         # 'console': {
#         #     'level': 'DEBUG',
#         #     'class': 'logging.StreamHandler',
#         # },
#         'file': {
#             'level': 'DEBUG',
#             'class': 'logging.FileHandler',
#             'filename': os.path.join(BASE_DIR, 'debug.log'),
#         },
#     },
#     'loggers': {
#         'django': {
#             'handlers': ['console', 'file'],
#             'level': 'DEBUG',
#         },
#         'decouple': {
#             'handlers': ['console', 'file'],
#             'level': 'DEBUG',
#         },
#     },
# }
LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'handlers': {
        'file': {
            'level': 'DEBUG',  # مستوى التسجيل
            'class': 'logging.FileHandler',
            'filename': os.path.join(BASE_DIR, 'debug.log'),  # مسار ملف السجلات
        },
    },
    'loggers': {
        'django': {
            'handlers': ['file'],  # استخدم معالج الملفات فقط
            'level': 'DEBUG',  # مستوى التسجيل
        },
        'decouple': {
            'handlers': ['file'],  # استخدم معالج الملفات فقط
            'level': 'DEBUG',
        },
    },
}
