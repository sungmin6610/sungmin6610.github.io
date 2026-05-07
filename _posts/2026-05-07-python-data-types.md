---
layout: post
title: "파이썬 기초 자료형 정리"
date: 2026-05-07
---

#  파이썬(Python)

### 변수(Variable): 값을 저장해 두는 상자

```python
print('안녕하세요.')   # print('') 안에 문자열을 넣어 사용

a = 10        # a: 변수 이름
print(a)      # =: 값을 변수에 저장한다는 의미  
              # 10: 변수에 저장되는 값 -> a라는 변수에 10을 저장한다.

# 변수의 값은 나중에 바꿀 수 있다.
b = 5
print(b)

b = 20
print(b)

# 변수 이름 규칙
# 1num = 10 -> 숫자로 시작 불가
# class = 5 -> 예약어 사용 불가(if, else, while, def, class, import 등)
# my name   -> 공백 사용 불가
```

## 자료형
### 숫자형 자료형
**int**
: 정수를 뜻하는 자료형
(ex) 0, -1, -2, -3, 1, 2, 3

**float**
: 실수를 뜻하는 자료형
(ex) 0.0, 2.0, -9.3, 3.14

```python
print(10) # 양의 정수
print(-5) # 음의 정수
print(0) # 정수 0

print(3.14) # 양의 실수
print(-9.3) # 음의 실수
print(2.0) # 실수형으로 표현된 정수

#int 와 float의 차이점: 정수 5와 실수 5.0은 엄연히 다른 자료형이다.
print(type(5))    # <class 'int'>
print(type(5.0))  # <class 'float'>
```

### 연산자

**연산자 우선순위: 제곱 연산자 -> 곱셈, 나눗셈, 나머지, 몫 연산자 -> 덧셈, 뺄셈 연산자**

**괄호를 사용해 연산자 우선순위 변경 가능.**

*덧셈*: +

*뺄셈*: -

*곱셈*: *

*나눗셈*: /

*제곱*: **

*나머지*: %

*몫*: //

*복합 연산자*: +=, -=, *=, /=, //=, %=, **=

```python
# 사칙연산              
print(10 + 2) # 덧셈 

print(10 - 2) # 뺄셈

print(10 * 2) # 곱셈

print(10 / 2) # 나눗셈

print(2 ** 3) # 거듭제곱: 2의 3제곱

print(9 % 2) # 나머지 연산: 9를 2로 나눈 나머지

# 정수형과 소수형을 같이 연산할 경우 결과값이 소수형으로 나옴.
print(10 + 2.0) # 결과값: 12.0
```

### 문자열 자료형(str)
**문자열은 따옴표로 감싼 문자나 글자들의 집합이다.**
- 큰 따옴표: " " 

"안녕하세요 제 이름은 송성민입니다"<br><br>

- 작은 따옴표: ' '

'안녕하세요 제 이름은 송성민입니다'<br><br>

- 큰 따옴표 3개: """ """

"""안녕하세요 제 이름은 송성민입니다"""<br><br>

- 작은 따옴표 3개: ''' '''

'''안녕하세요 제 이름은 송성민입니다'''

```python
# 문자열 생성: 작은 따옴표나 큰 따옴표로 감싸기.
print("Hello, Python!")
print('송성민')

# 따옴표를 여러개 쓰는 경우
print("""준원이 형이 "파이썬 공부했어?" 라고 말했다.""")
```

### 이스케이프 문자

**\로 시작되는 문자열로 줄바꿈, 탭, 따옴표 등과 같은 특수상황을 표현하기 위해 사용한다.**
- \n, 줄 바꿈 문자
- \t, 탭 간격
- \\\\, 백슬래쉬 문자
- \\', 작은따옴표 문자
- \\", 큰따옴표 문자


```python
# \n 줄바꿈
print("Python\nProgramming")
# 결과:
#Python
#Programming 

# \t 탭 문자
print("이름\t나이\t직업")
# 결과: 이름    나이    직업

# 따옴표 출력
print("동영이 형은 \"안녕\" 이라고 말했다")
# 결과: 동영이 형은 "안녕" 이라고 말했다
```

### 문자열 연산
**문자열끼리 연산이 가능하다.**
- 문자열 덧셈: 문자열 + 문자열
- 문자열 곱셈: 문자열 * 숫자

```python
# 문자열 연결: + 를 사용해 문자열을 연결하기.
print("Hello" + " World")  # 결과: "Hello World"

# 문자열 반복: * 를 사용해 문자열 반복하기.
print("Push " * 3)  # 결과: "Push Push Push "

# 문자열과 숫자의 차이: 따옴표로 감싼 숫자는 문자열로 처리된다.
print("1" + "2")  # 결과: "12" 
print(1 + 2)      # 결과: 3 
```

### 문자열 인덱싱
**문자열 인덱싱(Indexing)은
문자열에서 특정 위치의 문자 하나를 꺼내는 방법이다.
<br>인덱스는 0부터 시작한다.**

예시: text = "Python"
<br>P: 0, -6 <br>y: 1, -5 <br>t: 2, -4 <br>h: 3, -3 <br>o: 4, -2<br> n: 5, -1

```python
# 인덱싱 사용방법

text = "Hello Python"
a = text[0]         # a = "H"
aa = text[-12]      # a = "H"
print(a)
print(aa)

b = text[5]         # b = " "(공백)
print(b)

c = text[7]         # c = "y"
cc = text[-5]       # c = "y"
print(c)
print(cc)

# d = "p"+"y"+"t"+"h" = "pyth"
d = text[6]+text[7]+text[8]+text[9]
print(d)
```

### 문자열 슬라이싱
**문자열을 원하는 지점부터 원하는 크기만큼 분해하는 것.**
- 변수명[첫번째항목:마지막항목+1]
 - 마지막 항목은 포함되지 않아, 추출하고싶은 마지막항목+1의 값을 지정해주어야함
 - 첫번째 항목을 공백으로 놓으면, 0번 인덱스부터 추출.
 - 마지막 항목을 공백으로 놓으면, 문자열 끝까지 추출.
 

```python
# 부분추출: 시작점은 포함하고 끝점 직전까지만 가져옵니다.

text = "PythonProgrammin"

print(text[0:6])   # 'Python' (0부터 5까지)
print(text[6:13])  # 'Program' (6부터 12까지)

#생략

print(text[:6])    # 'Python'
print(text[6:])    # 'Programming'

# 간격 조절 (Step)
nums = "123456789"
print(nums[::2])   # '13579' (2칸씩 이동)

# 문자열 뒤집기 (역순)
print(text[::-1])  # 'gnimmargorPnohtyP'
```

## 문자열 함수

- LEN() : 문자열 길이 구하기
- COUNT() : 특정 문자 수 세기
- UPPER() : 모든 문자 대문자로 변경
- LOWER() : 모든 문자 소문자로 변경
- STRIP() : 양쪽 공백 지우기
- LSTRIP() : 왼쪽 공백 지우기
- RSTRIP() : 오른쪽 공백 지우기
- SPLIT() : 문자열 원하는 형식으로 나누기
- REPLACE() : 문자열 원하는 문자열로 바꾸기
- JOIN() : 문자열 사이사이에 문자 삽입

### LEN()
공백, Escape Code를 포함한 문자열의 길이를 구하는 함수
Escape Code의 경우 \t 를 하나의 문자로 취급

```python
text = "I like\tKimchi"

len(text)
```

### COUNT()
문자열에 속한 특정 문자의 개수를 세는 함수

```python
text = "I like Kimchi"
print(text.count('i'))
```

### UPPER()
대문자 변경

### LOWER()
소문자 변경

```python
a = "upper"
b = "LOWER"
c = "HaLf"

print(a.upper())
print(b.lower())
print(c.upper())
print(c.lower())
```

### STRIP(), LSRTIP(), RSRTIP()
공백 지우는 함수

```python
text = " center "

print(text.strip()) # " center "
print(text.lstrip()) # "center "
print(text.rstrip()) # " center"
```

### SPLIT()
문자열을 특정 기준에 따라 분리

```python
text1 = "Split test setence"
print(text1.split())

text2 = "p,y,t,h,o,n"
print(text2.split(','))
```

### REPLACE()
문자열을 원하는 문자열로 대체

```python
text = "I like Kimchi"
print("원래 문장 : "+ text, "\n바뀐 문장 : "+ text.replace("Kimchi", "Steak"))
print("원래 문장 : "+ text, "\n바뀐 문장 : "+ text.replace("I", "You"))
```

### JOIN()
문자열 사이사이에 특정 문자 삽입

```python
word = "python"
print((',').join(word))
```

### 문자열 Formatting
문자열에서 변수나 값을 원하는 형식으로 출력
1. 숫자 대입 2. 문자 대입 3. 변수 통해 값 대입

### 문자열 Format Code

```python
print("%d명의 학생이 교실에 있다" % 9)

print("나는 %s학과이다" % "반도체장비소프트웨어")

print("지금 온도는 %f도 이다" % 16.5)
```

### 사용자 입력 함수 INPUT()
사용자에게 문자열을 입력받아 변수에 저장하는 함수

변수 = input("문자열을 입력하세요 : ")
input으로 받은 모든 값은 string 형태로 변수에 저장되므로 다른 자료형으로 사용하려면 자료형 변환을 사용해야 한다

```python
a = int(input('정수를 입력해주세요:'))
b = float(input('실수를 입력해주세요:'))

print(a+b)
```

### 리스트 자료형(list)
모든 종류의 자료형을 자유롭게 묶어서 사용할 수 있는 자료형의 묶음

list = [1, "문자열", -0.5, '안녕']

```python
a = list()
a = []

b = [1, "문자열", -0.5, '안녕']

c = list(b)

print(a); print(b); print(c)
```

### 리스트 Indexing
리스트도 문자열과 유사하게 Indexing이 가능 (단, 문자열이나, 리스트 내부의 리스트도 하나의 요소로 취급한다.)

```python
a = [1, "문자열", -0.5, '안녕']
print("a[0] : " + str(a[0]))
print("a[1] : " + a[1])
print("a[2] : " + str(a[2]))
print("a[3] : " + a[3])

print("a[1][0] : " + a[1][0])
print("a[1][1] : " + a[1][1])
print("a[1][0] : " + a[1][2])
print()

b = [1, 2, [3, 4, 5]]
print("b[0]: "+ str(b[0]))
print("b[1]: "+ str(b[1]))
print("b[2]: "+ str(b[2]))
print("b[2][0]: "+ str(b[2][0]))
print()

c = [1, 2, 3, ['I', 'like', 'python', ['a', 'b', 'c']]]
print(c[3][2][5])
```

### 리스트 Slicing
- 문자열과 동일한 방법으로 슬라이싱 가능
- 리스트 중복시 Indexing 후 슬라이싱 해야 한다.

```python
a = [1, 2, 3, ['I', 'like', 'Python', ['e', 'f', 'g']]]


print(a[0:2])
print(a[3][0:2])
print(a[3][2])
```

### 리스트 덧셈, 곱셈
- 리스트 덧셈 : 더하는 리스트가 하나로 합쳐짐
- 리스트 곱셈 : 곱하는 수만큼 리스트 반복

```python
x = [1, 2, 3]
y = [4, 5, 6]

z = x + y
print(z)

# 리스트 곱셈
print(x*3)
print(z*2)
```

## 리스트 관련 함수
- LEN() : 리스트의 길이 구하기
- APPEND() : 리스트에 요소 추가
- SORT() : 리스트 정렬
- REVERSE() : 리스트 뒤집기
- INDEX() : 요소의 위치 찾기
- INSERT() : 요소 삽입하기
- REMOVE() : 요소 제거하기
- POP() : 요소 추출하기
- COUNT() : 요소의 개수 세기

### LEN()
리스트의 길이 구하는 함수

```python
a = [1, 2, 3, ['I', 'like', 'Python', ['e', 'f', 'g']]]

print(len(a))
print(len(a[3]))
print(len(a[3][2]))
```

### APPEND()
리스트에 요소 추가

```python
a = []

a.append(1)
print(a)
```

### SORT()
리스트 정렬

```python
a = [2, 3, 4, 1, 5]

a.sort()
print(a)
```

### REVERSE()
리스트 뒤집기

```python
a = [1, 2, 3, 4, 5]
b = [5, 4, 3, 2, 1]

a.reverse()
b.reverse()
print(a)
print(b)
```

### INDEX()
요소의 위치 찾기

- 리스트 내에 동일한 값이 존재할 때, 가장 앞 요소의 Index 반환
- 리스트 내에 없는 값을 찾을 시 에러 발생

```python
a = ["사과", "배", "감", "수박", "딸기", "감"]
print(a.index("감"))
print(a.index("딸기"))
```

### INSERT()
리스트의 원하는 위치에 요소 삽입

insert(위치, 값)

```python
a = [1, 2, 3, 4, 5]
print(a)

a.insert(3, 4)
print(a)
```

### REMOVE()
- 리스트의 원하는 요소 제거

- 동일한 값이 있을 때, 첫 번째 값 제거

```python
a = [1, 2, 4, 7, 8, 2, 5]
print(a)

a.remove(2)
print(a)

a.remove(7)
print(a)
```

### POP()
리스트의 원하는 위치에 있는 요소 추출

```python
a = [1, 2, 3, 4, 5]
print(a)

b = a.pop(3)
print(a)
print(b)
```

### COUNT()
리스트에 있는 원하는 요소의 개수 세기

```python
a = [1, 5, 4, 2, 4, 2, 3, 2, 4, 5, 6, 7, 1]
print(a)

print(a.count(2))
```

### 리스트 요소 추가, 수정, 삭제
- 추가 : append()
- 수정 : 리스트 요소에 직접 접근하여 수정
- 삭제 : del

```python
a = [1, 2, 3, 4, 5]
print(a)

a.append(6)
print(a)

a[5] = 7
print(a)

del a[5]
print(a)
```

### 튜플 자료형(tuple)
리스트와 마찬가지로, 모든 자료형을 담을 수 있는 자료형 튜플은 한 번 생성하면 값의 변경, 삭제가 불가능하다.
- Indexing
- Slicing
- 튜플 더하기
- 튜플 곱하기
- LEN() 함수
- 위의 기능만 사용 가능

```python
t1 = (1, 2, 3, ('I', 'like', 'Python', ('e', 'f', 'g')))
print(t1)

#요소가 하나인 튜플
t2 = (2,)
print(t2)

#튜플 생성 시 괄호 생략 가능
t3 = 1, 2, 3
print(t3)
```

### 불 자료형(BOOL)
True(참), False(거짓) 값만 갖는 자료형

```python
a = True
b = False

print(type(a))
print(type(b))
print(a)
print(b)
```

### 비교 연산자
값의 비교를 통해 True, False의 값을 얻을 수 있는 연산자

- a == b a와 b가 같다
- a != b a와 b가 다르다
- a > b a가 b보다 크다
- a < b a가 b보다 작다
- a <= b a가 b보다 작거나 같다
- a >= b a가 b보다 크거나 같다

```python
x = 1
y = 2

print("x==y: "+str(x == y))
print("x!=y: "+str(x != y))
print("x>y: "+str(x > y))
print("x<y: "+str(x < y))
print("x<=y: "+str(x <= y))
print("x>=y: "+str(x >= y))
```

### 논리 연산자
논리 연산시 사용하는 연산자

- and
- or
- not

```python
a = True
b = False

print("True and True: "+str(a and a))
print("True and False: "+str(a and b))
print("False and True: "+str(b and a))
print("False and False: "+str(b and b))

print("True or True: "+str(a or a))
print("True or False: "+str(a or b))
print("False or True: "+str(b or a))
print("False or False: "+str(b or b))

# not 연산자
print("not True: "+str(not a))
print("not False: "+str(not b))
```

### 딕셔너리 자료형
사전, key와 value를 한 쌍으로 가지는 자료형

- Key를 통해서 Value 값에 접근
- 순서가 없기 때문에, Indexing 및 Slicing이 불가능
- Key값은 고유한 값이므로 중복 불가

```python
dic1 = {'a': 'alpha', 'b': 'beta', 'g': 'gamma'}
dic2 = {1 : 'hello', 2 : [4, 5, 6], '3' : 9}

print(dic1)
print(dic2)
```

### 딕셔너리 요소 추가 및 삭제


추가
- 변수명[Key] = Value


삭제
- del 변수명[Key]

```python
dic = {1 : 'one', 2 : 'two'}
print(dic)

dic[3] = 'three'
print(dic)

del dic[1]
print(dic)

print(dic[2])

test_dic = {1:'one', 2:'two', 2:'둘', 3:'셋', 3:'three', 3:'삼'}
print(test_dic)
```

### 딕셔너리 관련 함수
- keys() : key 리스트 만들기
- values() : value 리스트 만들기
- items() : key, value 쌍 리스트 얻기 (튜플형식)
- clear() : 딕셔너리 초기화
- get() : key값을 통해 value값 얻기
- in : key가 딕셔너리에 있는지 찾아보기(true, false)

```python
dic = {'사과': 'apple', '바나나': 'banana', '메론': 'melon'}
print(dic.keys())
print(dic.values())
print(dic.items())

print(dic.get('바나나'))
print('사과' in dic)
print('수박' in dic)

dic.clear()
print(dic)
```

