import os
from decouple import config
from datetime import timedelta


# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


# SECRET_KEY
SECRET_KEY = config("DJANGO_SECRET_KEY", default="unsafe-secret-key-for-dev")

# SECURITY WARNING: don't run with debug turned on in production!
# DEBUG = config("DJANGO_DEBUG", default=False, cast=bool)
DEBUG=False

#
# ALLOWED_HOSTS = config("DJANGO_ALLOWED_HOSTS",
#                     default="localhost,127.0.0.1").split(",")
ALLOWED_HOSTS = ['summayies_app.up.railway.app', 'localhost', '127.0.0.1','31.166.91.32']
# ALLOWED_HOSTS = ['*']




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

# summayies_app
# gunicorn --workers 3 summayies_app.wsgi:application --bind 127.0.0.1:8001
        # gunicorn -w 4 -b 127.0.0.1:8000 summayies_app:summayies_app --log-level debug


MIDDLEWARE = [
    "django.middleware.security.SecurityMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
    "whitenoise.middleware.WhiteNoiseMiddleware",
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

# Set the database configuration
DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.mysql",
        "NAME": config("DB_NAME", default="cs50_summary"),
        "USER": config("DB_USER", default="root"),
        "PASSWORD": config("DB_PASSWORD", default=""),
        "HOST": config("DB_HOST", default="localhost"),
        "PORT": config("DB_PORT", default="3306"),
        "OPTIONS": {  # to avoid the error of strict mode
            "init_command": "SET sql_mode='STRICT_TRANS_TABLES'"
        },
    }
}

# DATABASES = {
#     'default': {
#         'ENGINE': 'django.db.backends.mysql',
#         'NAME': 'cs50_summary',
#         'USER': 'root',
#         'PASSWORD': 'yourpassword',
#         'HOST': 'db',  # يجب أن يتطابق مع اسم الخدمة في docker-compose.yml
#         'PORT': '3306',
#     }
# }
# Password validation
# https://docs.djangoproject.com/en/5.0/ref/settings/#auth-password-validators
AUTH_PASSWORD_VALIDATORS = [
    {
        "NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator"
    },
    {"NAME": "django.contrib.auth.password_validation.MinimumLengthValidator"},
    {"NAME": "django.contrib.auth.password_validation.CommonPasswordValidator"},
    {"NAME": "django.contrib.auth.password_validation.NumericPasswordValidator"},
]


# Internationalization
# https://docs.djangoproject.com/en/5.0/topics/i18n/

LANGUAGE_CODE = "en-us"
TIME_ZONE = "UTC"
USE_I18N = True
USE_TZ = True

# Static files Settings
STATIC_URL = "/static/"
STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')

# Set the static files directory
STATICFILES_DIRS = [os.path.join(BASE_DIR, "static")]

# Media settings
MEDIA_URL = "/media/"

# Set the media files directory
MEDIA_ROOT = os.path.join(BASE_DIR, "summary/media")

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
CSRF_COOKIE_SECURE = False             # to prevent CSRF cookie from being sent over HTTP
X_FRAME_OPTIONS = "DENY"               # to prevent clickjacking



LOGGING = {
    "version": 1,
    "disable_existing_loggers": False,
    "handlers": {
        "file": {
            "level": "ERROR",
            "class": "logging.FileHandler",
            "filename": os.path.join(BASE_DIR, "error.log"),
        },
    },
    "loggers": {
        "django": {
            "handlers": ["file"],
            "level": "ERROR",
            "propagate": True,
        },
    },
}
