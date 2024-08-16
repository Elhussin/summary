# from rest_framework import serializers
# from .models import Course, Summary, Coments, Like, Fovarite, SummaryComents, SummaryLike, SummaryFovarite
# from django.contrib.auth.models import User

# class UserSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = User
#         fields = ['id', 'email', 'username', 'first_name', 'last_name']


# class CourseSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Course
#         fields = '__all__'

# # class SummarySerializer(serializers.ModelSerializer):
# #     class Meta:
# #         model = Summary
# #         fields = '__all__'
        
# class FovariteSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Fovarite
#         fields = '__all__'
        

# class ComentsSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Coments
#         fields = '__all__'
        

# class LikeSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Like
#         fields = '__all__'
        
# class SummaryComentsSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = SummaryComents
#         fields = '__all__'
        
# class SummaryLikeSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = SummaryLike
#         fields = '__all__'

# class SummaryFovariteSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = SummaryFovarite
#         fields = '__all__'
from rest_framework import serializers
from .models import User, Course, Summary, Coments, Like, Fovarite, SummaryComents, SummaryLike, SummaryFovarite

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'email', 'username', 'first_name', 'last_name']

class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = ['id', 'name', 'description', 'created_at', 'image', 'updated_at','user_id']

class ComentsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Coments
        fields = ['id', 'user', 'course', 'comment', 'created_at']

class LikeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Like
        fields = ['id', 'user', 'course', 'likes', 'unlikes', 'created_at']

class FovariteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Fovarite
        fields = ['id', 'user', 'course', 'followStatus', 'timestamp']

class SummaryComentsSerializer(serializers.ModelSerializer):
    class Meta:
        model = SummaryComents
        fields = ['id', 'user', 'course', 'summary', 'comment', 'created_at']

class SummaryLikeSerializer(serializers.ModelSerializer):
    likes_count = serializers.SerializerMethodField()
    unlikes_count = serializers.SerializerMethodField()
    class Meta:
        model = SummaryLike
        fields = ['id', 'user', 'course', 'summary', 'likes', 'unlikes','likes_count', 'unlikes_count', 'created_at']
    def get_likes_count(self, obj):
        return obj.likes.count()  # get total like for one summary

    def get_unlikes_count(self, obj):
        return obj.unlikes.count()  # get total unlike for one summary

class SummaryFovariteSerializer(serializers.ModelSerializer):
    class Meta:
        model = SummaryFovarite
        fields = ['id', 'user', 'course', 'summary', 'followStatus', 'timestamp']   

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