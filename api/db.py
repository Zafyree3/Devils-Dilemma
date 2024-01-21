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

@bp.post('/question')
def write():
    data = request.get_json()
    print(data)
    if data is None:
        return Response(status=400)
    newuuid = uuid.uuid4()
    newuuid = str(newuuid)
    question  = data['question']
    devilans = data['devilans']
    angelans = data['angelans']
    
    conn = sqlite3.connect(dburl)
    cursor = conn.cursor()
    cursor.execute('INSERT INTO questions VALUES (?,?,?,?)', (newuuid, question, devilans, angelans))
    conn.commit()
    conn.close()
    
    return {'uuid': newuuid}
@bp.get('/question')
def read():
    conn = sqlite3.connect(dburl)
    cursor = conn.cursor()
    cursor.execute('SELECT questionUUID FROM questions')
    data = cursor.fetchall()
    conn.close()
    return json.dumps(data)

@bp.get('/question/all')
def readAll():
    conn = sqlite3.connect(dburl)
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM questions')
    data = cursor.fetchall()
    conn.close()
    return json.dumps(data)

@bp.get('/question/question')
def readAllq():
    conn = sqlite3.connect(dburl)
    cursor = conn.cursor()
    cursor.execute('SELECT question, questionUUID FROM questions')
    data = cursor.fetchall()
    conn.close()
    return json.dumps(data)

@bp.get('/question/<string:UUID>')
def readquestion(UUID):
    conn = sqlite3.connect(dburl)
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM questions WHERE questionUUID=?', (UUID,))
    data = cursor.fetchall()
    conn.close()
    return json.dumps(data[0])

@bp.delete('/question/<string:UUID>')
def deletequestion(UUID):
    conn = sqlite3.connect(dburl)
    cursor = conn.cursor()
    cursor.execute('DELETE FROM questions WHERE questionUUID=?', (UUID,))
    conn.commit()
    conn.close()
    return Response(status=204)