from django.shortcuts import render
import json
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.db import IntegrityError
from django.http import JsonResponse
from django.shortcuts import HttpResponse, HttpResponseRedirect, render ,redirect
from django.urls import reverse
from django.views.decorators.csrf import csrf_exempt
from .models import User, Course, Summary, Coments, Like, Fovarite
from django.contrib.auth.models import Group, User
from django.views.decorators.csrf import csrf_exempt


# rest
from rest_framework import permissions, viewsets
from rest_framework.views import APIView
from .serializers import (
    SummarySerializer,
    CourseSerializer,
    LikeSerializer,
    ComentsSerializer,
    FovariteSerializer,
    SummaryFovariteSerializer,
    SummaryLikeSerializer,
    SummaryComentsSerializer,
)
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import action

# Create your views here.
# from rest_framework.permissions import IsAuthenticatedOrReadOnly
from django.shortcuts import render, redirect
from django.contrib.auth import get_user_model
from django.contrib import messages
from summary.forms import UserRegistraForm

# Create your views here.
User = get_user_model()


def index(request):
    return render(request, "summary/index.html")


class SummaryViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows Summary to be viewed or edited.
    """

    queryset = Summary.objects.all().order_by("course")
    serializer_class = SummarySerializer

class CourseViewSet(viewsets.ModelViewSet):
    queryset = Course.objects.all().order_by('created_at')
    serializer_class = CourseSerializer

    def perform_create(self, serializer):
        # تعيين user_id تلقائيًا بناءً على المستخدم الذي يقوم بإرسال الطلب
        serializer.save(user=self.request.user)


class LikeViewSet(viewsets.ModelViewSet):
    queryset = Like.objects.all().order_by('created_at')
    serializer_class = LikeSerializer

    def perform_create(self, serializer):
        # تعيين user_id تلقائيًا بناءً على المستخدم الذي يقوم بإرسال الطلب
        serializer.save(user=self.request.user)

class ComentsViewSet(viewsets.ModelViewSet):
    queryset = Coments.objects.all().order_by('created_at')
    serializer_class = ComentsSerializer

    def perform_create(self, serializer):
        # تعيين user_id تلقائيًا بناءً على المستخدم الذي يقوم بإرسال الطلب
        serializer.save(user=self.request.user)

class FovariteViewSet(viewsets.ModelViewSet):
    queryset = Fovarite.objects.all().order_by('timestamp')
    serializer_class = FovariteSerializer

    def perform_create(self, serializer):
        # تعيين user_id تلقائيًا بناءً على المستخدم الذي يقوم بإرسال الطلب
        serializer.save(user=self.request.user)

class SummaryFovariteViewSet(viewsets.ModelViewSet):
    queryset = Fovarite.objects.all().order_by('timestamp')
    serializer_class = SummaryFovariteSerializer

    def perform_create(self, serializer):
        # تعيين user_id تلقائيًا بناءً على المستخدم الذي يقوم بإرسال الطلب
        serializer.save(user=self.request.user)

class SummaryLikeViewSet(viewsets.ModelViewSet):
    queryset = Like.objects.all().order_by('created_at')
    serializer_class = SummaryLikeSerializer

    def perform_create(self, serializer):
        # تعيين user_id تلقائيًا بناءً على المستخدم الذي يقوم بإرسال الطلب
        serializer.save(user=self.request.user)

class SummaryComentsViewSet(viewsets.ModelViewSet):
    queryset = Coments.objects.all().order_by('created_at')
    serializer_class = SummaryComentsSerializer

    def perform_create(self, serializer):
        # تعيين user_id تلقائيًا بناءً على المستخدم الذي يقوم بإرسال الطلب
        serializer.save(user=self.request.user)



def login_view(request):
    if request.method == "POST":
        # Attempt to sign user in
        email = request.POST["email"]
        password = request.POST["password"]
        user = authenticate(request, username=email, password=password)

        # Check if authentication successful
        if user is not None:
            login(request, user)
            return HttpResponseRedirect(reverse("index"))
        else:
            return render(
                request,
                "summary/login.html",
                {"message": "Invalid email and/or password."},
            )
    else:
        return render(request, "summary/auth/login.html")


def logout_view(request):
    logout(request)
    return HttpResponseRedirect(reverse("index"))


def register(request):
    if request.method == "POST":
        form = UserRegistraForm(request.POST)
        if form.is_valid():
            user = form.save(commit=False)
            user.set_password(form.cleaned_data["password"])
            user.save()
            messages.success(request, "Account created successfully")
            return redirect("login")
    else:
        form = UserRegistraForm()
    return render(request, "summary/auth/register.html", {"form": form})


@login_required(login_url='/login')
def usersProfile(request):
    if request.method == "POST":
        
        return render(request, "summary/profile.html")

    else:
        return render(request, "summary/profile.html")



def pageNotFound(request, exception):
    return redirect('index')  # 'home' هو اسم الـ URL للصفحة الرئيسية
