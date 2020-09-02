from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    """A User"""

    __tablename__ = "users"

    user_id = db.Column(db.Integer,
                        primary_key=True,
                        autoincrement=True)
    fname = db.Column(db.String)
    lname = db.Column(db.String)
    email = db.Column(db.String, unique=True)
    password = db.Column(db.String)

    rating = db.relationship('Rating')

    def __repr__(self):
        return f'<User user_id={self.user_id} email={self.email}>'

class Rating(db.Model):
    """A rating"""

    __tablename__ = "ratings"

    rating_id = db.Column(db.Integer,
                        primary_key=True,
                        autoincrement=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.user_id'))
    restaurant_id = db.Column(db.String)
    cleanliness_score = db.Column(db.Integer)
    masks_score = db.Column(db.Integer)
    distancing_score = db.Column(db.Integer)
    outdoor_seating = db.Column(db.Boolean)
    scan_codes = db.Column(db.Boolean)
    hand_sanitizer = db.Column(db.Boolean) 
    comments = db.Column(db.Text)

    user = db.relationship('User')

    def __repr__(self):
        return f'<Rating rating_id={self.rating_id}>'

def connect_to_db(flask_app, db_uri='postgresql:///ratings', echo=False):
    flask_app.config['SQLALCHEMY_DATABASE_URI'] = db_uri
    flask_app.config['SQLALCHEMY_ECHO'] = echo
    flask_app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    db.app = flask_app
    db.init_app(flask_app)

    print('Connected to the db!')
    
if __name__ == '__main__':
    from server import app

    # Call connect_to_db(app, echo=False) if your program output gets
    # too annoying; this will tell SQLAlchemy not to print out every
    # query it executes.

    connect_to_db(app)


