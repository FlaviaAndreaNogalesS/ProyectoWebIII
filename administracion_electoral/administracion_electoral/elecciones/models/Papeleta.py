from django.db import models

from elecciones.models.Seccion import Seccion
from elecciones.models.Candidato import Candidato

class Papeleta(models.Model):
    seccion = models.ForeignKey(Seccion, on_delete=models.CASCADE)
    candidatos = models.ManyToManyField(Candidato)  # Todos los candidatos que se presenten en esa sección
    generada_automaticamente = models.BooleanField(default=True)
