# Python 딕셔너리(Dictionary) 가이드

## 딕셔너리 기본 사용법

### 딕셔너리 생성
```python
dic = {'사과': 'apple', '바나나': 'banana', '메론': 'melon'}
```

### 딕셔너리 키(keys) 조회
```python
print(dic.keys())
# 결과: dict_keys(['사과', '바나나', '메론'])
```

### 딕셔너리 값(values) 조회
```python
print(dic.values())
# 결과: dict_values(['apple', 'banana', 'melon'])
```

### 딕셔너리 키-값 쌍(items) 조회
```python
print(dic.items())
# 결과: dict_items([('사과', 'apple'), ('바나나', 'banana'), ('메론', 'melon')])
```

## 특정 값 조회 및 키 확인

### get() 메서드로 값 조회
```python
print(dic.get('바나나'))
# 결과: banana
```

### in 연산자로 키 존재 여부 확인
```python
print('사과' in dic)
# 결과: True

print('수박' in dic)
# 결과: False
```

## 딕셔너리 초기화

### clear() 메서드로 모든 항목 삭제
```python
dic.clear()
print(dic)
# 결과: {}
```

---

## 요약

| 메서드/연산자 | 설명 |
|---|---|
| `.keys()` | 모든 키 반환 |
| `.values()` | 모든 값 반환 |
| `.items()` | 모든 키-값 쌍 반환 |
| `.get(key)` | 특정 키의 값 조회 |
| `key in dict` | 키 존재 여부 확인 |
| `.clear()` | 딕셔너리 비우기 |
