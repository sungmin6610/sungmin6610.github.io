---
layout: post
title: "Python 오픈 API를 활용한 끝말잇기 게임 만들기"
date: 2026-05-07
category: Python Programing Study
---

```python

```

```python
import requests
import json
import random

apikey = '95F730C747F5F1D85680D36FDD90DA50' 
player = input('사용자: ')
query = player[-1]
url = 'https://opendict.korean.go.kr/api/search?certkey_no=8923&key='+apikey+'&target_type=search&req_type=json&part=word&sort=popular&start=1&num=100&method=start&pos=1&q='+query
response = requests.get(url)

words = json.loads(response.text)

list_a = []

for i in range(10):
    if words['channel']['item'][i]['sense']['word'][0] == query:
        list_a.append(words['channel']['item'][i]['sense']['word'].replace('-',"").replace("^"," "))

print('컴퓨터: ' + random.choice(list_a))
print(url)
```

```python
import requests
import json
import random

apikey = '95F730C747F5F1D85680D36FDD90DA50' 

player = input('사용자: ')

# 종료 조건 1: 사용자가 끝 입력
if player == '끝':
    print('게임 종료')
    exit()

query = player[-1]

url = 'https://opendict.korean.go.kr/api/search?certkey_no=8923&key='+apikey+'&target_type=search&req_type=json&part=word&sort=popular&start=1&num=100&method=start&pos=1&q='+query
response = requests.get(url)

words = json.loads(response.text)

list_a = []

# item 개수 체크 (안전성)
items = words['channel']['item']

for i in range(min(10, len(items))):
    sense = items[i]['sense']
    
    # sense가 리스트일 경우 처리
    if isinstance(sense, list):
        word = sense[0]['word']
    else:
        word = sense['word']
    
    if word[0] == query:
        list_a.append(word.replace('-',"").replace("^"," "))

# 종료 조건 2: 컴퓨터가 단어 못 찾을 때
if not list_a:
    print('컴퓨터: 단어를 찾지 못했습니다. 당신의 승리!')
    exit()

computer_word = random.choice(list_a)

print('컴퓨터: ' + computer_word)
print(url)
```

