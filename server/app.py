from flask import Flask, render_template, url_for, request, session, redirect, flash
import pymongo
from bson.json_util import dumps
import bson
import json
import certifi
from flask import Response
from flask import jsonify
from passlib.hash import pbkdf2_sha256
from werkzeug.utils import secure_filename
import os, uuid
from azure.storage.blob import BlobServiceClient,generate_blob_sas, BlobSasPermissions,ContentSettings , BlobClient, ContainerClient, __version__
import datetime
from datetime import datetime, timedelta
from flask_cors import CORS
import uuid
import boto3
import os
import mimetypes

app = Flask(__name__)

import requests as r
print(r.certs.where())

#CORS(app, supports_credentials=True)
#setting variables
UPLOAD_FOLDER = './uploads'
ALLOWED_EXTENSIONS = {'txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif'}
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['SECRET_KEY'] = 'poplioLitten'
app.config['CLOUD_SERVICE'] = 'azure'
app.config['SESSION_COOKIE_HTTPONLY'] = False
#app.config['SESSION_COOKIE_SAMESITE'] = None
#app.config['SESSION_COOKIE_SAMESITE'] = 'Lax'
#app.config['SESSION_COOKIE_SECURE'] = True
azure_connection_string = 'DefaultEndpointsProtocol=https;AccountName=vicarastorage;AccountKey=OUi5nVWhMI1BFwcgPVmkBxQJ5YuWVJAgjwwhHBj+adHfovwqF7k3GzikrwmcKJAfnCjTzybyQiLaAl/tq87gPg==;EndpointSuffix=core.windows.net'
#creating the MongoDB Atlas client to connect to database
mongo = pymongo.MongoClient("mongodb+srv://vicarat5:4cpfCHLgRR9N88mb@vicara-t5.wygec.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", tlsCAFile=certifi.where())

aws_access_key_id = 'AKIAQZW4RHOXGBIHYYUE'
aws_secret_access_key = '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'
aws_region = 'ap-south-1'
aws_bucket_name = 'vicarastorage'
aws_session =  boto3.Session(
    aws_access_key_id=aws_access_key_id,
    aws_secret_access_key=aws_secret_access_key,
    region_name=aws_region
)

s3_resource = aws_session.resource('s3')
s3_client = aws_session.client('s3')

# Create the BlobServiceClient object which will be used to create a container client
blob_service_client = BlobServiceClient.from_connection_string(azure_connection_string, headers={'Content-Disposition': 'inline'})

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
        container_id = ''.join([request.form['username'], str(uuid.uuid4())])
        users.insert_one({'username': request.form['username'], 'password': hashed, 'email': request.form['email'], 'container': container_id})
        
        # Create the Azure container
        container_client = blob_service_client.create_container(container_id)

        #Create the AWS folder
        s3_client.put_object(Bucket=aws_bucket_name, Key=(container_id+'/'))

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
    if 'username' in request.headers:
        
        userCollection = mongo.drive[request.headers['username']]

        if 'parentArtefactID' in request.form:
            parentArtefactID = request.form['parentArtefactID']
        else:
            parentArtefactID = '/root'

        if 'absolutePath' in request.form:
            absolutePath = request.form['absolutePath']
        else:
            absolutePath = '/root'
        
        artefact_id = request.headers['username'] + '_folder_' + str(uuid.uuid4())

        payload = {
            'name' : secure_filename(request.form['folderName']),
            'created' : datetime.utcnow(),
            'artefactID': artefact_id,
            'accessed' : datetime.utcnow(),
            'modified' : datetime.utcnow(),
            'starred' : False,
            'type' : 'folder',
            'parentArtefactID': parentArtefactID,
            'absolutePath': absolutePath
        }
        x = userCollection.insert_one(payload)

        # resp = jsonify("Successfully added folder")
        resp = jsonify({**payload, '_id': x.inserted_id})
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
    if 'username' in request.headers:
        f = request.files['file']
        f_path = os.path.join(app.config['UPLOAD_FOLDER'] ,secure_filename(f.filename))
        f.save(f_path)
        file_ext = os.path.splitext(secure_filename(f.filename))[1]

        artefact_id = request.headers['username'] + '_file_' + str(uuid.uuid4()) + file_ext
        
        print(artefact_id)

        users = mongo.users.info
        userData = users.find_one({'username': request.headers['username']})

        file_mime_type, _ = mimetypes.guess_type(artefact_id)

        if 'cloudProvider' in request.form:
            cloudProvider = request.form['cloudProvider']
        else:
            cloudProvider = 'Azure'

        if cloudProvider == 'Azure':
            #uploading to azure storage
            my_content_settings = ContentSettings(content_type=file_mime_type, content_disposition= 'inline')

            blob_client = blob_service_client.get_blob_client(container=userData['container'], blob=artefact_id)
            with open(f_path, "rb") as data:
                blob_client.upload_blob(data, content_settings=my_content_settings)

        else:
            #uploading to aws s3
            print('EnteringAWS')
            print(userData['container'])
            print(file_mime_type)
            #s3_resource.Bucket(aws_bucket_name).upload_file(f_path, userData['container']+'/'+file_id)
            s3_resource.Bucket(aws_bucket_name).upload_file(f_path, userData['container']+'/'+artefact_id, ExtraArgs={'ContentType': file_mime_type, 'ContentDisposition' : 'inline' })
        
        #TODO: Add exception handling for cases such as blob already exsiting 
        
        #adding file metadata to mongoDB as part of users collection
        userCollection = mongo.drive[request.headers['username']]

        if 'parentArtefactID' in request.form:
            parentArtefactID = request.form['parentArtefactID']
        else:
            parentArtefactID = '/root'

        if 'absolutePath' in request.form:
            absolutePath = request.form['absolutePath']
        else:
            absolutePath = '/root'


        payload = {
            'name' : secure_filename(f.filename),
            'artefactID' : artefact_id,
            'created' : datetime.utcnow(),
            'accessed' : datetime.utcnow(),
            'modified' : datetime.utcnow(),
            'type' : 'file',
            'starred': False,
            'parentArtefactID': parentArtefactID,
            'absolutePath': absolutePath,
            'cloudProvider': cloudProvider
        }

        x = userCollection.insert_one(payload)

        # delete file after upload from server
        os.remove(f_path)

        # resp = jsonify("Successfully uploaded file")
        resp = jsonify({ **payload, '_id': x.inserted_id })
        resp.status_code = 200
        resp.headers.add("Access-Control-Allow-Origin", "*")
        return resp

    resp = jsonify('Login to be able to upload a file')
    resp.status_code = 403
    resp.headers.add("Access-Control-Allow-Origin", "*")
    return resp

@app.route('/getFolderItems', methods = ['POST'])
def getFolderItems():
    if 'username' in request.headers:
        if 'artefactID' in request.form:
            artefactId = request.form['artefactID']
            searchQuery = {'parentArtefactID': artefactId}
        elif 'absolutePath' in request.form:
            absolutePath = request.form['absolutePath']
            searchQuery = {'absolutePath': absolutePath}
        else:
            searchQuery = {'absolutePath': '/root'}
            # absolutePath = '/root'
        userCollection = mongo.drive[request.headers['username']]
        listJson = json.loads(dumps(userCollection.find(searchQuery)))        
        resp = jsonify(listJson)
        resp.status_code = 200
        resp.headers.add("Access-Control-Allow-Origin", "http://localhost:8080")
        resp.headers.add("Access-Control-Allow-Credentials", "true")
        return resp
    resp = jsonify('Login to be able to use EDrive')
    resp.status_code = 400
    resp.headers.add("Access-Control-Allow-Origin", "http://localhost:8080")
    resp.headers.add("Access-Control-Allow-Credentials", "true")
    return resp

@app.route('/getFile', methods = ['GET'])
def getFile():
    #TODO create way of fetching file
    if 'username' in request.headers:
        #TODO: Implement a different name for blobs that user given name to handle same name for files at different paths, or directly give abs path name
        userCollection = mongo.drive[request.headers['username']]

        #TODO: check if blob is a part of users blobs
        #blob = BlobClient.from_connection_string(conn_str=azure_connection_string,container_name=session['username'] , blob_name=request.form['fileName'])

        fileData = userCollection.find_one({'artefactID': request.headers['artefactID']})
        artefactID = request.headers['artefactID']
        cloudProvider = fileData['cloudProvider']
        fileName = fileData['name']

        users = mongo.users.info
        userData = users.find_one({'username': request.headers['username']})
        
        if cloudProvider == 'Azure':
            #TODO: try implementing a block blob service
            print(userData['container'])
            print('a1')
            sas_blob = generate_blob_sas(account_name='vicarastorage', 
                                    container_name=userData['container'],
                                    blob_name=artefactID,
                                    account_key='pDdAKH74ZV4HbXaWKcYXNS1OXR6rJ3fvSD7T//dQIbYyfLvhS0BZdVNy0sllTFyl1zsdvf0b7v6OgP5Y6NuOCg==',
                                    permission=BlobSasPermissions(read=True),
                                    expiry=datetime.utcnow() + timedelta(minutes=30))
            #blob.generate_blob_shared_access_signature(container_name=session['username'],blob_name=request.form['fileName'], permission = READ,expiry = datetime.utcnow() + timedelta(minutes=30))
            #block_blob_service = BlockBlobService(conn_str= azure_connection_string)
            url = 'https://'+'vicarastorage'+'.blob.core.windows.net/'+userData['container']+'/'+artefactID+'?'+sas_blob
            print(url)
            resp = jsonify(url)
            resp.status_code = 200
            resp.headers.add("Access-Control-Allow-Origin", "*")
            return resp
        else:
            file_full_id = userData['container'] + '/' + artefactID
            url = s3_client.generate_presigned_url(ClientMethod='get_object',
                                     Params={'Bucket': aws_bucket_name, 'Key': file_full_id}, ExpiresIn=3600)
            resp = jsonify(url)
            resp.status_code = 200
            resp.headers.add("Access-Control-Allow-Origin", "*")
            return resp

    resp = jsonify('Invalid access request')
    resp.status_code = 403
    resp.headers.add("Access-Control-Allow-Origin", "*")
    return resp

@app.route('/getFileLink', methods = ['GET'])
def getFileLink():
    #TODO create way of fetching file
    if 'username' in request.headers:
        #TODO: Implement a different name for blobs that user given name to handle same name for files at different paths, or directly give abs path name
        userCollection = mongo.drive[request.headers['username']]

        #TODO: check if blob is a part of users blobs
        #blob = BlobClient.from_connection_string(conn_str=azure_connection_string,container_name=session['username'] , blob_name=request.form['fileName'])

        fileData = userCollection.find_one({'artefactID': request.headers['artefactID']})
        artefactID = request.headers['artefactID']
        cloudProvider = fileData['cloudProvider']
        fileName = fileData['name']

        users = mongo.users.info
        userData = users.find_one({'username': request.headers['username']})
        
        if cloudProvider == 'Azure':
            #TODO: try implementing a block blob service
            print(userData['container'])
            sas_blob = generate_blob_sas(account_name='vicarastorage', 
                                    container_name=userData['container'],
                                    blob_name=artefactID,
                                    account_key='pDdAKH74ZV4HbXaWKcYXNS1OXR6rJ3fvSD7T//dQIbYyfLvhS0BZdVNy0sllTFyl1zsdvf0b7v6OgP5Y6NuOCg==',
                                    permission=BlobSasPermissions(read=True),
                                    expiry=datetime.utcnow() + timedelta(minutes=30))
            #blob.generate_blob_shared_access_signature(container_name=session['username'],blob_name=request.form['fileName'], permission = READ,expiry = datetime.utcnow() + timedelta(minutes=30))
            #block_blob_service = BlockBlobService(conn_str= azure_connection_string)
            url = 'https://'+'vicarastorage'+'.blob.core.windows.net/'+userData['container']+'/'+artefactID+'?'+sas_blob
            print(url)
            resp = jsonify(url)
            resp.status_code = 200
            resp.headers.add("Access-Control-Allow-Origin", "*")
            return resp
        else:
            file_full_id = userData['container'] + '/' + artefactID
            file_mime_type, _ = mimetypes.guess_type(artefactID)
            url = s3_client.generate_presigned_url(ClientMethod='get_object',
                                     Params={'Bucket': aws_bucket_name, 'Key': file_full_id, 'ResponseContentType': file_mime_type}, ExpiresIn=3600)
            resp = jsonify(url)
            resp.status_code = 200
            resp.headers.add("Access-Control-Allow-Origin", "*")
            return resp

    resp = jsonify('Invalid access request')
    resp.status_code = 403
    resp.headers.add("Access-Control-Allow-Origin", "*")
    return resp

@app.route('/rename', methods = ['PUT'])
def renameFile():
    #if user is logged in
    if 'username' in request.headers:
        #adding file metadata to mongoDB as part of users collection
        userCollection = mongo.drive[request.headers['username']]
        userCollection.update_one({'artefactID': request.form['artefactID']},{ "$set": { 'name': request.form['newName'], 'modified' : datetime.utcnow() } })

        resp = jsonify('file renamed successfully')
        resp.status_code = 200
        resp.headers.add("Access-Control-Allow-Origin", "*")
        return resp

    resp = jsonify('Login to be able to rename a file')
    resp.status_code = 403
    resp.headers.add("Access-Control-Allow-Origin", "*")
    return resp


@app.route('/deleteFile', methods = ['DELETE'])
def deleteFile():
    #if user is logged in
    if 'username' in request.headers: 
        #adding file metadata to mongoDB as part of users collection
        userCollection = mongo.drive[request.headers['username']]
        userCollection.delete_one({'artefactID': request.form['artefactID']})
        resp = jsonify('file deleted successfully')
        resp.status_code = 200
        resp.headers.add("Access-Control-Allow-Origin", "*")
        return resp
        
        #TODO: Perform actual delete
        # print(file_id)

        # users = mongo.users.info
        # userData = users.find_one({'username': request.headers['username']})

        # file_mime_type, _ = mimetypes.guess_type(file_id)

        # if 'cloudProvider' in request.form:
        #     cloudProvider = request.form['cloudProvider']
        # else:
        #     cloudProvider = 'Azure'

        # if cloudProvider == 'Azure':
        #     #uploading to azure storage
        #     my_content_settings = ContentSettings(content_type=file_mime_type, content_disposition= 'inline')

        #     blob_client = blob_service_client.get_blob_client(container=userData['container'], blob=file_id)
        #     with open(f_path, "rb") as data:
        #         blob_client.upload_blob(data, content_settings=my_content_settings)

        # else:
        #     #uploading to aws s3
        #     print('EnteringAWS')
        #     print(userData['container'])
        #     print(file_mime_type)
        #     #s3_resource.Bucket(aws_bucket_name).upload_file(f_path, userData['container']+'/'+file_id)
        #     s3_resource.Bucket(aws_bucket_name).upload_file(f_path, userData['container']+'/'+file_id, ExtraArgs={'ContentType': file_mime_type, 'ContentDisposition' : 'inline' })
        
        # #TODO: Add exception handling for cases such as blob already exsiting 
        
        # #adding file metadata to mongoDB as part of users collection
        # userCollection = mongo.drive[request.headers['username']]

        # if 'currentDir' in request.form:
        #     currentDir = request.form['currentDir']
        # else:
        #     currentDir = '/root'

        # if 'absolutePath' in request.form:
        #     absolutePath = request.form['absolutePath']
        # else:
        #     absolutePath = '/root'


        # payload = {
        #     'name' : secure_filename(f.filename),
        #     'file_id' : file_id,
        #     'created' : datetime.utcnow(),
        #     'accessed' : datetime.utcnow(),
        #     'modified' : datetime.utcnow(),
        #     'type' : 'file',
        #     'parentDir': currentDir,
        #     'absolutePath': absolutePath,
        #     'cloudProvider': cloudProvider
        # }

        # x = userCollection.insert_one(payload)

        # # delete file after upload from server
        # os.remove(f_path)

        # # resp = jsonify("Successfully uploaded file")
        # resp = jsonify({ **payload, '_id': file_id })
        # resp.status_code = 200
        # resp.headers.add("Access-Control-Allow-Origin", "*")
        # return resp

    resp = jsonify('Login to be able to delete a file')
    resp.status_code = 403
    resp.headers.add("Access-Control-Allow-Origin", "*")
    return resp

@app.route('/starFile', methods = ['PUT'])
def starFile():
    #if user is logged in
    if 'username' in request.headers:
        #adding file metadata to mongoDB as part of users collection
        userCollection = mongo.drive[request.headers['username']]
        userCollection.update_one({'artefactID': request.form['artefactID']},{ "$set": { 'starred' : (bool)(request.form['starred']), 'modified' : datetime.utcnow() } })

        resp = jsonify('file starred successfully')
        resp.status_code = 200
        resp.headers.add("Access-Control-Allow-Origin", "*")
        return resp

    resp = jsonify('Login to be able to star a file')
    resp.status_code = 403
    resp.headers.add("Access-Control-Allow-Origin", "*")
    return resp

@app.route('/allStars', methods = ['GET'])
def getStarred():
    #if user is logged in
    if 'username' in request.headers:
        userCollection = mongo.drive[request.headers['username']]
        listJson = json.loads(dumps(userCollection.find({ "starred": True })))        
        resp = jsonify(listJson)
        resp.status_code = 200
        resp.headers.add("Access-Control-Allow-Origin", "http://localhost:8080")
        resp.headers.add("Access-Control-Allow-Credentials", "true")
        return resp
    resp = jsonify('Login to be able to use EDrive')
    resp.status_code = 403
    resp.headers.add("Access-Control-Allow-Origin", "http://localhost:8080")
    resp.headers.add("Access-Control-Allow-Credentials", "true")
    return resp

@app.route('/organizeFile', methods = ['PUT'])
def organizeFile():
    #if user is logged in
    if 'username' in request.headers:
        userCollection = mongo.drive[request.headers['username']]
        fullPath = request.form['newAbsPath']
        parentDir = fullPath.rsplit('/', 1)[-1] 
        userCollection.update_one({'artefactID': request.form['artefactID']},{ "$set": {'parentDir': parentDir, 'absolutePath': request.form['absolutePath'], 'modified' : datetime.utcnow() } })     
        resp = jsonify('file successfully relocated')
        resp.status_code = 200
        resp.headers.add("Access-Control-Allow-Origin", "http://localhost:8080")
        resp.headers.add("Access-Control-Allow-Credentials", "true")
        return resp
    resp = jsonify('Login to be able to use EDrive')
    resp.status_code = 403
    resp.headers.add("Access-Control-Allow-Origin", "http://localhost:8080")
    resp.headers.add("Access-Control-Allow-Credentials", "true")
    return resp

@app.route('/getRecent', methods = ['GET'])
def getRecent():
    #if user is logged in
    if 'username' in request.headers:
        userCollection = mongo.drive[request.headers['username']]
        listJson = json.loads(dumps(userCollection.find({"type":"file"}).sort('_id',-1).limit(5)))  
        resp = jsonify(listJson)
        resp.status_code = 200
        resp.headers.add("Access-Control-Allow-Origin", "http://localhost:8080")
        resp.headers.add("Access-Control-Allow-Credentials", "true")
        return resp
    resp = jsonify('Login to be able to use EDrive')
    resp.status_code = 403
    resp.headers.add("Access-Control-Allow-Origin", "http://localhost:8080")
    resp.headers.add("Access-Control-Allow-Credentials", "true")
    return resp

@app.route('/logout', methods = ['GET'])
def logout():
    #clearing session
    session.pop('username', None)
    resp = jsonify("Successfully logged out")
    resp.headers.add("Access-Control-Allow-Origin", "*")
    return resp




if __name__ == "__main__":
    app.run(debug=True,host='0.0.0.0',port=5000)