from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import  Course , Summary, Coments, Like, Fovarite ,User ,SummaryComents, SummaryLike, SummaryFovarite,UserManager

# admin.site.register(User, UserAdmin)
admin.site.register(User)

# class UserAdmin(admin.ModelAdmin):
#     list_display = ("__str__", "name")

class CourseAdmin(admin.ModelAdmin):
    list_display = ("__str__", "title")

class SummaryAdmin(admin.ModelAdmin):
    list_display = ("__str__", "description")

# class UserAdmin(admin.ModelAdmin):
#     list_display = ("__str__", "email")

class ComentsAdmin(admin.ModelAdmin):
    list_display = ("__str__", "comment")
    
class LikeAdmin(admin.ModelAdmin):
    list_display = ("__str__", "likes")
    
class FovariteAdmin(admin.ModelAdmin):
    list_display = ("__str__", "followStatus")

class SummaryComentsAdmin(admin.ModelAdmin):
    list_display = ("__str__", "comment")

class SummaryLikeAdmin(admin.ModelAdmin):
    list_display = ("__str__", "likes")

class SummaryFovariteAdmin(admin.ModelAdmin):
    list_display = ("__str__", "followStatus")

admin.site.register(SummaryComents,SummaryComentsAdmin)
admin.site.register(SummaryLike,SummaryLikeAdmin)
admin.site.register(SummaryFovarite,SummaryFovariteAdmin)
admin.site.register(Course,CourseAdmin)
admin.site.register(Summary,SummaryAdmin)
admin.site.register(Coments,ComentsAdmin)
admin.site.register(Like,LikeAdmin)
admin.site.register(Fovarite,FovariteAdmin)
