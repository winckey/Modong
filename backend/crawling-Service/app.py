from flask import Flask, request, jsonify
from flask_restx import Api, Resource, reqparse

import py_eureka_client.eureka_client as eureka_client

from controller import Menu

rest_port = 8080

# Eureka
eureka_client.init(eureka_server="http://k6e102.p.ssafy.io:8761/eureka",
                   app_name="crawling-service",
                   instance_port=rest_port)


# Flask
app = Flask(__name__)
app.config['JSON_AS_ASCII'] = False

api = Api(app, version='1.0', title='Crawling API 문서', description='Swagger 문서', doc="/api-docs")
api.add_namespace(Menu, '/crawling-service')


if __name__ == "__main__":
    app.run()
    # app.run(host='0.0.0.0', port=rest_port)
