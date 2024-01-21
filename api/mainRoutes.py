from flask import Blueprint, request, Response
import json

bp = Blueprint('mainRoutes', __name__, url_prefix='/api')

from api import db
from api import generator

bp.register_blueprint(db.bp)
bp.register_blueprint(generator.bp)

@bp.route('/')
def index():
    return "The api is live"
