from rest_framework import serializers
from .models import (
    User, Course, Summary, Coments, Like, Fovarite,
    SummaryComents,SummaryLike,SummaryFovarite,RateCourse
)



class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'email', 'username', 'first_name', 'last_name' , 'is_active', 'is_staff', 'is_superuser']


class ComentsSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    class Meta:
        model = Coments
        fields = ['id', 'user', 'course', 'comment', 'created_at']


class LikeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Like
        fields = '__all__'


class FovariteSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    class Meta:
        model = Fovarite
        fields = ['id', 'user', 'course', 'followStatus', 'timestamp']

class SummaryComentsSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    class Meta:
        model = SummaryComents
        fields = '__all__'


class SummaryLikeSerializer(serializers.ModelSerializer):
    class Meta:
        model = SummaryLike  # Ensure the correct model is used
        fields = '__all__'        

class SummaryFovariteSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    class Meta:
        model = SummaryFovarite
        fields = ['id', 'user','summary', 'course', 'followStatus', 'timestamp']

class RateCourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = RateCourse
        fields = ['id', 'user', 'course', 'rate', 'created_at']
    

    

class SummarySerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    comments = serializers.SerializerMethodField() # list of comments on the course
    likes = serializers.SerializerMethodField()     # list of likes on the course
    favorites = serializers.SerializerMethodField() # list of favorites on the course

    class Meta:
        model = Summary
        fields = [
           'id', 'title', 'description', 'created_at', 'updated_at',
            'user', 'course', 'comments', 'likes', 'favorites',
        ]

    def get_comments(self, obj):
        comments = SummaryComents.objects.filter(summary_id=obj).select_related('user')
        return SummaryComentsSerializer(comments, many=True).data

    def get_likes(self, obj):
        likes = SummaryLike.objects.filter(summary_id=obj).select_related('user')
        return SummaryLikeSerializer(likes, many=True).data

    def get_favorites(self, obj):
        favorites = SummaryFovarite.objects.filter(summary_id=obj).select_related('user')
        return SummaryFovariteSerializer(favorites, many=True).data



class CourseSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    comments = serializers.SerializerMethodField()  # قائمة بالتعليقات على الكورس
    likes = serializers.SerializerMethodField()     # قائمة بالإعجابات على الكورس
    favorites = serializers.SerializerMethodField() # قائمة بالمفضلات على الكورس
    summary = serializers.SerializerMethodField()   # قائمة بالملخصات المرتبطة بالكورس
    rate = serializers.SerializerMethodField()      # قائمة بتقييمات الكورس
    class Meta:
        model = Course
        fields = ['id', 'title', 'description', 'created_at', 'image', 'updated_at', 'user', 'comments', 'likes', 'favorites', 'summary', 'rate']

    def get_comments(self, obj):
        comments = Coments.objects.filter(course=obj).select_related('user')
        return ComentsSerializer(comments, many=True).data

    def get_likes(self, obj):
        likes = Like.objects.filter(course=obj).select_related('user')
        return LikeSerializer(likes, many=True).data

    def get_favorites(self, obj):
        favorites = Fovarite.objects.filter(course=obj).select_related('user')
        return FovariteSerializer(favorites, many=True).data

    def get_summary(self, obj):
        summary = Summary.objects.filter(course=obj).select_related('user')
        return SummarySerializer(summary, many=True).data
    
    def get_rate(self, obj):
        rate = RateCourse.objects.filter(course=obj).select_related('user')
        return RateCourseSerializer(rate, many=True).data
