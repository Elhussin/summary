from django.contrib.auth.models import (
    AbstractBaseUser,
    BaseUserManager,
    PermissionsMixin,
)
from django.db import models


class UserManager(BaseUserManager):
    """"
    Custom user model manager 
    """
    # Create a user
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError("The Email field must be set")
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    # Create a superuser
    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)
        extra_fields.setdefault("is_active", True)

        if extra_fields.get("is_staff") is not True:
            raise ValueError("Superuser must have is_staff=True.")
        if extra_fields.get("is_superuser") is not True:
            raise ValueError("Superuser must have is_superuser=True.")

        return self.create_user(email, password, **extra_fields)


class User(AbstractBaseUser, PermissionsMixin):
    """
    Custom user model
    """
    
    email = models.EmailField(unique=True)
    username = models.CharField(max_length=150, unique=True, blank=False)
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    date_joined= models.DateTimeField(auto_now_add=True)

    objects = UserManager()

    USERNAME_FIELD = "username"
    REQUIRED_FIELDS = ["first_name", "last_name", "email"]

    def __str__(self):
        return self.email


class Course(models.Model):
    """Model for the Course"""
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="courses")
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    # image = models.ImageField(
    #     upload_to="course_images/", blank=True, null=True)
    # updated_at = models.DateTimeField(auto_now=True)
    image = models.URLField(
        max_length=500, blank=True, null=True, help_text="Enter the URL of the image")
    updated_at = models.DateTimeField(auto_now=True)
    def __str__(self):
        return self.title


class Summary(models.Model):
    """Model for the Summary"""
    
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="summaries")
    course = models.ForeignKey(
        Course, on_delete=models.CASCADE, related_name="summaries"
    )
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title


class Coments(models.Model):
    """Model for the Coments"""
    
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="comments")
    course = models.ForeignKey(
        Course, on_delete=models.CASCADE, related_name="comments"
    )
    comment = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Comment by {self.user} on {self.course}"


class Like(models.Model):
    """"Model for the Like"""
    
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="likes")
    course = models.ForeignKey(
        Course, on_delete=models.CASCADE, related_name="likes")
    likes = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Like by {self.user} on {self.course}"


class Fovarite(models.Model):
    """"Model for the Fovarite"""
    
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="favorites")
    course = models.ForeignKey(
        Course, on_delete=models.CASCADE, related_name="favorites"
    )
    followStatus = models.BooleanField(default=True)
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Favorite by {self.user} on {self.course}"


class SummaryComents(models.Model):
    """Model for the SummaryComents"""
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="summary_comments"
    )
    course = models.ForeignKey(
        Course, on_delete=models.CASCADE, related_name="summary_comments"
    )
    summary = models.ForeignKey(
        Summary, on_delete=models.CASCADE, related_name="comments"
    )
    comment = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Comment by {self.user} on {self.summary}"


class SummaryLike(models.Model):
    """Model for the SummaryLike"""
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="summary_likes"
    )
    course = models.ForeignKey(
        Course, on_delete=models.CASCADE, related_name="summary_likes"
    )
    summary = models.ForeignKey(
        Summary, on_delete=models.CASCADE, related_name="likes")
    likes = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Like by {self.user} on {self.summary}"


class SummaryFovarite(models.Model):
    """Model for the SummaryFovarite"""
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="summary_favorites"
    )
    course = models.ForeignKey(
        Course, on_delete=models.CASCADE, related_name="summary_favorites"
    )
    summary = models.ForeignKey(
        Summary, on_delete=models.CASCADE, related_name="favorites"
    )
    followStatus = models.BooleanField(default=True)
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Favorite by {self.user} on {self.summary}"


class RateCourse(models.Model):
    """Model for the RateCourse"""
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="rate_course")
    course = models.ForeignKey(
        Course, on_delete=models.CASCADE, related_name="rate_course"
    )
    rate = models.IntegerField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Rate by {self.user} on {self.course}"
