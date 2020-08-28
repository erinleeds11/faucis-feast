from flask import Flask, render_template, request, flash, session, redirect, jsonify
from model import connect_to_db, User, Rating
import crud
import requests
from restaurant_info import get_restaurants_by_latlong, get_restaurant_by_id
from jinja2 import StrictUndefined
import json
from get_key import get_key
from random import choice, randint
from faker import Faker
from PIL import Image
import googlemaps

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
    
    if not user:
        print("Username not found")
        return jsonify("Email not found.")
    elif password != user.password:
       return jsonify("Incorrect password.")
    else:
        print(user.user_id)
        return jsonify("success")

@app.route("/api/get_latlong", methods = ['POST'] ) 
def get_lat_long():
    data = request.get_json()
    # print("The response from react", data)
    address = data['address']
    print(type(address))
    print("Address", address)
    key = get_key()
    URL = "https://maps.googleapis.com/maps/api/geocode/json"
    PARAMS = {'key':key,'address': address, 'region':'us'} #add bounds
    res = requests.get(url = URL, params = PARAMS)
    print(res)
    data = res.json()
    return data

@app.route('/api/get-restaurants', methods = ['POST'])
def get_restaurants_objs():
    "Return a json array of restaurant objects to front end"
    data = request.get_json()
    # print("Restaurant response from React", data)
    
    rest_objs = get_restaurants_by_latlong(data["latitude"], data["longitude"])
    print(rest_objs)
    # for ID in rest_objs:
        # print(f" ID: {ID}, Name: {rest_objs[ID]['name']},   Address: {rest_objs[ID]['vicinity']}")
    return jsonify(rest_objs)

@app.route('/api/restaurants/<ID>', methods = ['POST'])
def show_restaurant_details(ID):
    data = request.get_json()
    rest_info = get_restaurant_by_id(data)
    print(rest_info)
    return jsonify(rest_info)

# @app.route('/api/create-ratings', methods = ['POST'])
def create_random_ratings(ID):
    # restaurant_id = request.get_json()
    print("restaurant_id passed", ID)
    from fakeReviews import fake_reviews;
    bools = [True, False]
    users = crud.all_users()
    user_ids = []
    for user in users:
        user_ids.append(user.user_id)
    for i in range(10):
        crud.create_rating(choice(user_ids), ID, randint(1,5), randint(1,5), randint(1,5), choice(bools), choice(fake_reviews))
    return jsonify("success")

def get_covid_average(rest_ratings):
    sum = 0
    length = len(rest_ratings)
    for rating in rest_ratings:
        sum += rating.cleanliness_score + rating.masks_score + rating.distancing_score
    
    avg = (sum/length)/3
    print(avg)
    return avg
        

@app.route('/api/get-ratings', methods = ['POST'])
def create_fake_ratings():
    #get restaurand id 
    ID = request.get_json()
    # ID = restID["restID"]
    rest_ratings = Rating.query.filter(Rating.restaurant_id == ID).all()
    if not rest_ratings:
        create_random_ratings(ID)
        rest_ratings = Rating.query.filter(Rating.restaurant_id == ID).all()
        average_covid = round(get_covid_average(rest_ratings), 2)
        print("average covid",average_covid)
        return jsonify(average_covid)
    else:
        print("rest_ratings", rest_ratings)
        average_covid = round(get_covid_average(rest_ratings), 2)
        return jsonify(average_covid)
        # {rating_id: [{user: fname, lname}, {scores: cleanliness, masks, distancing, outdoor, comments}]}
        # list_of_dicts = []
        # for rating in rest_ratings:
        #     user_dict = {}
        #     scores_dict={}
        #     ratings_dict ={}
        #     print("First_name", rating.user.fname)
        #     scores_dict["scores"] = [rating.cleanliness_score, rating.masks_score, rating.distancing_score, rating.outdoor_seating, rating.comments]
        #     user_dict["user"] = [rating.user.fname, rating.user.lname]
        #     print("User dict", user_dict)
        #     print("scores dict", scores_dict)
        #     list_of_dicts.append([user_dict, scores_dict])
        # print("list_of_dicts", list_of_dicts)
        # return jsonify(list_of_dicts)
        
@app.route('/api/create-rating', methods = ['POST'])
def user_created_rating():
    rating_info = request.get_json()
    print(rating_info["outdoorSeating"])
    rating_created = crud.create_rating(rating_info["userID"], 
                       rating_info["restaurantID"],
                       int(rating_info["cleanlinessScore"]),
                       int(rating_info["masksScore"]),
                       int(rating_info["distancingScore"]),
                       bool(rating_info["outdoorSeating"].title()),
                       rating_info["comments"],
                        )
    print(rating_created)
    return jsonify("success")
    #create_rating(user_id, restaurant_id, cleanliness_score, masks_score, distancing_score, outdoor_seating, comments):


if __name__ == '__main__':
    connect_to_db(app)
    app.run(host='0.0.0.0', debug=True)


#  @app.route('/api/rest-img', methods = ['POST'])
# def get_photo():
#     data = request.get_json()
#     print(data)
#     API_KEY = get_key()
#     gmaps = googlemaps.Client(key = API_KEY)
#     raw_image_data = gmaps.places_photo(photo_reference=data, max_height=400, max_width=400)
#     print("raw", raw_image_data)
#     f = open('static/js/myImage.jpg', 'wb')
#     for chunk in raw_image_data:
#         if chunk:
#             f.write(chunk)
#     f.close()

#     return jsonify("static/js/myImage.jpg")
    # im = Image.open("myImage.jpg")
    # im.show()



    # key = get_key()
    # URL = "https://maps.googleapis.com/maps/api/place/photo"
    # PARAMS = {'key':key,'photoreference': data, "maxwidth": 400}
    # res = requests.get(url = URL, params = PARAMS)
    
    # return jsonify(res)
    # data = request.get_json
    # print("data here", data)
    # photo_ref = data.photoRef
    # print("PHOTO REF", photo_ref)
    # API_KEY = get_key()
    # gmaps = googlemaps.Client(key = API_KEY)
    # raw_image_data = gmaps.places_photo(photo_reference=photo_ref, max_height=400, max_width=400)
    # f = open("myImage.jpg", "wb")
    # for chunk in raw_image_data:
    #     if chunk:
    #         f.write(chunk)
    # f.close
    # im = Image.open("myImage.jpg")
    # im.show()

    # return jsonify("hi")

    # print("photo_ref", photo_ref)

    # URL = "https://maps.googleapis.com/maps/api/place/photo"
    # PARAMS = {'key':key,'photoreference': photo_ref, "maxwidth": 400}
    # res = requests.get(url = URL, params = PARAMS)
    # f = open('MyDownloadedImage.jpg', 'wb')
    # for chunk in res:
    #     if chunk:
    #         f.write(res)
    # f.close()

    # im = Image.open('MyDownloadedImage.jpg')
    # im.show()