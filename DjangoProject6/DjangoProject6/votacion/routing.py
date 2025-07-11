# DjangoProject6/routing.py

from django.urls import re_path
from votacion.consumers import VotacionConsumer

websocket_urlpatterns = [
    re_path(r'ws/resultados/$', VotacionConsumer.as_asgi()),
]
