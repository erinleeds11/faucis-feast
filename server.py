from flask import (Flask, render_template, request, flash, session,
                   redirect)
from model import connect_to_db
import crud
from jinja2 import StrictUndefined

app = Flask(__name__)
app.secret_key = "abc"
app.jinja_env.undefined = StrictUndefined

@app.route('/')
def homepage():

    return render_template("homepage.html")

# @app.route('/', methods = ['POST'])
# def create_user():


@app.route('/login')
def login_page():

    return render_template("login.html")

@app.route('/location-search')
def location_search():
    return render_template('location_search.html')



if __name__ == '__main__':
    connect_to_db(app)
    app.run(host='0.0.0.0', debug=True)