---
layout: post
title: "머신러닝: 11. finaltest"
date: 2026-06-24
permalink: /ml/11-finaltest/
---

```python
import pandas as pd
import numpy as np
import joblib  # 모델 저장 및 로드용
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.ensemble import RandomForestClassifier  # 기본 성능이 우수한 모델 추천
from sklearn.metrics import classification_report

# =================================================================
# [1단계] 데이터 로드 및 5개 Feature 선택/조합
# =================================================================
# 1. 데이터 불러오기
train_df = pd.read_csv('train.csv')

# 2. 10개 중 5개 Feature 선정 (★시험 데이터 컬럼명에 맞게 반드시 수정!)
# TIP: 새로운 컬럼을 조합(예: feature_1 + feature_2)하더라도 최종적으로 5개만 남기면 됩니다.
selected_features = ['feature_1', 'feature_2', 'feature_3', 'feature_4', 'feature_5']
target_column = 'target'  # 예측해야 하는 정답(Label) 컬럼명

X = train_df[selected_features]
y = train_df[target_column]

# (옵션) 데이터 전처리 - 스케일링 (안정적인 모델 학습을 위해 권장)
scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)

# 💡 macro avg f1-score를 높이기 위해 클래스 비율을 맞춰 분할(stratify)
X_train, X_val, y_train, y_val = train_test_split(
    X_scaled, y, test_size=0.2, random_state=42, stratify=y
)


# =================================================================
# [2단계 & 3단계] 5개 Feature로 모델 학습 및 최적 모델 저장
# =================================================================
print("정적 모델 학습 및 검증 시작...")

# macro avg f1을 높이기 위해 class_weight='balanced' 옵션 추가
model = RandomForestClassifier(n_estimators=100, max_depth=10, class_weight='balanced', random_state=42)
model.fit(X_train, y_train)

# 내부 검증 점수 확인 (macro avg f1-score 확인용)
val_preds = model.predict(X_val)
print("\n[내부 검증 결과 - macro avg 점수를 확인하세요]")
print(classification_report(y_val, val_preds)) 

# 최적 모델과 전처리 스케일러를 파일로 따로 저장 (4번 조건을 위한 준비)
joblib.dump(model, 'best_model.pkl')
joblib.dump(scaler, 'scaler.pkl')
print("📌 최적 모델 및 스케일러 저장 완료!\n")


# =================================================================
# [4단계] 실시간 테스트 데이터 실행을 위한 환경 미리 구축 (★매우 중요★)
# =================================================================
# 5번 단계에서 테스트 데이터를 받자마자 즉시 구동할 수 있도록 함수 형태로 구축합니다.
def run_realtime_inference(test_data_path):
    """
    실시간으로 받은 테스트 데이터를 로드하여 예측값(Prediction)을 반환하는 함수
    """
    try:
        # 1. 저장된 모델 및 스케일러 불러오기
        loaded_scaler = joblib.load('scaler.pkl')
        loaded_model = joblib.load('best_model.pkl')
        
        # 2. 테스트 데이터 로드
        test_df = pd.read_csv(test_data_path)
        
        # 3. 학습 때와 똑같은 5개 Feature 추출
        X_test = test_df[selected_features]
        
        # 4. 학습할 때 사용한 스케일러 기준으로 변환 (fit_transform이 아닌 transform 필수)
        X_test_scaled = loaded_scaler.transform(X_test)
        
        # 5. 예측 수행
        predictions = loaded_model.predict(X_test_scaled)
        
        print(f"🎯 {test_data_path} 예측 성공! 데이터 수: {len(predictions)}개")
        return predictions

    except Exception as e:
        print(f"❌ 환경 구동 중 에러 발생 (조건/컬럼명 확인 필요): {e}")
        return None

print("🚀 1~4번 준비 완료! 테스트 데이터를 받으면 아래 5번 코드를 실행하세요.")
```


```python
# =================================================================
# [5단계] 실시간 테스트 데이터 수령 시 구동 (주석 해제 후 즉시 실행)
# =================================================================
# test_predictions = run_realtime_inference('test.csv') # 제공받은 테스트 파일명으로 입력
# print(test_predictions)
```
