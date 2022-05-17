import json

from flask import request
from flask_restx import Api, Resource, reqparse, Namespace, fields

import redis, datetime

import yogiyo

rest_port = 8080

# redis
rd = redis.StrictRedis(host='k6e1021.p.ssafy.io', port=6379, db=0)

Menu = Namespace(
    name="Menus",
    description="Menu 크롤링 위해 사용하는 API.",
)

menu_fields = Menu.model('Menu', {  # Model 객체 생성
    'board_id': fields.Integer(description='가게 고유번호')
})


@Menu.route('')
class Crawling(Resource):
    # 크롤링한 데이터 삭제
    @Menu.expect(menu_fields)
    def delete(self):
        board_id = request.get_json()['board_id']
        rd.delete(board_id)
        return "DELETE COMPLETE"

    # 메뉴 크롤링, post 로 식당 정보를 받아서 크롤링 실시
    @Menu.expect(menu_fields)
    def post(self):
        board_id = request.get_json()['board_id']
        server = yogiyo.UpdateMenu()
        menus = json.dumps(server.menu_information(board_id), ensure_ascii=False).encode('utf-8')

        # Redis 저장 - 키값(board_id)
        rd.set(board_id, menus, datetime.timedelta(seconds=5))

        return menus.decode('utf-8')


@Menu.route('/<int:board_id>')
class Get(Resource):
    # 메뉴 크롤링 체크
    def get(self, board_id):
        menus = rd.get(board_id)
        return menus.decode('utf-8')
