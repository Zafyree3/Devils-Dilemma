from flask import Blueprint, request, Response
import os
import sqlite3
import uuid
import json

bp = Blueprint('db', __name__, url_prefix='/db')
dburl = os.path.join(bp.root_path, '../database/database.db')

@bp.route('/')
def index():
    return "Database is live"

@bp.route('/write', methods=['POST'])
def write():
    data = request.get_json()
    print(data)
    if data is None:
        return Response(status=400)
    newuuid = uuid.uuid4()
    question  = data['question']
    devilans = data['devilans']
    angelans = data['angelans']
    
    conn = sqlite3.connect(dburl)
    cursor = conn.cursor()
    cursor.execute('INSERT INTO questions VALUES (?,?,?,?)', (newuuid, question, devilans, angelans))
    cursor.commit()
    conn.close()
    
    return Response(status=200)

@bp.route('/read', methods=['GET'])
def read():
    conn = sqlite3.connect(dburl)
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM questions')
    data = cursor.fetchall()
    conn.close()
    return json.dumps(data)

@bp.route('/readquestion', methods=['GET'])
def readquestion():
    uuid = request.args.get('uuid')
    conn = sqlite3.connect(dburl)
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM questions WHERE questionUUID=?', (uuid,))
    data = cursor.fetchall()
    conn.close()
    return json.dumps(data[0])

@bp.route('/deletequestion', methods=['POST'])
def deletequestion():
    uuid = request.args.get('uuid')
    conn = sqlite3.connect(dburl)
    cursor = conn.cursor()
    cursor.execute('DELETE FROM questions WHERE questionUUID=?', (uuid,))
    cursor.commit()
    conn.close()
    return Response(status=200)