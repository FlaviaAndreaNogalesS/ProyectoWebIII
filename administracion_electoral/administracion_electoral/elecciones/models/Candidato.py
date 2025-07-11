from django.db import models

from .Cargo import Cargo
from .PartidoPolitico import PartidoPolitico

class Candidato(models.Model):
    nombre = models.CharField(max_length=100)
    cargo = models.ForeignKey(Cargo, on_delete=models.CASCADE)
    partido = models.ForeignKey(PartidoPolitico, on_delete=models.CASCADE)
