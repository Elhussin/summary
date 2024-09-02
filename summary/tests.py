from django.test import TestCase
from .models import User, Course, Summary, Coments, Like, Fovarite, SummaryComents, SummaryLike, SummaryFovarite


class UserModelTest(TestCase):

    def setUp(self):
        self.user = User.objects.create_user(
            email="testuser@example.com",
            username="testuser",
            first_name="Test",
            last_name="User",
            password="password123"
        )

    def test_user_creation(self):
        self.assertEqual(self.user.email, "testuser@example.com")
        self.assertTrue(self.user.check_password("password123"))
        self.assertEqual(str(self.user), self.user.email)


class CourseModelTest(TestCase):

    def setUp(self):
        self.user = User.objects.create_user(
            email="testuser@example.com",
            username="testuser",
            password="password123"
        )
        self.course = Course.objects.create(
            user=self.user,
            title="Django Basics",
            description="Introduction to Django framework."
        )

    def test_course_creation(self):
        self.assertEqual(self.course.title, "Django Basics")
        self.assertEqual(self.course.user, self.user)
        self.assertEqual(str(self.course), self.course.title)


class SummaryModelTest(TestCase):

    def setUp(self):
        self.user = User.objects.create_user(
            email="testuser@example.com",
            username="testuser",
            password="password123"
        )
        self.course = Course.objects.create(
            user=self.user,
            title="Django Basics",
            description="Introduction to Django framework."
        )
        self.summary = Summary.objects.create(
            user=self.user,
            course=self.course,
            title="Summary Title",
            description="This is a summary of the course."
        )

    def test_summary_creation(self):
        self.assertEqual(self.summary.title, "Summary Title")
        self.assertEqual(self.summary.course, self.course)
        self.assertEqual(str(self.summary), self.summary.title)


class ComentsModelTest(TestCase):

    def setUp(self):
        self.user = User.objects.create_user(
            email="testuser@example.com",
            username="testuser",
            password="password123"
        )
        self.course = Course.objects.create(
            user=self.user,
            title="Django Basics"
        )
        self.comment = Coments.objects.create(
            user=self.user,
            course=self.course,
            comment="This is a comment."
        )

    def test_comment_creation(self):
        self.assertEqual(self.comment.comment, "This is a comment.")
        self.assertEqual(self.comment.course, self.course)
        self.assertEqual(str(self.comment), f"Comment by {self.user} on {self.course}")


class LikeModelTest(TestCase):

    def setUp(self):
        self.user = User.objects.create_user(
            email="testuser@example.com",
            username="testuser",
            password="password123"
        )
        self.course = Course.objects.create(
            user=self.user,
            title="Django Basics"
        )
        self.like = Like.objects.create(
            user=self.user,
            course=self.course,
            likes=True
        )

    def test_like_creation(self):
        self.assertTrue(self.like.likes)
        self.assertEqual(self.like.course, self.course)
        self.assertEqual(str(self.like), f"Like by {self.user} on {self.course}")


class FovariteModelTest(TestCase):

    def setUp(self):
        self.user = User.objects.create_user(
            email="testuser@example.com",
            username="testuser",
            password="password123"
        )
        self.course = Course.objects.create(
            user=self.user,
            title="Django Basics"
        )
        self.favorite = Fovarite.objects.create(
            user=self.user,
            course=self.course,
            followStatus=True
        )

    def test_favorite_creation(self):
        self.assertTrue(self.favorite.followStatus)
        self.assertEqual(self.favorite.course, self.course)
        self.assertEqual(str(self.favorite), f"Favorite by {self.user} on {self.course}")
