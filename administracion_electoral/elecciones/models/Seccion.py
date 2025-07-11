from django.db import models


class Seccion(models.Model):
    nombre = models.CharField(max_length=100)
    geometria = models.JSONField(null=True, blank=True)  # Si dibujas en mapa
