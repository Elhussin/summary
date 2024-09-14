from django.contrib import admin
from .models import (
    Course,
    Summary,
    Coments,
    Like,
    Fovarite,
    User,
    SummaryComents,
    SummaryLike,
    SummaryFovarite,
    RateCourse,
)


# Create Admin Models for the Summary App

class CourseAdmin(admin.ModelAdmin):
    list_display = ("__str__", "title")


class SummaryAdmin(admin.ModelAdmin):
    list_display = ("__str__", "description")


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


class RateCourseAdmin(admin.ModelAdmin):
    list_display = ("__str__", "rate")


# Admin Models Registration
admin.site.register(User)
admin.site.register(SummaryComents, SummaryComentsAdmin)
admin.site.register(SummaryLike, SummaryLikeAdmin)
admin.site.register(SummaryFovarite, SummaryFovariteAdmin)
admin.site.register(Course, CourseAdmin)
admin.site.register(Summary, SummaryAdmin)
admin.site.register(Coments, ComentsAdmin)
admin.site.register(Like, LikeAdmin)
admin.site.register(Fovarite, FovariteAdmin)
admin.site.register(RateCourse, RateCourseAdmin)
