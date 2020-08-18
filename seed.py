import os
import json
from random import choice, randint
from restaurant_info import get_restaurants_by_latlong 
import json
from faker import Faker
from crud import create_rating, create_user
import model
import server

bools = [True, False]

os.system('dropdb ratings')
os.system('createdb ratings')

model.connect_to_db(server.app)
model.db.create_all()


restaurants = get_restaurants_by_latlong(37.773972, 122.431297)
restaurant_ids = []
for restaurant in restaurants:
    restaurant_ids.append(restaurant)

faker = Faker('en_US')
user_ids = []
for i in range(10):
    fname = faker.first_name()
    lname = faker.last_name()
    email = faker.email()
    password = faker.password()
    #print(fname, lname, email, password)
    user = create_user(fname, lname, email, password)
    user_ids.append(user.user_id)


ratings = []
for i in range(100):
    user_id = choice(user_ids)
    restaurant_id = choice(restaurant_ids)
    cleanliness_score = randint(1,5)
    masks_score = randint(1,5)
    distancing_score = randint(1,5)
    outdoor_seating = choice(bools)
    comments = faker.text()
    rating = create_rating(user_id, restaurant_id, cleanliness_score, masks_score, distancing_score, outdoor_seating, comments)
    ratings.append(rating)


for rating in ratings:
    id = rating.restaurant_id
    name = restaurants[id]['name']
    print(f'Id:{id}, Name: {name} Cleanliness Rating: {rating.cleanliness_score}')

