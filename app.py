from flask import Flask, render_template
from calculator import online_sheet, online_rating
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/')
def hello_world():
    return render_template('index.html')

@app.route('/sheet')
def sheet():
    return online_sheet()

@app.route('/rating')
def rating():
    return online_rating()


if __name__ == '__main__':
    app.run()