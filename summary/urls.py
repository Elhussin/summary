from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import (
    index, login_view, logout_view, register, usersProfile,
    CourseViewSet, SummaryViewSet, LikeViewSet, ComentsViewSet,
    FovariteViewSet, SummaryLikeViewSet, SummaryComentsViewSet,
    SummaryFovariteViewSet,user_profile_view
)


# 
router = DefaultRouter()
router.register(r'summaries', SummaryViewSet, basename='summary')
router.register(r'courses', CourseViewSet, basename='courses')
router.register(r'comments', ComentsViewSet, basename='comments')
router.register(r'likes', LikeViewSet, basename='likes')
router.register(r'favorites', FovariteViewSet, basename='favorites')
router.register(r'summary_likes', SummaryLikeViewSet, basename='summaryLikes')
router.register(r'summary_comments', SummaryComentsViewSet, basename='summaryComments')
router.register(r'summary_favorites', SummaryFovariteViewSet, basename='summaryCavorites')

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
]
