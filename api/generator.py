from openai import OpenAI
import openai
import time
from flask import Blueprint, request, Response
import os
import sqlite3
import uuid
import json

bp = Blueprint('generator', __name__, url_prefix='/llm')

client = openai.Client(api_key="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")

angel_asst = client.beta.assistants.retrieve("asst_VsmDUilhSFZC9o6RNqQaXF4M")
devil_asst = client.beta.assistants.retrieve("asst_TjH1TFRYkfdzpneJLc3JL70o")

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


