from django.contrib.auth.models import (
    AbstractBaseUser,
    BaseUserManager,
    PermissionsMixin,
)
from django.db import models


class UserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError("The Email field must be set")
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)

        return self.create_user(email, password, **extra_fields)


class User(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(unique=True)
    username = models.TextField(unique=True, blank=False)
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    objects = UserManager()

    USERNAME_FIELD = "username"
    REQUIRED_FIELDS = ["first_name", "last_name"]

    def __str__(self):
        return self.email


class Course(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="courseUser")
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    image = models.ImageField(upload_to='course_images/', blank=True, null=True)
    updated_at = models.DateTimeField(auto_now=True)
    # timestamp=m

    def __str__(self):
        return self.name


# one corse summary
class Summary(models.Model):
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="summariesUser"
    )
    course = models.ForeignKey(
        Course, on_delete=models.CASCADE, related_name="summariesCourse"
    )
    title = models.CharField(max_length=255)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title


class Coments(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="commentUser")
    course = models.ForeignKey(
        Course, on_delete=models.CASCADE, related_name="commentCourse"
    )
    comment = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)


class Like(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="likeUser")
    course = models.ForeignKey(
        Course, on_delete=models.CASCADE, related_name="likeCourse"
    )
    likes = models.BooleanField(default=True)
    unlikes = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)


class Fovarite(models.Model):
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="fovariteUser"
    )
    course = models.ForeignKey(
        Course, on_delete=models.CASCADE, related_name="fovariteCourse"
    )
    followStatus = models.BooleanField(default=True)
    timestamp = models.DateTimeField(auto_now_add=True)


class SummaryComents(models.Model):
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="SummaryComentsUser"
    )
    course = models.ForeignKey(
        Course, on_delete=models.CASCADE, related_name="SummaryComentsCourse"
    )
    summary = models.ForeignKey(
        Summary, on_delete=models.CASCADE, related_name="SummaryComentsSummary"
    )
    comment = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)


class SummaryLike(models.Model):
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="SummarylikeUser"
    )
    course = models.ForeignKey(
        Course, on_delete=models.CASCADE, related_name="SummarylikeCourse"
    )
    summary = models.ForeignKey(
        Summary, on_delete=models.CASCADE, related_name="SummarylikeSummary"
    )
    likes = models.BooleanField(default=True)
    unlikes = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)


class SummaryFovarite(models.Model):
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="SummaryfovariteUser"
    )
    course = models.ForeignKey(
        Course, on_delete=models.CASCADE, related_name="SummaryfovariteCourse"
    )
    summary = models.ForeignKey(
        Summary, on_delete=models.CASCADE, related_name="SummaryfovariteSummary"
    )
    followStatus = models.BooleanField(default=True)
    timestamp = models.DateTimeField(auto_now_add=True)
