from django.shortcuts import render, redirect, HttpResponseRedirect
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from django.urls import reverse
from django.views.decorators.csrf import csrf_exempt
from django.contrib import messages
from django.contrib.auth import get_user_model
from django.db import IntegrityError
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from rest_framework.exceptions import ValidationError
from rest_framework.permissions import IsAuthenticated, BasePermission
from .models import Summary, Course, Like, Coments, Fovarite
from .serializers import (
    SummarySerializer, CourseSerializer, LikeSerializer,
    ComentsSerializer, FovariteSerializer, SummaryFovariteSerializer,
    SummaryLikeSerializer, SummaryComentsSerializer,UserSerializer
)
from summary.forms import UserRegistraForm


# Create your views here.
User = get_user_model()

# إنشاء إذن مخصص يسمح بعمليات GET بدون توثيق
class AllowGetWithoutAuthentication(BasePermission):
    """
    السماح بعمليات GET بدون توثيق وطلب التوثيق للعمليات الأخرى.
    """
    def has_permission(self, request, view):
        # السماح بعمليات GET بدون توثيق
        if request.method == 'GET':
            return True
        # طلب التوثيق للعمليات الأخرى
        return request.user and request.user.is_authenticated




def index(request):
    return render(request, "summary/index.html")

class SummaryViewSet(viewsets.ModelViewSet):
    queryset = Summary.objects.all().order_by("course")
    serializer_class = SummarySerializer

class CourseViewSet(viewsets.ModelViewSet):
    queryset = Course.objects.all().order_by('created_at')
    serializer_class = CourseSerializer
    # config permission
    permission_classes = [AllowGetWithoutAuthentication]  
    def perform_create(self, serializer):
        try:
            # حفظ الدورة وضبط المستخدم من التوكن
            serializer.save(user=self.request.user)
        except IntegrityError as e:
            # معالجة خطأ سلامة البيانات
            raise ValidationError({"error": "Error saving course. Please ensure data integrity."})
        except ValidationError as e:
            # معالجة الأخطاء المتعلقة بالتحقق من البيانات
            raise ValidationError({"error": e.detail})
        except Exception as e:
            # معالجة الأخطاء العامة وإظهار رسالة الخطأ
            raise ValidationError({"error": str(e)})


class LikeViewSet(viewsets.ModelViewSet):
    queryset = Like.objects.all().order_by('created_at')
    serializer_class = LikeSerializer
    permission_classes = [AllowGetWithoutAuthentication]  
    
    def perform_create(self, serializer):
        try:
            serializer.save(user=self.request.user)
        except IntegrityError:
            return Response({"error": "Error saving like."}, status=status.HTTP_400_BAD_REQUEST)


class ComentsViewSet(viewsets.ModelViewSet):
    queryset = Coments.objects.all().order_by('created_at')
    serializer_class = ComentsSerializer
    permission_classes = [AllowGetWithoutAuthentication]  
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


@api_view(['GET'])
@permission_classes([IsAuthenticated])  # التأكد من أن المستخدم مسجل الدخول
def user_profile_view(request):
    user = request.user
    serializer = UserSerializer(user)
    return Response(serializer.data)






def login_view(request):
    return render(request, 'summary/auth/login.html') 

def logout_view(request):
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


def usersProfile(request):
    return render(request, "summary/profile.html")

def favorite(request):
    return render(request, "summary/favorite.html")

def pageNotFound(request, exception):
    return redirect('index')
