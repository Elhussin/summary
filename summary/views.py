from django.shortcuts import render, redirect, HttpResponseRedirect
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from django.urls import reverse
from django.views.decorators.csrf import csrf_exempt
from django.contrib import messages
from rest_framework import viewsets, status
from rest_framework.response import Response
from .models import Summary, Course, Like, Coments, Fovarite
from .serializers import (
    SummarySerializer, CourseSerializer, LikeSerializer,
    ComentsSerializer, FovariteSerializer, SummaryFovariteSerializer,
    SummaryLikeSerializer, SummaryComentsSerializer
)
from summary.forms import UserRegistraForm
from django.contrib.auth import get_user_model
from django.db import IntegrityError

# Create your views here.
User = get_user_model()


def index(request):
    return render(request, "summary/index.html")

class SummaryViewSet(viewsets.ModelViewSet):
    queryset = Summary.objects.all().order_by("course")
    serializer_class = SummarySerializer

class CourseViewSet(viewsets.ModelViewSet):
    queryset = Course.objects.all().order_by('created_at')
    serializer_class = CourseSerializer

    def perform_create(self, serializer):
        try:
            serializer.save(user=self.request.user)
        except IntegrityError:
            return Response({"error": "Error saving course."}, status=status.HTTP_400_BAD_REQUEST)



class LikeViewSet(viewsets.ModelViewSet):
    queryset = Like.objects.all().order_by('created_at')
    serializer_class = LikeSerializer

    def perform_create(self, serializer):
        try:
            serializer.save(user=self.request.user)
        except IntegrityError:
            return Response({"error": "Error saving like."}, status=status.HTTP_400_BAD_REQUEST)


class ComentsViewSet(viewsets.ModelViewSet):
    queryset = Coments.objects.all().order_by('created_at')
    serializer_class = ComentsSerializer

    def perform_create(self, serializer):
        try:
            serializer.save(user=self.request.user)
        except IntegrityError:
            return Response({"error": "Error saving comment."}, status=status.HTTP_400_BAD_REQUEST)


class FovariteViewSet(viewsets.ModelViewSet):
    queryset = Fovarite.objects.all().order_by('timestamp')
    serializer_class = FovariteSerializer

    def perform_create(self, serializer):
        try:
            serializer.save(user=self.request.user)
        except IntegrityError:
            return Response({"error": "Error saving favorite."}, status=status.HTTP_400_BAD_REQUEST)


class SummaryLikeViewSet(viewsets.ModelViewSet):
    queryset = Like.objects.all().order_by('created_at')
    serializer_class = SummaryLikeSerializer

    def perform_create(self, serializer):
        try:
            serializer.save(user=self.request.user)
        except IntegrityError:
            return Response({"error": "Error saving liked summary."}, status=status.HTTP_400_BAD_REQUEST)

class SummaryFovariteViewSet(viewsets.ModelViewSet):
    queryset = Fovarite.objects.all().order_by('timestamp')
    serializer_class = SummaryFovariteSerializer

    def perform_create(self, serializer):
        try:
            serializer.save(user=self.request.user)
        except IntegrityError:
            return Response({"error": "Error saving favorite summary."}, status=status.HTTP_400_BAD_REQUEST)


class SummaryComentsViewSet(viewsets.ModelViewSet):
    queryset = Coments.objects.all().order_by('created_at')
    serializer_class = SummaryComentsSerializer

    def perform_create(self, serializer):
        try:
            serializer.save(user=self.request.user)
        except IntegrityError:
            return Response({"error": "Error saving commented summary."}, status=status.HTTP_400_BAD_REQUEST)

def login_view(request):
    if request.method == "POST":
        email = request.POST["email"]
        password = request.POST["password"]
        user = authenticate(request, username=email, password=password)
        if user is not None:
            if user.is_active:
                login(request, user)
                return HttpResponseRedirect(reverse("index"))
            else:
                messages.error(request, "Account is inactive.")
        else:
            messages.error(request, "Invalid email and/or password.")
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
    return render(request, "summary/profile.html")

def pageNotFound(request, exception):
    return redirect('index')
