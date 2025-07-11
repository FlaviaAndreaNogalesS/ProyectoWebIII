from django.db import models

from .Seccion import Seccion

class Cargo(models.Model):
    nombre = models.CharField(max_length=100)
    secciones = models.ManyToManyField(Seccion)

    def __str__(self):
        return self.nombre
