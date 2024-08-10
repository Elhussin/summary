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
    """
    API endpoint that allows courses to be viewed, added, edited, or deleted.
    """

    queryset = Course.objects.all().order_by("created_at")
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
    return render(request, "summary/register.html", {"form": form})


# class SummarySerializer(viewsets.ModelViewSet):
#     """
#     API endpoint that allows Summary to be viewed or edited.
#     """
#     queryset = Summary.objects.all().order_by('course')
#     serializer_class = SummarySerializer


# class SummaryViewSet(viewsets.ModelViewSet):
#     """
#     API endpoint that allows Summary to be viewed or edited.
#     """
#     serializer_class = SummarySerializer

#     def get_queryset(self):
#         queryset = Summary.objects.all().order_by('course')
#         course_id = self.kwargs.get('course_id', None)
#         if course_id is not None:
#             queryset = queryset.filter(course_id=course_id)
#         return queryset


# @login_required(login_url='/login')
# def create_listing(request):
#     # get form
#     if request.method == "POST":
#         form = addform.creatlist(request.POST)
#         user = request.user.id
#         if form.is_valid():
#             title = form.cleaned_data["title"]
#             description = form.cleaned_data["description"]
#             amount = form.cleaned_data["amount"]
#             url = request.POST["url"]
#             category = request.POST["category"]

#         #  add default value to null url or category
#         if not url :
#             url ='null'
#         if category == 'null':
#             category='No Category Listed'
#         # sav data in database
#         try:
#             list = Listing.objects.create(title=title,description=description,amount=amount,url=url,category=category,user_id=user,endAmont=amount)
#             list.save()
#             # return render(request, 'auctions/add.html', {'form': form})
#             return render(request, "auctions/creatList.html",{"meesage":"Creat Sucess" ,'form': form})
#         # error massege
#         except :
#                return render(request, "auctions/creatList.html",{"error":"failed to create this listing",'form': form})
#     else:
#          form = addform.creatlist()
#          return render(request, "auctions/creatList.html",{'form': form})

@login_required(login_url='/login')
def usersProfile(request):
    if request.method == "POST":
        
        return render(request, "summary/profile.html")

    else:
        return render(request, "summary/profile.html")
