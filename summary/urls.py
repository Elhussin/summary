from .views import CourseSerializer ,SummarySerializer, SummaryViewSet,index,login_view,logout_view,register,CourseViewSet, usersProfile
from django.urls import path, include
from rest_framework.routers import DefaultRouter




router = DefaultRouter()
router.register(r'summaries', SummaryViewSet, basename='summary')
router.register(r'courses', CourseViewSet,basename='course')
# router.register(r'summaries', SummaryViewSet)

# router.register(r'corseedit',MyModelList,basename='corseedit' )

    

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




# urlpatterns = [
#     path("", views.index, name="index"),
#     path("login",  views.login_view, name="login"),
#     path("logout", views.logout_view, name="logout"),
#     path("register", views.register, name="register"),
#     path("Newlisting", views.create_listing, name="Newlisting"),
#     path("categorieView/<str:categori>", views.view_categories, name="categorieView"),
#     path("categories", views.categories, name="categories"),
#     path("listing/<int:id>", views.listing, name="listing"),
#     path("watchlist", views.watchlist, name="watchlist"),
#     path("Romvewatchlist", views.Romvewatchlist, name="Romvewatchlist"),
#     path("comment", views.add_comment, name="comment"),
#     path("paid", views.paid, name="paid"),
#     path("endPaid", views.end_paid, name="endPaid"),
# ]
# urlpatterns = [
#     path("", views.index, name="index"),
#     path("login", views.login_view, name="login"),
#     path("logout", views.logout_view, name="logout"),
#     path("register", views.register, name="register"),
#     path("viewPost/", views.view_post, name="viewPost"),
#     path("like/<int:post_id>", views.add_like, name="like"),
#     path("profile/", views.usersProfile, name="profile"),
#     path("unlike/<int:post_id>", views.un_like, name="unlike"),
#     path("addposts", views.add_post , name="addposts"),
#     path("addComment", views.addComment , name="addComment"),
#     path("follow/<int:user_id>", views.follow , name="follow"),
#     path("<path:path>", views.hendelPAth, name="hendelPAth"),
# ]
