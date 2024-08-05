from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    # Add any custom fields here
    pass

class Course(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='courseUser')
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    # timestamp=m

    def __str__(self):
        return self.name

# one corse summary
class Summary(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='summariesUser')
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name='summariesCourse')
    title = models.CharField(max_length=255)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title
    
    
class Coments(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='commentUser')
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name='commentCourse')
    comment = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)


class Like(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='likeUser')
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name='likeCourse')
    likes = models.BooleanField(default=True)
    unlikes = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    

class Fovarite(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='fovariteUser')
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name='fovariteCourse')
    followStatus= models.BooleanField(default=True)
    timestamp = models.DateTimeField(auto_now_add=True)
    


  
class SummaryComents(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='SummaryComentsUser')
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name='SummaryComentsCourse')
    summary = models.ForeignKey(Summary, on_delete=models.CASCADE, related_name='SummaryComentsSummary')
    comment = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    

class SummaryLike(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='SummarylikeUser')
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name='SummarylikeCourse')
    summary = models.ForeignKey(Summary, on_delete=models.CASCADE, related_name='SummarylikeSummary')
    likes = models.BooleanField(default=True)
    unlikes = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    

class SummaryFovarite(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='SummaryfovariteUser')
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name='SummaryfovariteCourse')
    summary = models.ForeignKey(Summary, on_delete=models.CASCADE, related_name='SummaryfovariteSummary')
    followStatus= models.BooleanField(default=True)
    timestamp = models.DateTimeField(auto_now_add=True)
    