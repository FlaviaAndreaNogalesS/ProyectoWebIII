import uuid
from django.db import models

class Voto(models.Model):
    ESTADOS_VOTO = [
        ('valido', 'Válido'),
        ('nulo', 'Nulo'),
    ]

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    votante_id = models.UUIDField()
    mesa_id = models.IntegerField()
    candidato_id = models.IntegerField(null=True, blank=True)  # Puede ser nulo si el voto es nulo
    estado = models.CharField(max_length=10, choices=ESTADOS_VOTO, default='valido')
    emitido_en = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('votante_id',)

    def __str__(self):
        return f"Voto {self.estado} en mesa {self.mesa_id}"
