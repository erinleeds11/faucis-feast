#pip install googlemaps
#pip install prettyprint

import googlemaps
import pprint
import time
import os
import requests
from get_key import get_key

API_KEY = get_key()
#Define Client
gmaps = googlemaps.Client(key = API_KEY)

# Do a simple nearby search where we specify the location
places_result  = gmaps.places_nearby(location='37.773972, -122.431297', radius = 40000, type = 'restaurant')

stored_results = {}

# loop through each of the places in the results, and get the place details.    
def get_restaurants_by_latlong():  
    for place in places_result['results']:

        my_place_id = place['place_id']

        my_fields = ['name','formatted_phone_number','website', 'photo', 'opening_hours', 'rating', 'vicinity']

        places_details  = gmaps.place(place_id= my_place_id , fields= my_fields)

        #stored_results.append(places_details['result'])
        stored_results[my_place_id] = places_details['result']

    return stored_results

    

# print(stored_results)

#prints by name
stored_results = get_restaurants_by_latlong()
for ID in stored_results:
    print(f" ID: {ID}, Name: {stored_results[ID]['name']},   Address: {stored_results[ID]['vicinity']}")

    

