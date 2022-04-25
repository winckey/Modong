import json
import os
import sys
from datetime import datetime

import requests
from flask import jsonify

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

    def menu_information(self, restaurant_id):
        response = requests.get(f"https://www.yogiyo.co.kr/api/v1/restaurants/{restaurant_id}/menu", headers=API_header)
        try:
            menu = response.json()
        except Exception as e:
            # error
            print(e)
            return 0
        MENUS = []
        for M in menu:

            try:
                len(M['items'])
            except:
                return 0  # no items

            for m in M['items']:
                # 메인메뉴 크롤링
                _menu = {
                    "name": m['name'],
                    "description": m['description'],
                    "price": m['price'],
                    "one_dish": m['one_dish'],
                    "section": m['section'],
                    "soldout": m['soldout'],

                }
                submenu = []
                for s in m["subchoices"]:
                    smenu = {
                        "is_available_quantity": s['is_available_quantity'],
                        "mandatory": s['mandatory'],
                        "multiple": s['multiple'],
                        "name": s['name'],
                    }
                    ssubmenu = []
                    for ss in s["subchoices"]:
                        subsubmenu = {
                            "name": ss["name"],
                            "price": ss["price"],
                            "soldout": ss["soldout"]
                        }
                        ssubmenu.append(subsubmenu)
                    smenu["subchoices"] = ssubmenu
                    submenu.append(smenu)
                _menu['subchoices'] = submenu

                MENUS.append(_menu)

        return MENUS


if __name__ == "__main__":
    server = UpdateMenu(file="../connection.txt")

    cnt = 0
    MENU = []

    print("****** INITIATING MENU CRAWLING *******")
    for i in range(0, 10):
        cnt += server.menu_information(224204 + i)
