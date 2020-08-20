from flask import Flask, render_template, request, flash, session, redirect, jsonify
from model import connect_to_db
import crud
import requests
from restaurant_info import get_restaurants_by_latlong, get_restaurant_by_id
from jinja2 import StrictUndefined
import json
from get_key import get_key
from random import choice, randint
from faker import Faker

app = Flask(__name__)
app.secret_key = "abc"
app.jinja_env.undefined = StrictUndefined

# @app.route('/')
# def root():

#     return render_template("root.html")

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def catch_all(path):
    return render_template('root.html')

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
    # print("The response from react", data)
    address = data['address']
    print(type(address))
    print("Address", address)
    key = get_key()
    URL = "https://maps.googleapis.com/maps/api/geocode/json"
    PARAMS = {'key':key,'address': address} #add bounds
    res = requests.get(url = URL, params = PARAMS)
    print(res)
    data = res.json()
    # latitude = data["results"][0]["geometry"]["location"]["lat"]
    # longitude = data["results"][0]["geometry"]["location"]["lng"]
    # get_restaurants_objs(latitude, longitude)
    return data

@app.route('/api/get-restaurants', methods = ['POST'])
def get_restaurants_objs():
    "Return a json array of restaurant objects to front end"
    data = request.get_json()
    print("Restaurant response from React", data)
    rest_objs = get_restaurants_by_latlong(data["latitude"], data["longitude"])
    for ID in rest_objs:
        print(f" ID: {ID}, Name: {rest_objs[ID]['name']},   Address: {rest_objs[ID]['vicinity']}")
    return jsonify(rest_objs)

@app.route('/api/restaurants/<ID>', methods = ['POST'])
def show_restaurant_details(ID):
    data = request.get_json()
    print("The response should be ID", data)
    rest_info = get_restaurant_by_id(data)
    print(rest_info)
    return jsonify(rest_info)
    # key = get_key()
    # URL = "https://maps.googleapis.com/maps/api/place/details/json"
    # PARAMS = {'key': key, "place_id": data, "fields": ['name', 'formatted_phone_number', 'website', 'photo', 'opening_hours', 'rating', 'vicinity', 'icon'] }
    # res = requests.get(url = URL, params = PARAMS)
    # print("ApI response", res)
    # data = res.json()
    # return data




# def create_random_ratings(restaurant_id):
#     bools = [True, False]
#     users = User.query.all()
#     user_ids = []
#     for user in users:
#         user_ids.append(user.user_id)
#     for i in range(10):
#         crud.create_rating(choice(user_ids), restaurant_id, randint(1,5), randint(1,5), randint(1,5), choice(bools), faker.text())


# @app.route('/api/get-ratings', methods = ['POST'])
# def create_fake_ratings():
#     #get restaurand id 
#     data = request.get_json()
#     create_random_ratings(data)
#     rest_ratings = Rating.query.filter(restaurant_id == data)
#     return jsonify(rest_ratings)
        
# @app.route('/api/create-ratings', methods = ['POST'])


if __name__ == '__main__':
    connect_to_db(app)
    app.run(host='0.0.0.0', debug=True)


    