from django.db import models

import elecciones.models.Mesa


class JuradoElectoral(models.Model):
    nombre = models.CharField(max_length=100)
    ci = models.CharField(max_length=20)
    mesa = models.ForeignKey(Mesa, on_delete=models.CASCADE)
