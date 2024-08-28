# from rest_framework import serializers
# from django.contrib.auth.models import User

# class UserSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = User
#         fields = ['id', 'email', 'username', 'first_name', 'last_name']

# class CourseSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Course
#         fields = '__all__'

from rest_framework import serializers
from .models import User, Course, Summary, Coments, Like, Fovarite, SummaryComents, SummaryLike, SummaryFovarite

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'email', 'username', 'first_name', 'last_name']



class ComentsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Coments
        fields = '__all__'
        # fields = ['id', 'user', 'course', 'comment', 'created_at']

class LikeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Like
        fields = '__all__'
        # fields = ['id', 'user', 'course', 'likes', 'unlikes', 'created_at']

    
class FovariteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Fovarite
        fields = '__all__'
        # fields = ['id', 'user', 'course', 'followStatus', 'timestamp']

class SummaryComentsSerializer(serializers.ModelSerializer):
    class Meta:
        model = SummaryComents
        fields = '__all__'
        # fields = ['id', 'user', 'course', 'summary', 'comment', 'created_at']

class SummaryLikeSerializer(serializers.ModelSerializer):
    class Meta:
        model = SummaryLike
        fields = '__all__'
        # fields = ['id', 'user', 'course', 'summary', 'likes', 'unlikes','created_at']

class SummaryFovariteSerializer(serializers.ModelSerializer):
    class Meta:
        model = SummaryFovarite
        fields = '__all__'
        # fields = ['id', 'user', 'course', 'summary', 'followStatus', 'timestamp']   




class SummarySerializer(serializers.ModelSerializer):
    summary_comments = SummaryComentsSerializer(many=True, read_only=True, source='SummaryComentsSummary')
    summary_likes = SummaryLikeSerializer(many=True, read_only=True, source='SummarylikeSummary')
    summary_favorites = SummaryFovariteSerializer(many=True, read_only=True, source='SummaryfovariteSummary')
#  SummaryComents, SummaryLike, SummaryFovarite
    class Meta:
        model = Summary
        fields = [
            'id', 'title', 'content', 'created_at', 'updated_at',
            'user', 'course', 'summary_comments', 'summary_likes', 'summary_favorites'
        ]



class CourseSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    comments = serializers.SerializerMethodField()
    likes = serializers.SerializerMethodField()
    favorites = serializers.SerializerMethodField()
    summary = serializers.SerializerMethodField()

    class Meta:
        #MAin moduel for course 
        model = Course  
        fields = ['id', 'name', 'description', 'created_at', 'image', 'updated_at', 'user', 'comments', 'likes', 'favorites','summary']

    def get_comments(self, obj):
        comments = Coments.objects.filter(course=obj)
        return ComentsSerializer(comments, many=True).data

    def get_likes(self, obj):
        likes = Like.objects.filter(course=obj)
        return LikeSerializer(likes, many=True).data

    def get_favorites(self, obj):
        favorites = Fovarite.objects.filter(course=obj)
        return FovariteSerializer(favorites, many=True).data
    
    def get_summary(self, obj):
        summary = Summary.objects.filter(course=obj)
        return SummarySerializer(summary, many=True).data

