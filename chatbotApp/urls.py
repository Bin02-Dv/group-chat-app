from django.urls import path
from .views import chat, add_message

urlpatterns = [
    path('chat/', chat, name='chat'),
    path('add_message/', add_message, name='add_message'),
]