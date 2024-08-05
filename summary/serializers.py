from rest_framework import serializers
from .models import Course, Summary, Coments, Like, Fovarite, SummaryComents, SummaryLike, SummaryFovarite
from django.contrib.auth.models import User

class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = '__all__'

class SummarySerializer(serializers.ModelSerializer):
    class Meta:
        model = Summary
        fields = '__all__'
        
class FovariteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Fovarite
        fields = '__all__'
        

class ComentsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Coments
        fields = '__all__'
        

class LikeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Like
        fields = '__all__'
        
class SummaryComentsSerializer(serializers.ModelSerializer):
    class Meta:
        model = SummaryComents
        fields = '__all__'
        
class SummaryLikeSerializer(serializers.ModelSerializer):
    class Meta:
        model = SummaryLike
        fields = '__all__'

class SummaryFovariteSerializer(serializers.ModelSerializer):
    class Meta:
        model = SummaryFovarite
        fields = '__all__'
    
