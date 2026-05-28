---
layout: post
title: "LangChain 핵심 정리"
date: 2026-05-28
category: Python Programing Study
---

# LangChain 핵심 정리

## LangChain이란?

**LangChain(랭체인)**은 LLM(Large Language Model)과 외부 데이터, API, 시스템을 효율적으로 **연결(Chain)**하여 가치 있는 애플리케이션을 만들 수 있도록 돕는 **오픈소스 개발 프레임워크**이다.

### 왜 LangChain을 사용해야 할까?
기존의 LLM은 단독으로 사용 시 다음과 같은 한계가 있음.
1. **최신 정보의 부재** (학습 데이터의 한계)
2. **컨텍스트 유지 불가능** (이전 대화를 기억하지 못함)
3. **독립적인 작업 수행** (단일 프롬프트 외에 복잡한 비즈니스 로직 수행 불가)

LangChain은 이러한 한계를 극복하고, LLM에 **데이터 검색(RAG), 메모리, 에이전트 기능**을 결합하여 강력한 AI 서비스를 쉽게 구현할 수 있도록 지원함.

---

## 5대 모듈 (Core Modules)

LangChain은 컴포넌트 기반으로 설계되어 필요한 모듈을 사슬(Chain)처럼 조립하여 사용할 수 있음.

### 1. Model I/O (모델 입력/출력)
* **개념:** 다양한 LLM(OpenAI, Claude, Gemini, Ollama 등)을 일관된 인터페이스로 호출하고 관리함.
* **주요 기능:**
  * **Prompts:** 효율적인 프롬프트 관리를 위한 템플릿화. (`PromptTemplate`)
  * **Language Models:** 일관된 인터페이스를 통한 모델 전환.
  * **Output Parsers:** LLM의 텍스트 출력을 JSON, 리스트, Pydantic 객체 등 원하는 구조화된 데이터로 변환.

### 2. Retrieval (데이터 검색 / RAG)
* **개념:** LLM이 학습하지 않은 외부 데이터(회사 문서, PDF, DB 등)를 찾아내어 답변에 활용(Retrieval-Augmented Generation)하도록 도움.
* **파이프라인:** 
  `Document Loaders` (문서 로드) -> `Text Splitters` (텍스트 분할) -> `Text Embedding Models` (벡터화) -> `Vector Stores` (벡터 저장소 저장) -> `Retrievers` (관련 정보 검색)

#### <font color="yellow">임베딩(Embedding)과 벡터화</font>
RAG 파이프라인에서 가장 중요한 핵심 기술은 텍스트를 **임베딩(Embedding)**하는 과정임.

1. **의미론적 공간 매핑:** 컴퓨터는 텍스트를 그대로 이해하지 못하므로 숫자의 배열(Vector)로 바꿔야 함. 임베딩 모델은 단어나 문장의 **'실제 의미'**를 분석하여 고차원 공간의 좌표로 변환해줌.
2. **유사도 검색 (Similarity Search):** 의미가 유사한 텍스트일수록 벡터 공간 안에서 가까운 거리에 위치하게 됨. (예: '자동차'와 '차량'은 글자는 다르지만 임베딩 벡터 공간에서는 매우 가까운 거리에 위치함)
3. **LangChain의 지원:** OpenAI, HuggingFace, Cohere 등 다양한 환경의 임베딩 API를 코드 한 줄로 쉽게 전환할 수 있는 표준화된 wrapper 클래스를 제공하여 개발 생산성을 높여줌.

### 3. Chains (체인)
* **개념:** 여러 개의 컴포넌트(프롬프트, 모델, 리트리버 등)를 하나의 워크플로우로 묶어주는 핵심 논리 단위임.
* **LCEL (LangChain Expression Language):** 선언형 스타일로 복잡한 체인을 쉽게 가독성 높게 코딩할 수 있도록 지원하는 LangChain의 표준 문법. (`chain = prompt | model | output_parser`)

### 4. Memory (메모리)
* **개념:** 상태가 없는(Stateless) LLM에게 이전 대화 내용을 기억할 수 있는 상태(State)를 부여함.
* **주요 방식:**
  * 대화 전체를 기억하는 방식 (`ConversationBufferMemory`)
  * 이전 대화를 요약해서 기억하는 방식 (`ConversationSummaryMemory`)

### 5. Agents & Tools (에이전트와 도구)
* **개념:** LLM이 스스로 판단하여 문제를 해결하기 위해 어떤 **도구(Tool)**를 어떤 순서로 사용할지 결정하는 기능.
* **활용:** 사용자의 질문에 따라 "웹 검색", "수학 계산기", "DB 조회" 등의 도구를 AI가 능동적으로 선택하여 실행함.

---

## LangChain의 활용 케이스

* **RAG 기반 사내 문서 Q&A 챗봇:** PDF나 Notion 페이지를 기반으로 정확한 답변을 제공하는 AI 비서
* **AI Agent 기반 데이터 분석가:** 웹 크롤링, SQL 정생성 및 실행을 스스로 판단하여 수행하는 자동화 에이전트
* **콘텐츠 자동 생성 파이프라인:** 트렌드 키워드 검색부터 초안 작성, 번역, 검수까지 한 번에 수행하는 체인 구축

---
