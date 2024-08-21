"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

# Obtener todos los usuarios:

@app.route('/usuarios', methods=['GET'])
def get_all_users():
    users = User.query.all()

    return jsonify(users.serialize()), 201

## Registro de usuarios:

@app.route('/registrar', methods=['POST'])
def crear_usuario():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    # Verifica si el usuario ya existe
    user = User.query.filter_by(email=email).first()
    if user:
        return jsonify({'error': 'User already exists'}), 400

    # Crea un nuevo usuario
    user = User(id=User.query.count() + 1, email=email, password=password, is_active=True)
    db.session.add(user)
    db.session.commit()
    return jsonify(user.serialize()), 201
