from model import db, User, Rating, connect_to_db

def create_user(fname, lname, email, password):
    """Create and return a new user."""

    user = User(fname=fname, lname=lname, email=email, password=password)

    db.session.add(user)
    db.session.commit()

    return user

def create_rating(user_id, restaurant_id, cleanliness_score, masks_score, distancing_score, outdoor_seating, scan_codes, hand_sanitizer,comments):

    rating = Rating(user_id = user_id, restaurant_id=restaurant_id, cleanliness_score=cleanliness_score, masks_score=masks_score, 
                    distancing_score = distancing_score, outdoor_seating =outdoor_seating, scan_codes=scan_codes, hand_sanitizer=hand_sanitizer, comments=comments)

    db.session.add(rating)
    db.session.commit()

    return rating

def get_user_by_email(email):

    return User.query.filter(User.email == email).first()

def all_users():

    return User.query.all()

def filter_by_restID(ID):

    return Rating.query.filter(Rating.restaurant_id == ID).all()
