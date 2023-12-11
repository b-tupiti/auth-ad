from django.shortcuts import render
from django.templatetags.static import static

def login(request):
    background_image_url = static('adauth/img/bg.jpg')
    return render(request, 'adauth/login.html', {'background_image_url': background_image_url})
