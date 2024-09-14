from django.shortcuts import render, redirect, HttpResponseRedirect
from django.contrib.auth import  logout
from django.urls import reverse
from django.contrib import messages
from django.db import IntegrityError
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, BasePermission
from summary.forms import UserRegistraForm
from .models import (
    Summary,
    Course,
    Like,
    Coments,
    Fovarite,
    SummaryComents,
    SummaryLike,
    SummaryFovarite,
    RateCourse,
)
from .serializers import (
    SummarySerializer,
    CourseSerializer,
    LikeSerializer,
    ComentsSerializer,
    FovariteSerializer,
    SummaryFovariteSerializer,
    SummaryLikeSerializer,
    SummaryComentsSerializer,
    UserSerializer,
    RateCourseSerializer,
)



# # User = get_user_model()
# from django.contrib.auth import get_user_model
def index(request):
    return render(request, "summary/index.html")



#  Allow Get Without Authentication Permission
class AllowGetWithoutAuthentication(BasePermission):
    """
    Allows GET requests without authentication. For write requests, only allow if the user is authenticated.
    """
    def has_permission(self, request, view):
        # if request is GET
        if request.method == "GET":
            return True
        # if request is POST or PUT or DELETE
        return request.user and request.user.is_authenticated




#  get all courses and add new course or EDIT or DELETE
class CourseViewSet(viewsets.ModelViewSet):
    """
    Api endpoint that allows courses to be viewed or edited.
    """
    queryset = Course.objects.all().order_by("created_at")
    serializer_class = CourseSerializer
    # config permission
    permission_classes = [AllowGetWithoutAuthentication]

    def perform_create(self, serializer):
        try:
            serializer.save(user=self.request.user)
        except IntegrityError:
            return Response(
                {"error": "Error saving like."}, status=status.HTTP_400_BAD_REQUEST
            )

class SummaryViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows summaries to be viewed or edited.
    """
    queryset = Summary.objects.all().order_by("course")
    serializer_class = SummarySerializer

    def perform_create(self, serializer):
        try:
            serializer.save(user=self.request.user)
        except IntegrityError:
            return Response(
                {"error": "Error saving like."}, status=status.HTTP_400_BAD_REQUEST
            )


class LikeViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows likes to be viewed or edited.
    """
    queryset = Like.objects.all().order_by("created_at")
    serializer_class = LikeSerializer
    permission_classes = [AllowGetWithoutAuthentication]

    def perform_create(self, serializer):
        try:
            serializer.save(user=self.request.user)
        except IntegrityError:
            return Response(
                {"error": "Error saving like."}, status=status.HTTP_400_BAD_REQUEST
            )


class ComentsViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows comments to be viewed or edited.
    """
    queryset = Coments.objects.all().order_by("created_at")
    serializer_class = ComentsSerializer
    permission_classes = [AllowGetWithoutAuthentication]

    def perform_create(self, serializer):
        try:
            serializer.save(user=self.request.user)
        except IntegrityError:
            return Response(
                {"error": "Error saving comment."}, status=status.HTTP_400_BAD_REQUEST
            )


class FovariteViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows favorites to be viewed or edited.
    """
    queryset = Fovarite.objects.all().order_by("timestamp")
    serializer_class = FovariteSerializer

    def perform_create(self, serializer):
        try:
            serializer.save(user=self.request.user)
        except IntegrityError:
            return Response(
                {"error": "Error saving favorite."}, status=status.HTTP_400_BAD_REQUEST
            )


class SummaryLikeViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows summary likes to be viewed or edited.
    """
    queryset = SummaryLike.objects.all().order_by(
        "created_at"
    )  # Ensure this is correct
    serializer_class = SummaryLikeSerializer

    def perform_create(self, serializer):
        try:
            serializer.save(user=self.request.user)
        except IntegrityError:
            return Response(
                {"error": "Error saving liked summary."},
                status=status.HTTP_400_BAD_REQUEST,
            )



class SummaryFovariteViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows summary favorites to be viewed or edited.
    """
    
    queryset = SummaryFovarite.objects.all().order_by("timestamp")
    serializer_class = SummaryFovariteSerializer

    def perform_create(self, serializer):
        try:
            serializer.save(user=self.request.user)
        except IntegrityError:
            return Response(
                {"error": "Error saving favorite summary."},
                status=status.HTTP_400_BAD_REQUEST,
            )


class SummaryComentsViewSet(viewsets.ModelViewSet):
    """"
    API endpoint that allows summary comments to be viewed or edited.
    """
    
    queryset = SummaryComents.objects.all().order_by("created_at")
    serializer_class = SummaryComentsSerializer

    def perform_create(self, serializer):
        try:
            serializer.save(user=self.request.user)
        except IntegrityError:
            return Response(
                {"error": "Error saving commented summary."},
                status=status.HTTP_400_BAD_REQUEST,
            )


class RateViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows course ratings to be viewed or edited.
    """
    queryset = RateCourse.objects.all().order_by("created_at")
    serializer_class = RateCourseSerializer
    permission_classes = [AllowGetWithoutAuthentication]

    def perform_create(self, serializer):
        try:
            serializer.save(user=self.request.user)
        except IntegrityError:
            return Response(
                {"error": "Error saving like."}, status=status.HTTP_400_BAD_REQUEST
            )


@api_view(["GET"])
@permission_classes([IsAuthenticated]) 
def user_profile_view(request):
    """
    Get the user profile
    """
    user = request.user
    serializer = UserSerializer(user)
    return Response(serializer.data)



def login_view(request):
    """
    Login view
    """
    return render(request, "summary/auth/login.html")


def logout_view(request):
    """"
    Logout view
    """
    
    logout(request)
    return HttpResponseRedirect(reverse("index"))


def register(request):
    """"
    Register view
    """

    if request.method == "POST":
        form = UserRegistraForm(request.POST)
        if form.is_valid():
            user = form.save(commit=False)
            user.set_password(form.cleaned_data["password"])
            user.save()
            messages.success(request, "Account created successfully")
            return render(request, "summary/profile.html")

            # return redirect("login")
    else:
        form = UserRegistraForm()
    return render(request, "summary/auth/register.html", {"form": form})


def usersProfile(request):
    """"
    User profile view
    """
    
    return render(request, "summary/profile.html")


def favorite(request):
    """"
    Favorite view
    """
    
    return render(request, "summary/favorite.html")


def pageNotFound(request, exception):
    """"
    Page not found view
    """

    return redirect("index")
