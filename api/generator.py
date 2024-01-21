from openai import OpenAI
import openai
import time
from flask import Blueprint, request, Response
from os import environ
import sqlite3
import uuid
import json
from dotenv import load_dotenv

bp = Blueprint('generator', __name__, url_prefix='/llm')

load_dotenv("/etc/secrets/.env")

client = openai.Client(api_key=environ.get('OPENAI_API_KEY'))

angel_asst = client.beta.assistants.retrieve(environ.get('ANGEL_ASST_ID'))
devil_asst = client.beta.assistants.retrieve(environ.get('DEVIL_ASST_ID'))

@bp.route('/')
def index():
    return "Generator is live"

@bp.post('/angel/question')
def angelQNS():
    question = request.get_json()['question']
    thread = client.beta.threads.create(
        messages=[
            {
                "role": "user",
                "content": question
            }
        ]
    )

    run = client.beta.threads.runs.create(
        thread_id=thread.id,
        assistant_id=angel_asst.id
    )

    while run.status != 'completed':
        run = client.beta.threads.runs.retrieve(
            thread_id=thread.id,
            run_id=run.id
        )
        print(run.status)
        time.sleep(5)


    thread_messages = client.beta.threads.messages.list(thread.id)
    jsonString = json.loads(thread_messages.model_dump_json())
    data = jsonString["data"][0]["content"][0]["text"]["value"]
    json_data = json.dumps({"answer": data})
    return json_data

@bp.post('/devil/question')
def devilQNS():
    question = request.get_json()['question']
    thread = client.beta.threads.create(
        messages=[
            {
                "role": "user",
                "content": question
            }
        ]
    )

    run = client.beta.threads.runs.create(
        thread_id=thread.id,
        assistant_id=devil_asst.id
    )

    while run.status != 'completed':
        run = client.beta.threads.runs.retrieve(
            thread_id=thread.id,
            run_id=run.id
        )
        print(run.status)
        time.sleep(5)


    thread_messages = client.beta.threads.messages.list(thread.id)
    jsonString = json.loads(thread_messages.model_dump_json())
    data = jsonString["data"][0]["content"][0]["text"]["value"]
    json_data = json.dumps({"answer": data})
    return json_data


