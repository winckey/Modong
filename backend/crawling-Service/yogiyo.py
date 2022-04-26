import requests

API_header = {'x-apisecret': 'fe5183cc3dea12bd0ce299cf110a75a2',
              'x-apikey': 'iphoneap'}


class UpdateMenu:
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


