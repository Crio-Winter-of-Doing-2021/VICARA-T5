from flask import Flask, render_template, url_for, request, session, redirect, flash
import pymongo
from bson.json_util import dumps
import bson
import json
from flask import Response
from flask import jsonify
from passlib.hash import pbkdf2_sha256
from werkzeug.utils import secure_filename
import os, uuid
from azure.storage.blob import BlobServiceClient, BlobClient, ContainerClient, __version__
import datetime
from flask_cors import CORS

app = Flask(__name__)

#CORS(app, supports_credentials=True)
#setting variables
UPLOAD_FOLDER = './uploads'
ALLOWED_EXTENSIONS = {'txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif'}
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['SECRET_KEY'] = 'poplioLitten'
app.config['CLOUD_SERVICE'] = 'azure'
app.config['SESSION_COOKIE_HTTPONLY'] = False
#app.config['SESSION_COOKIE_SAMESITE'] = None
#app.config['SESSION_COOKIE_SECURE'] = True
azure_connection_string = 'DefaultEndpointsProtocol=https;AccountName=vicarastorage;AccountKey=OUi5nVWhMI1BFwcgPVmkBxQJ5YuWVJAgjwwhHBj+adHfovwqF7k3GzikrwmcKJAfnCjTzybyQiLaAl/tq87gPg==;EndpointSuffix=core.windows.net'

#creating the MongoDB Atlas client to connect to database
mongo = pymongo.MongoClient("mongodb+srv://vicarat5:4cpfCHLgRR9N88mb@vicara-t5.wygec.mongodb.net/myFirstDatabase?retryWrites=true&w=majority")

# Create the BlobServiceClient object which will be used to create a container client
blob_service_client = BlobServiceClient.from_connection_string(azure_connection_string)

@app.route("/")
@app.route("/main")
def main():
    return render_template('index.html')


@app.route("/signup", methods=['POST', 'GET'])
def signup():
    if request.method == 'POST':
        users = mongo.users.info
        signup_user = users.find_one({'username': request.form['username']}) #atleast 3 characters long
        if signup_user:
            resp = jsonify('Username already taken')
            resp.status_code = 409
            resp.headers.add("Access-Control-Allow-Origin", "*")
            return resp

        #storing hashed password
        hashed = pbkdf2_sha256.hash(request.form['password'], rounds=200000, salt_size=16)
        users.insert_one({'username': request.form['username'], 'password': hashed, 'email': request.form['email']})
        

        # Create a unique name for the container
        container_name = request.form['username']
        # Create the container
        container_client = blob_service_client.create_container(container_name)

        resp = jsonify('User added successfully')
        resp.headers.add("Access-Control-Allow-Origin", "*")
        resp.status_code = 200
        return resp
        
    return render_template('signup.html')

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        users = mongo.users.info
        signin_user = users.find_one({'username': request.form['username']})

        #checking password
        if signin_user:
            if pbkdf2_sha256.verify(request.form['password'], signin_user['password']):
                session['username'] = request.form['username']
                resp = jsonify('Successfully logged in')
                resp.headers.add("Access-Control-Allow-Origin", "http://localhost:8080")
                resp.headers.add("Access-Control-Allow-Credentials", "true")
                resp.headers.add('Access-Control-Expose-Headers', 'username')
                print(session)
                resp.headers.add('username', request.form['username'])
                resp.set_cookie('userID', request.form['username'])
                #resp.headers.add('Set-Cookie','cross-site-cookie=bar; SameSite=None; Secure')
                resp.status_code = 200
                return resp

        resp = jsonify('Invalid username password combination')
        resp.status_code = 403
        resp.headers.add("Access-Control-Allow-Origin", "http://localhost:8080")
        #resp.headers.add('Set-Cookie','cross-site-cookie=bar; SameSite=None; Secure')
        #resp.headers.add('Set-Cookie', SameSite=None; Secure')
        resp.headers.add("Access-Control-Allow-Credentials",  "true")
        return resp

    return render_template('signin.html')

@app.route('/addFolder', methods = ['POST'])
def addFolder():
    #if user is logged in
    if 'username' in session:
        
        userCollection = mongo.drive[session['username']]


        if 'currentDir' in request.form:
            currentDir = request.form['currentDir']
        else:
            currentDir = '/root'

        if 'absolutePath' in request.form:
            absolutePath = request.form['absolutePath']
        else:
            absolutePath = '/root'

        userCollection.insert_one({'name' : secure_filename(request.form['folderName']),
        'created' : datetime.datetime.utcnow(),
        'accessed' : datetime.datetime.utcnow(),
        'modified' : datetime.datetime.utcnow(),
        'type' : 'folder',
        'parentDir': currentDir,
        'absolutePath': absolutePath
        })

        resp = jsonify("Successfully added folder")
        resp.status_code = 200
        resp.headers.add("Access-Control-Allow-Origin", "*")
        return resp

    resp = jsonify('Login to be able to upload a file')
    resp.status_code = 403
    resp.headers.add("Access-Control-Allow-Origin", "*")
    return resp

@app.route('/upload', methods = ['POST'])
def upload():
    #if user is logged in
    if 'username' in session:
        f = request.files['file']
        f_path = os.path.join(app.config['UPLOAD_FOLDER'] ,secure_filename(f.filename))
        f.save(f_path)

        #uploading to azure storage
        blob_client = blob_service_client.get_blob_client(container=session['username'], blob=secure_filename(f.filename))
        username = session['username']
        with open(f_path, "rb") as data:
            blob_client.upload_blob(data)
        
        #TODO: Add exception handling for cases such as blob already exsiting 
        
        #adding file metadata to mongoDB as part of users collection
        userCollection = mongo.drive[username]

        if 'cloudProvider' in request.form:
            cloudProvider = request.form['cloudProvider']
        else:
            cloudProvider = 'Azure'

        if 'currentDir' in request.form:
            currentDir = request.form['currentDir']
        else:
            currentDir = '/root'

        if 'absolutePath' in request.form:
            absolutePath = request.form['absolutePath']
        else:
            absolutePath = '/root'

        userCollection.insert_one({'name' : secure_filename(f.filename),
        'created' : datetime.datetime.utcnow(),
        'accessed' : datetime.datetime.utcnow(),
        'modified' : datetime.datetime.utcnow(),
        'type' : 'file',
        'parentDir': currentDir,
        'absolutePath': absolutePath,
        'cloudProvider': cloudProvider
        })

        #delete file after upload from server
        os.remove(f_path)

        resp = jsonify("Successfully uploaded file")
        resp.status_code = 200
        resp.headers.add("Access-Control-Allow-Origin", "*")
        return resp

    resp = jsonify('Login to be able to upload a file')
    resp.status_code = 403
    resp.headers.add("Access-Control-Allow-Origin", "*")
    return resp

@app.route('/getFolderItems', methods = ['POST'])
def getFolderItems():
    if 'username' in session:
        if 'absolutePath' in request.form:
            absolutePath = request.form['absolutePath']
        else:
            absolutePath = '/root'
        userCollection = mongo.drive[session['username']]
        listJson = json.loads(dumps(userCollection.find({ "absolutePath": absolutePath })))        
        resp = jsonify(listJson)
        resp.status_code = 200
        resp.headers.add("Access-Control-Allow-Origin", "http://localhost:3000")
        resp.headers.add("Access-Control-Allow-Credentials",  "true")
        return resp
    resp = jsonify('Login to be able to use EDrive')
    resp.status_code = 400
    resp.headers.add("Access-Control-Allow-Origin", "http://localhost:3000")
    resp.headers.add("Access-Control-Allow-Credentials",  "true")
    return resp

@app.route('/getFile', methods = ['GET'])
def getFile():
    #TODO create way of fetching file
    if 'username' in session:
        #TODO: Implement a different name for blobs that user given name to handle same name for files at different paths, or directly give abs path name
        userCollection = mongo.drive[session['username']]

        blob = BlobClient.from_connection_string(conn_str=azure_connection_string, container_name=session['username'], blob_name=request.form['fileName'])

        fname = './downloads/' + request.form['fileName']
        #TODO: Implement this asynchronously
        with open(fname, "wb") as my_blob:
            blob_data = blob.download_blob()
            blob_data.readinto(my_blob)

        resp = jsonify('File downloaded successfully')
        resp.status_code = 200
        resp.headers.add("Access-Control-Allow-Origin", "*")
        return resp

@app.route('/logout', methods = ['GET'])
def logout():
    #clearing session
    session.pop('username', None)
    resp = jsonify("Successfully logged out")
    resp.headers.add("Access-Control-Allow-Origin", "*")
    return resp


if __name__ == "__main__":
    app.run(debug=True)
    app.run()