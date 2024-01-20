from flask import Blueprint, request, Response
import json

bp = Blueprint('mainRoutes', __name__, url_prefix='/api')

@bp.route('/')
def index():
    return "The api is live"
