from selenium import webdriver
from selenium.webdriver.common.by import By
import time
from bs4 import BeautifulSoup
import re

options = webdriver.ChromeOptions()
# options.add_argument('headless')
options.add_argument('window-size=1920x1080')
options.add_argument("disable-gpu")

# url입력
driver = webdriver.Chrome('C:/Dev/tools/chromedriver.exe', options=options) # 크롬드라이버 경로 설정
url = "https://www.yogiyo.co.kr/mobile/#/1027807/" # 사이트 입력
driver.get(url) # 사이트 오픈
driver.maximize_window() # 전체장
# time.sleep(2) # 2초 지연

html = driver.page_source
html_source = BeautifulSoup(html, 'html.parser')



# 데이터 추출
restaurant_name = html_source.find_all("span", class_="restaurant-name ng-binding") #업체명
restaurant_name = html_source.select_one('#content > div.restaurant-detail.row.ng-scope > div.col-sm-8 > div.restaurant-info > div.restaurant-title > span')


# 전체 카테고리 뽑아서 -> 카테고리 수만큼 반복
categories = html_source.find_all('div', class_='panel panel-default ng-scope')
categories_len = len(categories)

# print(categories[4])
# 카테고리
category = categories[4]
category_name = category.find('span', class_='menu-name pull-left ng-binding')
print(")))")
print(category_name)


# 메뉴
menues = category.find_all('td', class_='menu-text')
menue = menues[0]
menue_name = menue.find('div', class_='menu-name ng-binding')
price = menue.find('span', {'ng-bind':"item.price|krw"})
print(menue_name.text)
print(price.text)

# 옵션-메뉴 클릭-옵션크롤링
xpath = '//*[@id="menu"]/div/div[2]/div[2]/div/ul/li[1]'
driver.find_element(by=By.XPATH, value=xpath).click();
html = driver.page_source
html_source = BeautifulSoup(html, 'html.parser')

# time.sleep(1)
# 옵션 크롤링
options = html_source.find('div', {'ng-repeat':"subchoice in menu.subchoices"})
# option = options[0]
option_name = options.find('strong').text
option_required = options.find('span', {'ng-class':"subchoice.mandatory ? 'em' : ''"}).text
print(option_name)
print(option_required)

# 옵션 선택지
option_selections = options.find_all('label')
selection = option_selections[1]
selection_name = selection.find('div', class_="sname ng-binding")
selection_price = selection.find('span', {'ng-class':"choice.price == '0' ? 'noprice' : ''"}).text

print(selection_name.text)
print(selection_price)


menues = []
options = []
categories_len = len(categories)



for c in range(2,categories_len):
    # 카테고리 이름
    category = categories[c]
    category_name = category.find('span', class_='menu-name pull-left ng-binding')
    print("************")
    print(category_name.text)

    # 메뉴이름
    menues = category.find_all('td', class_='menu-text')
    for m in range(1,len(menues)):
        menue = menues[m]
        menue_name = menue.find('div', class_='menu-name ng-binding')
        menue_price = menue.find('span', {'ng-bind': "item.price|krw"})
        print(menue_name.text)
        print(menue_price.text)

        #클릭
        # xpath = '//*[@id="menu"]/div/div[4]/div[2]/div/ul/li[2]'
        print(c, m)
        xpath = '//*[@id="menu"]/div/div['+str(c+1)+']/div[2]/div/ul/li['+str(m+1)+']'
        print(xpath)
        driver.find_element(by=By.XPATH, value=xpath).click();

        time.sleep(1)
        xpath = '/html/body/div[10]/div/div[1]/a'
        # driver.find_element(by=By.XPATH, value=xpath).click();



driver.quit()