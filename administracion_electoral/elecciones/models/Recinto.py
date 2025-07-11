
from django.db import models

class Recinto(models.Model):
    nombre = models.CharField(max_length=100)
    ubicacion = models.CharField(max_length=200)
    lat = models.FloatField()
    lng = models.FloatField()
