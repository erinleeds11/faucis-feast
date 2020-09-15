#pip install googlemaps
#pip install prettyprint

import googlemaps
import pprint
import time
import os
import requests


API_KEY=os.environ['GOOGLE_KEY']
# loop through each of the places in the results, and get the place details.    
def get_restaurants_by_latlong(lat = 37.7749 , long=-122.4194):  
    #37.7749, -122.4194
    gmaps = googlemaps.Client(key = API_KEY)

# Do a simple nearby search where we specify the location
    places_result  = gmaps.places_nearby(location = (lat, long), radius = 40000, type = 'restaurant')

    stored_results = {}

    for place in places_result['results']:

        my_place_id = place['place_id']

        my_fields = ['name','formatted_phone_number','website', 'photo', 'opening_hours', 'rating', 'vicinity', 'geometry']

        places_details  = gmaps.place(place_id= my_place_id , fields= my_fields)

        #stored_results.append(places_details['result'])
        stored_results[my_place_id] = places_details['result']

    return stored_results
    
def get_restaurant_by_id(ID):
    print("ID", ID)
    gmaps = googlemaps.Client(key = API_KEY)
    my_fields = ['name','formatted_phone_number','website', 'photo', 'opening_hours', 'rating', 'vicinity', 'geometry']
    places_details  = gmaps.place(place_id= ID , fields= my_fields)
    print("places details", places_details)
    return places_details['result']



#prints by name
# stored_results = get_restaurants_by_latlong()
# for ID in stored_results:
#     print(f" ID: {ID}, Name: {stored_results[ID]['name']},   Address: {stored_results[ID]['vicinity']}")

    


