from flask import Flask, render_template, request, flash, session, redirect, jsonify
from model import connect_to_db, User, Rating
import crud
import os
import requests
from restaurant_info import get_restaurants_by_latlong, get_restaurant_by_id
from jinja2 import StrictUndefined
import json
from random import choice, randint
from faker import Faker
import googlemaps
API_KEY = os.environ['GOOGLE_KEY']
app = Flask(__name__)
app.secret_key = "abc"
app.jinja_env.undefined = StrictUndefined

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def catch_all(path):
    return render_template('root.html')

@app.route('/api/create-user', methods = ["POST"] )
def create_user():
    """Create User"""
    data = request.get_json()
    if data["fname"] and  data['lname'] and data['email'] and data['password']:
        fname = data['fname']
        lname = data['lname']
        email = data['email']
        password = data['password']
    else:
        return jsonify("invalid")
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
    
    if not user:
        print("Username not found")
        return jsonify("Email not found.")
    elif password != user.password:
       return jsonify("Incorrect password.")
    else:
        print(user.user_id)
        return jsonify(user.user_id)

@app.route("/api/get-key", methods = ['GET'])
def get_api_key():
    return jsonify(API_KEY)


@app.route("/api/get_latlong", methods = ['POST'] ) 
def get_lat_long():
    data = request.get_json()
    # print("The response from react", data)
    address = data['address']
    print(type(address))
    print("Address", address)
    key = API_KEY
    URL = "https://maps.googleapis.com/maps/api/geocode/json"
    PARAMS = {'key':key,'address': address, 'region':'us'} #add bounds
    if data:
        res = requests.get(url = URL, params = PARAMS)
    print(res)
    data = res.json()
    return data

@app.route('/api/get-restaurants', methods = ['POST'])
def get_restaurants_objs():
    "Return a json array of restaurant objects to front end"
    data = request.get_json()
    if data:
        rest_objs = get_restaurants_by_latlong(data["latitude"], data["longitude"])
    print(rest_objs)
    return jsonify(rest_objs)

@app.route('/api/restaurants/<ID>', methods = ['POST'])
def show_restaurant_details(ID):
    data = request.get_json()
    if data: 
        rest_info = get_restaurant_by_id(data)
    print(rest_info)
    return jsonify(rest_info)

def create_random_ratings(ID):
    print("restaurant_id passed", ID)
    from fakeReviews import fake_reviews;
    bools = [True, False]
    users = crud.all_users()
    user_ids = []
    for user in users:
        user_ids.append(user.user_id)
    for i in range(10):
        integer = randint(1,2)
        if integer == 1:
            crud.create_rating(choice(user_ids), ID, randint(1,4), randint(1,5), randint(1,3), choice(bools), choice(bools), choice(bools), choice(fake_reviews))
        else:
             crud.create_rating(choice(user_ids), ID, randint(3,5), randint(4,5), randint(3,5), choice(bools), choice(bools), choice(bools), choice(fake_reviews))
    return jsonify("success")

def get_covid_average(rest_ratings):
    sum = 0
    length = len(rest_ratings)
    for rating in rest_ratings:
        sum += rating.cleanliness_score + rating.masks_score + rating.distancing_score
    
    avg = (sum/length)/3
    print(avg)
    return avg
        


@app.route('/api/get-avg-covid', methods = ['POST'])
def get_avg_covid():
    IDs = request.get_json()
    covid_list = []
    for ID in IDs:
        rest_ratings = Rating.query.filter(Rating.restaurant_id == ID).all()
        if not rest_ratings:
            create_random_ratings(ID)
            rest_ratings = Rating.query.filter(Rating.restaurant_id == ID).all()
            average_covid = round(get_covid_average(rest_ratings), 2)
            print("average covid",average_covid)
            covid_list.append(average_covid)
        else:
            print("rest_ratings", rest_ratings)
            average_covid = round(get_covid_average(rest_ratings), 2)
            covid_list.append(average_covid)
    return jsonify(covid_list)


@app.route('/api/get-ratings', methods = ['POST'])
def get_ratings():
    ID = request.get_json()
    list_of_dicts = []
    rest_ratings = Rating.query.filter(Rating.restaurant_id == ID).all()
    print("Rest ratings", rest_ratings)
    for rating in rest_ratings:
        user_dict = {}
        scores_dict={}
        ratings_dict ={}
        print("First_name", rating.user.fname)
        scores_dict["scores"] = [rating.cleanliness_score, rating.masks_score, rating.distancing_score, rating.outdoor_seating, rating.scan_codes, rating.hand_sanitizer, rating.comments]
        user_dict["user"] = [rating.user.fname, rating.user.lname]
        print("User dict", user_dict)
        print("scores dict", scores_dict)
        list_of_dicts.append([user_dict, scores_dict])
    print("list_of_dicts", list_of_dicts)
    return jsonify(list_of_dicts)
        
@app.route('/api/create-rating', methods = ['POST'])
def user_created_rating():
    rating_info = request.get_json()
    print("rating info", rating_info)
    rating_created = crud.create_rating(rating_info["userID"], 
                       rating_info["restaurantID"],
                       int(rating_info["cleanlinessScore"]),
                       int(rating_info["masksScore"]),
                       int(rating_info["distancingScore"]),
                       bool(rating_info["outdoorSeating"].title()),
                       bool(rating_info["handSanitizer"].title()),
                       bool(rating_info["qrCodes"].title()),
                       rating_info["comments"],
                        )
    print(rating_created)
    return jsonify("success")
    #create_rating(user_id, restaurant_id, cleanliness_score, masks_score, distancing_score, outdoor_seating, comments):


if __name__ == '__main__':
    connect_to_db(app)
    app.run(host='0.0.0.0', debug=True)

