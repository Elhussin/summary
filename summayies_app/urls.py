from django.conf import settings
from django.conf.urls.static import static
from django.urls import path, include
from django.contrib import admin

from summary import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('summary.urls')),
]




# if settings.DEBUG is False:
#     urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
