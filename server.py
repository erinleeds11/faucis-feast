from flask import Flask, render_template, request, flash, session, redirect, jsonify
from model import connect_to_db
import crud
from jinja2 import StrictUndefined
import json

app = Flask(__name__)
app.secret_key = "abc"
app.jinja_env.undefined = StrictUndefined

@app.route('/')
def root():

    return render_template("root.html")


@app.route('/api/create-user', methods = ["POST"] )
def create_user():
    """Create User"""
    data = request.get_json()
    print(data)
    fname = data['fname']
    lname = data['lname']
    email = data['email']
    password = data['password']
    if crud.get_user_by_email(email):
        return jsonify("account exists")
    else:
        user = crud.create_user(fname, lname, email, password)
        print(user)
        return jsonify("ok")

@app.route('/api/login', methods = ['POST']) 
def login():
    """Login User"""
    data = request.get_json()
    email = data['email']
    password = data['password']

    user = crud.get_user_by_email(email) 
    
    if not user.email:
        return jsonify("Username not found")
    elif password != user.password:
       return jsonify("Password not found")
    else:
        print(user)
        session["current_user"] = user.user_id
        return jsonify("sucess")

if __name__ == '__main__':
    connect_to_db(app)
    app.run(host='0.0.0.0', debug=True)

