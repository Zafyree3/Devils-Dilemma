import os

from flask import Flask
from flask import render_template

# create and configure the app
app = Flask(__name__)

from api import mainRoutes

app.register_blueprint(mainRoutes.bp)
# try:
#     os.makedirs(app.instance_path)
# except OSError:
#     pass

# a simple page that says hello
try:
    app.config.from_pyfile(filename="config.py", silent=True)
    #print(app.config)
    print("Loaded config.py")
except FileNotFoundError:
    print("config.py not found, no config loaded")
    pass

@app.route('/')
def index():
    return render_template('index.html')

