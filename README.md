# <img src="https://github.com/erinleeds11/faucis-feast/blob/master/static/images/headerFauci.png" width="40%" alt="Fauci'sFeast">
During these uncertain times, going out to eat makes life seem a bit normal again, but there is still a health risk in doing this
Inspired by the Coronavirus pandemic and my blind, but deep trust in apps such as Rotten Tomatoes and Yelp, I  wanted to create an app that is  both relevant and useful during these times.

## About Erin
Erin recently graduated from Georgetown University in May with a degree in Biology and a minor in Psychology. She completed an equivalent of a senior thesis studying the effects of climate change on an endangered butterfly species in a research lab. She started to use R to analyze my data and enjoyed the coding aspect of her research more than the Biology itself. She took more computer science class her senior year which gave her the idea to complete a bootcamp after graduation. Recently, Erin moved to Oakland and has been participating and thoroughly enjoying Hackbright Academy's bootcamp. She is looking forward to starting a career in engineering.

## Contents
* [Technologies](#tech-stack)
* [APIs](#apis)
* [Features](#features)

## <a name="tech-stack"></a>Technologies
* Python
* Flask
* PostgresQL
* SQLAlchemy ORM
* React
* JavaScript
* jQuery
* HTML
* CSS
* Materialize

## <a name="apis"></a>APIs
* Google Geocoding
* Google Places
* Google JavaScript Maps

## <a name="features"></a>Features

#### Homepage
Users can navigate through the site using the bar at the top. The homepage displays a carousel which 
is initialized using jQuery.

![alt text](https://github.com/erinleeds11/faucis-feast/blob/master/static/images/homepage.png "homepage")

#### Create an Account/Log in
A user can create an account, login, or continue as a guest. However, a user must be logged in to rate restaurants. This feature is handled by SQLAlchemy ORM database queries.

![alt text](https://github.com/erinleeds11/faucis-feast/blob/master/static/images/logincreateaccount.gif "create account")

#### Search for nearby restaurants
Using Google’s Geocoding and Places API, a user can type in an address and get results back of nearby restaurants. The markers were rendered asynchronously in React and are color coded, numbered and clickable. Clicking on either the marker on the map or the name of the restaurant in the list, the user will be brought to the individual restaurant's page.

![alt text](https://github.com/erinleeds11/faucis-feast/blob/master/static/images/googlesearch.gif "rest search")

#### Restaurant details page with reviews
Using a RESTful API on the backend, React fetches the corresponding endpoint with a unique ID to display more information about the restaurant on this page. I created a fake database of users and ratings using the Faker library to show restaurant reviews. The user can scroll through these reviews, and if they are logged in, they can write their own review.

![alt text](https://github.com/erinleeds11/faucis-feast/blob/master/static/images/individualpage.gif "details")

#### Rate a restaurant
I made this form after doing some research on ways restaurants are remodeling and adapting to new health and safety measures. 

![alt text](https://github.com/erinleeds11/faucis-feast/blob/master/static/images/postrating.gif "rate")
