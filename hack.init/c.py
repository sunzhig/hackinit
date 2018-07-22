# coding=utf-8
import sys
import json
from flask import Flask,request
from flask_cors import *
import flask_restful
import urllib
import urllib.request

app = Flask(__name__)
CORS(app,supports_credentials=True)
api = flask_restful.Api(app)

class HelloWorld(flask_restful.Resource):
    def get(self,data):
        request_url = "https://aip.baidubce.com/rest/2.0/face/v3/detect"
        data=data.replace('sunzhg','/')
        params = "{\"image\":\""+data+"\",\"image_type\":\"BASE64\",\"face_field\":\"faceshape,facetype,age,beauty,expression,gender,glasses,race,quality\"}"
        access_token = '24.e350694767f9b2643953f6c2ac212c8a.2592000.1533346847.282335-11488479'
        request_url = request_url + "?access_token=" + access_token
        request = urllib.request.Request(url=request_url, data=params.encode())
        request.add_header('Content-Type', 'application/json')
        response = urllib.request.urlopen(request)
        content = response.read()
        return content.decode()


api.add_resource(HelloWorld, '/<data>')

if __name__ == '__main__':
    app.run(host='0.0.0.0',debug=True)
