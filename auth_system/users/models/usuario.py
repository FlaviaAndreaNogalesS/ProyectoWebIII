import uuid

from django.contrib.auth.models import AbstractUser, Group, Permission
from django.db import models

class User(AbstractUser):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)  # 👈 este es el cambio

    ROLE_SUPERADMIN       = 'superadmin'
    ROLE_ADMIN_PADRON     = 'admin_padron'
    ROLE_JURADO           = 'jurado'
    ROLE_ADMIN_ELECCIONES = 'admin_elecciones'

    ROLE_CHOICES = [
        (ROLE_SUPERADMIN,        'Super Administrador'),
        (ROLE_ADMIN_PADRON,      'Administrador Padrón'),
        (ROLE_JURADO,            'Jurado Electoral'),
        (ROLE_ADMIN_ELECCIONES,  'Administrador Elecciones'),
    ]

    role = models.CharField(
        max_length=20,
        choices=ROLE_CHOICES,
        default=ROLE_JURADO,
    )

    # Evitamos choques con auth.User.groups y user_permissions
    groups = models.ManyToManyField(
        Group, related_name='+', blank=True
    )
    user_permissions = models.ManyToManyField(
        Permission, related_name='+', blank=True
    )
