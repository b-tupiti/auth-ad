import json
from django.http import JsonResponse
from django.shortcuts import render
from django.templatetags.static import static
from ldap3 import NTLM, Server, Connection, ALL

def login(request):
    background_image_url = static('adauth/img/bg.jpg')
    if request.method == 'POST':
        
        host = 'sinu.edu.sb'
        domain = 'sinu\\'
        
        data = json.loads(request.body.decode('utf-8'))

        username = data.get('username')
        password = data.get('password')
    
        server = Server(host,  get_info=ALL)
        conn = Connection(server, user=f'{domain}{username}', password=password, authentication=NTLM)
        authenticated = conn.bind()
        print(conn.extend.standard.who_am_i())
        if authenticated:
            return JsonResponse({'status': 200, 'user': conn.extend.standard.who_am_i()})
        else:
            return JsonResponse({'status': 403})
    
    return render(request, 'adauth/login.html', {'background_image_url': background_image_url})
