from .views import CourseSerializer ,SummarySerializer, SummaryViewSet,index,login_view,logout_view,register,CourseViewSet
from django.urls import path, include
from rest_framework.routers import DefaultRouter




router = DefaultRouter()
router.register(r'summaries', SummaryViewSet, basename='summary')
router.register(r'courses', CourseViewSet,basename='course')


    

# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns = [
    path('', index, name='index'),
    path('api/',include(router.urls)),
    # path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    path('summaries/course/<int:course_id>/', SummaryViewSet.as_view({'get': 'list'}), name='summary-by-course'),
    path("login", login_view, name="login"),
    path("logout", logout_view, name="logout"),
    path("register", register, name="register"),
]


