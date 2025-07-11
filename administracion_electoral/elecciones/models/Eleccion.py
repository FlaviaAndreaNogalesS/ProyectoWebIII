from django.db import models

from elecciones.models.Seccion import Seccion
from elecciones.models.TipoEleccion import TipoEleccion


class Eleccion(models.Model):

    tipo = models.ForeignKey(TipoEleccion, on_delete=models.PROTECT)
    fecha = models.DateField()
    ###falta la seccion donde afecta la votacio , mapa  para poder dibujar
    secciones = models.ManyToManyField(Seccion)

    def __str__(self):
        return f"{self.tipo.capitalize()} - {self.fecha}"
