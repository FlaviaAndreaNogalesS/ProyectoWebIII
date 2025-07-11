from django.db import models
from elecciones.models.Mesa import Mesa

class VotanteMesa(models.Model):
    votante_uuid = models.UUIDField()  # viene del microservicio de padrón
    nombre_completo = models.CharField(max_length=255)  # copiado solo como referencia
    mesa = models.ForeignKey(Mesa, on_delete=models.CASCADE, related_name='votantes')
    orden = models.IntegerField()  # su posición dentro de la mesa por orden alfabético

    class Meta:
        unique_together = ('votante_uuid', 'mesa')
