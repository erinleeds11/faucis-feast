from model import db, User, Rating, connect_to_db

def create_user(fname, lname, email, password):
    """Create and return a new user."""

    user = User(fname = fname, lname = lname, email=email, password=password)

    db.session.add(user)
    db.session.commit()

    return user

def create_rating(google_id, cleanliness_score, masks_score, distancing_score, outdoor_seating, comments):

    rating = Rating(google_id=google_id, cleanliness_score=cleanliness_score, masks_score=masks_score, 
                    distancing_score = distancing_score, outdoor_seating =outdoor_seating, comments=comments)

    db.session.add(rating)
    db.session.commit()

    return rating

def get_restaurants():

    restaurants = 

