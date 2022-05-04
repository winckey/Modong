import json

from flask import Flask, request, jsonify
import redis
import py_eureka_client.eureka_client as eureka_client

import yogiyo

rest_port = 8080

# Eureka
eureka_client.init(eureka_server="http://k6e102.p.ssafy.io:8761/eureka",
                   app_name="crawling-service",
                   instance_host='k6e102.p.ssafy.io',
                   instance_port=rest_port)


# Flask
app = Flask(__name__)
app.config['JSON_AS_ASCII'] = False

rd = redis.StrictRedis(host='k6e102.p.ssafy.io', port=6379, db=0)


# 메뉴 크롤링 체크
@app.route('/crawling-service/delivery/<board_id>', methods=['GET'])
def menu_crawling_check(board_id):
    # Redis - get board_id
    menus = rd.get(board_id)

    return menus


# 크롤링한 데이터 삭제
@app.route('/crawling-service/delivery', methods=['DELETE'])
def crawling_delete():
    board_id = request.get_json()['board_id']
    rd.delete(board_id)

    return "DELETE COMPLETE"


# 메뉴 크롤링, post 로 식당 정보를 받아서 크롤링 실시
@app.route('/crawling-service/delivery', methods=['POST'])
def menu_crawling():
    board_id = request.get_json()['board_id']
    server = yogiyo.UpdateMenu()
    menus = json.dumps(server.menu_information(board_id), ensure_ascii=False).encode('utf-8')

    # Redis 저장 - 키값(board_id)
    rd.set(board_id, menus)

    return menus


if __name__ == "__main__":
    app.run(host='0.0.0.0', port=rest_port)
