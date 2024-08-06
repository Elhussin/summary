from django.shortcuts import render
import json
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.db import IntegrityError
from django.http import JsonResponse
from django.shortcuts import HttpResponse, HttpResponseRedirect, render
from django.urls import reverse
from django.views.decorators.csrf import csrf_exempt
from .models import User, Course, Summary, Coments, Like, Fovarite
from django.contrib.auth.models import Group, User
from rest_framework import permissions, viewsets
from .serializers import SummarySerializer, CourseSerializer,LikeSerializer,ComentsSerializer,FovariteSerializer,SummaryFovariteSerializer , SummaryLikeSerializer ,SummaryComentsSerializer

from rest_framework.response import Response
from rest_framework.decorators import action
# Create your views here.
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from django.shortcuts import render, redirect
from django.contrib.auth import get_user_model
from django.contrib import messages
from summary.forms import UserRegistrationForm

# Create your views here.
User = get_user_model()

def index(request):
    return render(request, 'summary/index.html')


class SummarySerializer(viewsets.ModelViewSet):
    """
    API endpoint that allows Summary to be viewed or edited.
    """
    queryset = Summary.objects.all().order_by('course')
    serializer_class = SummarySerializer
    
class SummaryViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows Summary to be viewed or edited.
    """
    serializer_class = SummarySerializer

    def get_queryset(self):
        queryset = Summary.objects.all().order_by('course')
        course_id = self.kwargs.get('course_id', None)
        if course_id is not None:
            queryset = queryset.filter(course_id=course_id)
        return queryset
    
class CourseViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows courses to be viewed, added, edited, or deleted.
    """
    queryset = Course.objects.all().order_by('created_at')
    serializer_class = CourseSerializer


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
        return render(request, "summary/login.html")


def logout_view(request):
    logout(request)
    return HttpResponseRedirect(reverse("index"))

# def register(request):
#     if request.method == "POST":
#         email = request.POST["email"]
#         username = request.POST["name"]
#         # Ensure password matches confirmation
#         password = request.POST["password"]
#         confirmation = request.POST["confirmation"]

#         if password != confirmation:
#             return render(
#                 request, "summary/register.html", {"message": "Passwords must match."}
#             )
#         # Attempt to create new user
#         try:
#             user = User.objects.create_user(username, email, password)
#             user.save()
#         except IntegrityError as e:
#             print(e)
#             return render(
#                 request,
#                 "summary/register.html",
#                 {"message": "Email address already taken."},
#             )
#         login(request, user)
#         return HttpResponseRedirect(reverse("index"))
#     else:
#         return render(request, "summary/register.html")

def register(request):
    if request.method == 'POST':
        form = UserRegistrationForm(request.POST)
        if form.is_valid():
            user = form.save(commit=False)
            user.set_password(form.cleaned_data['password'])
            user.save()
            messages.success(request, 'Account created successfully')
            return redirect('login')
    else:
        form = UserRegistrationForm()
    return render(request, 'summary/register.html', {'form': form})