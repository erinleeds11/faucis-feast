from flask import Flask, render_template, request, flash, session, redirect, jsonify
from model import connect_to_db
import crud
import requests
from restaurant_info import get_restaurants_by_latlong
from jinja2 import StrictUndefined
import json
from get_key import get_key

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

@app.route("/api/get_latlong", methods = ['POST'] ) 
def get_lat_long():
    data = request.get_json()
    print("The response from react", data)
    address = data['address']
    print(type(address))
    print("Address", address)
    key = get_key()
    URL = "https://maps.googleapis.com/maps/api/geocode/json"
    PARAMS = {'key':key,'address': address} #add bounds
    res = requests.get(url = URL, params = PARAMS)
    data = res.json()
    latitude = data["results"][0]["geometry"]["location"]["lat"]
    longitude = data["results"][0]["geometry"]["location"]["lng"]
    get_restaurants_objs(latitude, longitude)
    return data

@app.route('/api/get-restaurants', methods = ['POST'])
def get_restaurants_objs(latitude, longitude):
    "Return a json array of restaurant objects to front end"
    rest_objs = get_restaurants_by_latlong(latitude, longitude)
    for ID in rest_objs:
        print(f" ID: {ID}, Name: {rest_objs[ID]['name']},   Address: {rest_objs[ID]['vicinity']}")
    return jsonify(rest_objs)
    
if __name__ == '__main__':
    connect_to_db(app)
    app.run(host='0.0.0.0', debug=True)

