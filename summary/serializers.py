from rest_framework import serializers
from .models import (
    User, Course, Summary, Coments, Like, Fovarite,
    SummaryComents, SummaryLike, SummaryFovarite, RateCourse
)


class UserSerializer(serializers.ModelSerializer):
    """
    Serializer for the User model
    """
    class Meta:
        model = User
        fields = ['id', 'email', 'username', 'first_name',
                'last_name', 'is_active', 'is_staff', 'is_superuser','date_joined']


class ComentsSerializer(serializers.ModelSerializer):
    """"
    Serializer for the Coments model
    """
    
    user = UserSerializer(read_only=True)
    class Meta:
        model = Coments
        fields = ['id', 'user', 'course', 'comment', 'created_at']


class LikeSerializer(serializers.ModelSerializer):
    """"
    Serializer for the Like model
    """
    
    class Meta:
        model = Like
        fields = '__all__'



class FovariteSerializer(serializers.ModelSerializer):
    """"
    Serializer for the Fovarite model
    """
    
    user = UserSerializer(read_only=True)

    class Meta:
        model = Fovarite
        fields = ['id', 'user', 'course', 'followStatus', 'timestamp']


class SummaryComentsSerializer(serializers.ModelSerializer):
    """"
    Serializer for the SummaryComents model
    """ 
    user = UserSerializer(read_only=True)

    class Meta:
        model = SummaryComents
        fields = '__all__'


class SummaryLikeSerializer(serializers.ModelSerializer):
    """"
    Serializer for the SummaryLike model
    """
    
    class Meta:
        model = SummaryLike  
        fields = '__all__'


class SummaryFovariteSerializer(serializers.ModelSerializer):
    """"
    Serializer for the SummaryFovarite model
    """
    
    user = UserSerializer(read_only=True)

    class Meta:
        model = SummaryFovarite
        fields = ['id', 'user', 'summary',
                'course', 'followStatus', 'timestamp']


class RateCourseSerializer(serializers.ModelSerializer):
    """
    Serializer for the RateCourse model
    """
    class Meta:
        model = RateCourse
        fields = ['id', 'user', 'course', 'rate', 'created_at']


class SummarySerializer(serializers.ModelSerializer):
    """"
    Serializer for the Summary model
    """
    
    user = UserSerializer(read_only=True)
    comments = serializers.SerializerMethodField()  # list of comments on the course
    likes = serializers.SerializerMethodField()     # list of likes on the course
    favorites = serializers.SerializerMethodField()  # list of favorites on the course

    class Meta:
        model = Summary
        fields = [
            'id', 'title', 'description', 'created_at', 'updated_at',
            'user', 'course', 'comments', 'likes', 'favorites',
        ]
        
    # get the comments on the summary
    def get_comments(self, obj):
        comments = SummaryComents.objects.filter(
            summary_id=obj).select_related('user')
        return SummaryComentsSerializer(comments, many=True).data
    
    # get the likes on the summary
    def get_likes(self, obj):
        likes = SummaryLike.objects.filter(
            summary_id=obj).select_related('user')
        return SummaryLikeSerializer(likes, many=True).data
    
    # get the favorites on the summary
    def get_favorites(self, obj):
        favorites = SummaryFovarite.objects.filter(
            summary_id=obj).select_related('user')
        return SummaryFovariteSerializer(favorites, many=True).data


class CourseSerializer(serializers.ModelSerializer):
    """"
    Serializer for the Course model
    """

    user = UserSerializer(read_only=True)
    comments = serializers.SerializerMethodField()  # list of comments on the course
    likes = serializers.SerializerMethodField()     # list of likes on the course
    favorites = serializers.SerializerMethodField() # list of favorites on the course
    summary = serializers.SerializerMethodField()   # list of summaries on the course
    rate = serializers.SerializerMethodField()      # list of rates on the course
    
    class Meta:
        model = Course
        fields = ['id', 'title', 'description', 'created_at', 'image',
                'updated_at', 'user', 'comments', 'likes', 'favorites', 'summary', 'rate']
        
    # get the comments on the course
    def get_comments(self, obj):
        comments = Coments.objects.filter(course=obj).select_related('user')
        return ComentsSerializer(comments, many=True).data
    
    # get the likes on the course
    def get_likes(self, obj):
        likes = Like.objects.filter(course=obj).select_related('user')
        return LikeSerializer(likes, many=True).data
    
    # get the favorites on the course
    def get_favorites(self, obj):
        favorites = Fovarite.objects.filter(course=obj).select_related('user')
        return FovariteSerializer(favorites, many=True).data
    
    # get the summaries on the course
    def get_summary(self, obj):
        summary = Summary.objects.filter(course=obj).select_related('user')
        return SummarySerializer(summary, many=True).data
    
    # get the rates on the course
    def get_rate(self, obj):
        rate = RateCourse.objects.filter(course=obj).select_related('user')
        return RateCourseSerializer(rate, many=True).data
