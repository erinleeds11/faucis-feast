import os
import json
from random import choice, randint
from datetime import datetime

#from crud import 
import model
import server

os.system('dropdb ratings')
os.system('createdb ratings')

model.connect_to_db(server.app)
model.db.create_all()

