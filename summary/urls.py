from django.urls import path, include,re_path
from django.conf.urls.static import static
from django.conf import settings
from django.views.generic import TemplateView
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import (
    index, login_view, logout_view, register, usersProfile,
    CourseViewSet, SummaryViewSet, LikeViewSet, ComentsViewSet,
    FovariteViewSet, SummaryLikeViewSet, SummaryComentsViewSet,
    SummaryFovariteViewSet,user_profile_view,favorite,RateViewSet
)

# register the viewsets with the router
router = DefaultRouter()
router.register(r'summaries', SummaryViewSet, basename='summary')
router.register(r'courses', CourseViewSet, basename='courses')
router.register(r'comments', ComentsViewSet, basename='comments')
router.register(r'likes', LikeViewSet, basename='likes')
router.register(r'favorites', FovariteViewSet, basename='favorites')
router.register(r'summaryLikes', SummaryLikeViewSet, basename='summaryLikes')
router.register(r'summaryComments', SummaryComentsViewSet, basename='summaryComments')
router.register(r'summaryFavorites', SummaryFovariteViewSet, basename='summaryCavorites')
router.register(r'rates', RateViewSet, basename='rates')

# define the URL patterns for the app  
urlpatterns = [
    path('view/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),  
    path('view/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'), 
    path('view/user-profile/', user_profile_view, name='user_profile'),
    path('', index, name='index'),
    path('view/', include(router.urls)), 
    path("login/", login_view, name="login"),
    path("logout/", logout_view, name="logout"),
    path("register/", register, name="register"),
    path("profile/", usersProfile, name="profile"), 
    path('favorites/', favorite, name='favorite'),
    *static(settings.STATIC_URL, document_root=settings.STATIC_ROOT), # To Allow  static files  Urls
    *static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT), # To Allow media files urls
    re_path(r'^.*$', TemplateView.as_view(template_name='summary/index.html')),   # To Render the Unkown Urls to the index.html
]
