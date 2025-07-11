from django.test import TestCase

# Create your tests here.
# users/tests.py

from django.urls import reverse
from rest_framework.test import APITestCase
from django.contrib.auth import get_user_model
import jwt
from django.conf import settings

User = get_user_model()

class AuthAndTokenTests(APITestCase):
    def setUp(self):
        # Creamos un superadmin para los tests de token
        self.superadmin = User.objects.create_user(
            username='admin',
            email='admin@example.com',
            password='pass1234',
            role=User.ROLE_SUPERADMIN
        )

    def test_user_registration(self):
        """
        Verifica que el endpoint /register/ crea un usuario correctamente.
        """
        url = reverse('register-list')  # router basename='register'
        data = {
            'username': 'juan',
            'email': 'juan@example.com',
            'password': 'secreto123'
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, 201)
        self.assertTrue(User.objects.filter(username='juan').exists())

    def test_token_includes_role_claim(self):
        """
        Verifica que el JWT devuelto por /token/ incluye el claim 'role'.
        """
        url = reverse('token_obtain_pair')
        response = self.client.post(url, {
            'username': 'admin',
            'password': 'pass1234'
        }, format='json')
        self.assertEqual(response.status_code, 200)
        self.assertIn('access', response.data)
        access = response.data['access']

        # Decodificamos el JWT con la clave secreta de Django
        payload = jwt.decode(access, settings.SECRET_KEY, algorithms=['HS256'])
        # El claim 'role' debe coincidir con el rol del superadmin
        self.assertEqual(payload.get('role'), User.ROLE_SUPERADMIN)

