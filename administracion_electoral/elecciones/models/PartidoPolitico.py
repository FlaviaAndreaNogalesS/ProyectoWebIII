from django.db import models


class PartidoPolitico(models.Model):
    nombre = models.CharField(max_length=100)
    sigla = models.CharField(max_length=10)
    color = models.CharField(max_length=10)
