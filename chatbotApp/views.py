from django.shortcuts import render
from django.http import JsonResponse
from .models import ChatMessage

def chat(request):
    messages = ChatMessage.objects.all()
    return render(request, 'chatbot_app/chat.html', {'messages': messages})

def add_message(request):
    if request.method == 'POST':
        message_text = request.POST.get('message', '')
        if message_text:
            ChatMessage.objects.create(message=message_text)
            return JsonResponse({'success': True})
    return JsonResponse({'success': False})

