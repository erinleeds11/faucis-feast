from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

def connect_to_db(flask_app, db_uri='postgresql:///ratings', echo=False):
    flask_app.config['SQLALCHEMY_DATABASE_URI'] = db_uri
    flask_app.config['SQLALCHEMY_ECHO'] = echo
    flask_app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    db.app = flask_app
    db.init_app(flask_app)

    print('Connected to the db!')


class User(db.Model):
    """A User"""

    __tablename__ = "users"

    user_id = db.Column(db.Integer,
                        autoincrement= True,
                        primary_key = True)
    fname = db.Column(db.String(15))
    lname = db.Column(db.String(20))
    email = db.Column(db.String(30), unique = True)
    password = db.Column(db.String(20))

    rating = db.relationship('Rating')

    def __repr__(self):
        return f'<User user_id={self.user_id} email={self.email}>'

class Rating(db.Model):
    """A rating"""

    __tablename__ = "ratings"

    ratings_id = db.Column(db.Integer,
                        autoincrement= True,
                        primary_key = True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.user_id'))
    google_id = db.Column(db.Integer, unique = True)
    cleanliness_score = db.Column(db.Integer)
    masks_score = db.Column(db.Integer)
    distancing_score = db.Column(db.Integer)
    outdoor_seating = db.Column(db.Boolean)
    comments = db.Column(db.Text)

    user = db.relationship('User')

    def __repr__(self):
        return f'<User user_id={self.user_id} email={self.email}>'

    




