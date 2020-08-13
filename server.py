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

    return render_template('homepage.html')

@app.route('/', methods = ['POST'])
def create_user():

    
prijt
@app.route('/login')
def login_page():
    
    return render_template('login.html')

@app.route('/login', methods = ['POST'])
def handle_login():

    login_email = request.form.get('login_email')
    login_password = request.form.get('login_password')
    # user = crud.get_user_by_email(login_email)
    # if login_password == user.password:  
    #     session['current_user'] = user.user_id
    #     flash(f'Logged in as {login_email}')
    #     return redirect('/')
    # else:
    #     flash('Wrong password')
    #     return redirect('/login')

if __name__ == '__main__':
    connect_to_db(app)
    app.run(host='0.0.0.0', debug=True)