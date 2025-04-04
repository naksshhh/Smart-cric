from django.db import models

class Player(models.Model):
    name = models.CharField(max_length=255)
    age = models.IntegerField()
    team = models.CharField(max_length=255)

    def __str__(self):
        return self.name
# Create your models here.
