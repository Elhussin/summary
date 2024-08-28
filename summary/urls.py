from .views import( CourseSerializer ,SummarySerializer, SummaryViewSet,index,login_view,logout_view,register,CourseViewSet, usersProfile , pageNotFound,

LikeViewSet,ComentsViewSet,FovariteViewSet,SummaryLikeViewSet,SummaryComentsViewSet,SummaryFovariteViewSet)

from django.urls import path, include
from rest_framework.routers import DefaultRouter
from django.conf.urls import handler404



router = DefaultRouter()
router.register(r'summaries', SummaryViewSet, basename='summary')
router.register(r'courses', CourseViewSet,basename='course')
# router.register(r'users', CourseViewSet,basename='user')
router.register(r'coments', ComentsViewSet,basename='coments')
router.register(r'likes', LikeViewSet,basename='likes')
router.register(r'fovarties', FovariteViewSet,basename='fovarties')
router.register(r'summarylikes', SummaryLikeViewSet,basename='summarylikes')
router.register(r'summarycoments', SummaryComentsViewSet,basename='summarycoments')
router.register(r'summaryfovarties', SummaryFovariteViewSet,basename='summaryfovarties')
# router.register(r'summary', CourseViewSet,basename='summary')


# router.register(r'corseedit',MyModelList,basename='corseedit' )
handler404 = 'summary.views.pageNotFound'
    

# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns = [
    path('', index, name='index'),
    path('api/',include(router.urls)),
    # path('summaries/course/<int:course_id>/', SummaryViewSet.as_view({'get': 'list'}), name='summary-by-course'),
    path("login", login_view, name="login"),
    path("logout", logout_view, name="logout"),
    path("register", register, name="register"),
    path("profile/", usersProfile, name="profile"),
    
]


