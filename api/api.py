import requests

r = requests.post("http://127.0.0.1:5000/api/llm/angel/question", json={"question": "What is the meaning of life?"})
print(r.text)