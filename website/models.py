from django.db import models

# Create your models here.


class User(models.Model):
    name = models.CharField(max_length=25)
    age = models.CharField(max_length=25)
    phone = models.CharField(max_length=10)
    email = models.CharField(max_length=25)
    rating = models.SmallIntegerField(blank=True, null=True)
    tutor = models.BooleanField(default=True)
    languages = models.CharField(max_length=25, null=True)

    def __str__(self):
        return self.name


class Course(models.Model):
    name = models.CharField(max_length=60)
    description = models.TextField(blank=True)
    code = models.CharField(max_length=10)
    level = models.SmallIntegerField(blank=True, null=True)

    def __str__(self):
        return self.name


class Session(models.Model):

    start_time = models.DateTimeField(null=True)
    end_time = models.DateTimeField(null=True)
    tutor_name = models.CharField(max_length=25, null=True)

    tutee_name = models.CharField(max_length=25, blank=True, null=True)
    course_name = models.CharField(max_length=25, blank=True, null=True)

    def __str__(self):
        return self.tutor_name + " @ " + str(self.start_time)
