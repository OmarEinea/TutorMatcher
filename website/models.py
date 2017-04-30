from django.db import models

# Create your models here.


class User(models.Model):
    name = models.CharField(max_length=25)
    age = models.CharField(max_length=25)
    phone = models.CharField(max_length=25, default='SOME STRING')
    email = models.CharField(max_length=25)

    def __str__(self):
        return self.name


