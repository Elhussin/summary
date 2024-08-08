from rest_framework import serializers
from .models import Course, Summary, Coments, Like, Fovarite, SummaryComents, SummaryLike, SummaryFovarite
from django.contrib.auth.models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'email', 'username', 'first_name', 'last_name']


class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = '__all__'

# class SummarySerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Summary
#         fields = '__all__'
        
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
    

class SummarySerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    course = CourseSerializer(read_only=True)
    summary_comments = SummaryComentsSerializer(many=True, read_only=True, source='SummaryComentsSummary')
    summary_likes = SummaryLikeSerializer(many=True, read_only=True, source='SummarylikeSummary')
    summary_favorites = SummaryFovariteSerializer(many=True, read_only=True, source='SummaryfovariteSummary')

    class Meta:
        model = Summary
        fields = [
            'id', 'title', 'content', 'created_at', 'updated_at',
            'user', 'course', 'summary_comments', 'summary_likes', 'summary_favorites'
        ]