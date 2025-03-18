from flask import Flask, render_template, request
from calculator import online_rating
from flask_cors import CORS

from getfile import modify, get_file
from login import login_api

app = Flask(__name__)
CORS(app)

@app.route('/')
def hello_world():
    return render_template('index.html')

@app.route('/sheet')
def sheet():
    return modify(get_file())

@app.route('/rating')
def rating():
    return online_rating()


@app.route('/b30')
def b30():
    return render_template('b30.html')

@app.route('/login',methods=['POST'])
def login():
    user = request.form.get('user')
    password = request.form.get('password')
    print(user,password)
    try :
        sid=login_api(user,password)
    except Exception as e:
        return '账号或密码密码错误',404
    return sid

if __name__ == '__main__':
    app.run()