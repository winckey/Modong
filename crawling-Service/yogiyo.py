import json
import os
import sys
from datetime import datetime

import requests

API_header = {'x-apisecret': 'fe5183cc3dea12bd0ce299cf110a75a2',
              'x-apikey': 'iphoneap'}


class UpdateMenu:
    def __init__(self, file=None):
        if not file:
            _id = input("input id(root) : ")
            _pw = input("input pw       : ")
            _db = input("databases      : ")
            connect_info = ("localhost", 3306, _id, _pw, _db)
        else:
            with open(os.path.join(sys.path[0], file), "r") as f:
                connect_info = list(map(lambda x: x.strip(), f.read().split(",")))

    def menu_information(self, restaurant_id, MENUS):
        response = requests.get(f"https://www.yogiyo.co.kr/api/v1/restaurants/{restaurant_id}/menu", headers=API_header)
        try:
            menu = response.json()
        except Exception as e:
            # error
            print(e)
            return 0

        for M in menu:
            try:
                len(M['items'])
            except:
                return 0  # no items

            for m in M['items']:
                # 메인메뉴 크롤링
                _menu = {
                    "menu_id": m['id'],
                    "updated_at": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
                    "name": m['name'],
                    "description": m['description'],
                    "price": m['price'],

                }
                for s in m['subchoices']:
                    _menu['subcohices'] = {
                        "subchoices_mandatory": s['mandatory'],
                        "subchoices_name": s['name'],
                        "subchoices_multiple_count": s['multiple_count'],
                        "subchoices_subchoices": s['subchoices'],
                        "subchoices_multiple": s['multiple'],
                    }

                print(_menu)

                MENUS.append(_menu)

        json.dump(MENUS, open(f'./menu_info_.json', "w", encoding="utf-8"), ensure_ascii=False, indent='\t')
        return len(MENUS)


if __name__ == "__main__":
    server = UpdateMenu(file="../connection.txt")

    cnt = 0
    MENU = []

    print("****** INITIATING MENU CRAWLING *******")
    for i in range(0, 10):
        cnt += server.menu_information(224203 + i, MENU)
