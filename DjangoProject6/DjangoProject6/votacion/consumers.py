# votacion/consumers.py

import json
from channels.generic.websocket import AsyncWebsocketConsumer

class VotacionConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        await self.channel_layer.group_add("resultados_votacion", self.channel_name)
        await self.accept()

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard("resultados_votacion", self.channel_name)

    async def recibir_voto(self, event):
        await self.send(text_data=json.dumps(event["data"]))
