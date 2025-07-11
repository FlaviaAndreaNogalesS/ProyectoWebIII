from django.urls import path, include
from django.contrib import admin
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/users/', include('users.urls')),
path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
