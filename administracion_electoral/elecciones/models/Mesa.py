from django.db import models

from elecciones.models.Recinto import Recinto


class Mesa(models.Model):
    numero = models.IntegerField()
    recinto = models.ForeignKey(Recinto, on_delete=models.CASCADE, related_name='mesas')
