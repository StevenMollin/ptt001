import json

import requests


def login_api(username:str,password:str):
    headers = {
        'accept': 'application/json, text/plain, */*',
        'content-type': 'application/json;charset=UTF-8',
        'origin': 'https://arcaea.lowiro.com',
        'referer': 'https://arcaea.lowiro.com/',
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36',
    }
    json_data = {
        'email': username,
        'password': password,
    }
    response = requests.post('https://webapi.lowiro.com/auth/login',  headers=headers, json=json_data)
    if json.loads(response.text)['isLoggedIn']:
        return response.cookies.get('sid')
    else:
        return None