from django.contrib.auth.models import AbstractUser
from django.db import models

class Usuario(AbstractUser):
    ROLES = (
        ('superadmin', 'Super Administrador'),
        ('padron', 'Administrador de Padrón'),
        ('eleccion', 'Administrador de Elecciones'),
        ('jurado', 'Jurado Electoral'),
    )
    rol = models.CharField(max_length=20, choices=ROLES)

    def __str__(self):
        return f"{self.username} - {self.rol}"
