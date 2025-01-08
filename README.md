# Character AI Hyungu

대화형 AI 캐릭터와 실시간으로 대화할 수 있는 웹 애플리케이션입니다.

## 주요 기능

- **AI 캐릭터와의 대화**: 다양한 역사적 인물, 예술가, 과학자 등과 실시간 대화
- **캐릭터 생성**: 자신만의 AI 캐릭터를 생성하고 커스터마이징
- **크레딧 시스템**: 대화에 사용되는 크레딧 관리 및 충전
- **실시간 채팅**: 실시간으로 업데이트되는 대화 인터페이스
- **반응형 디자인**: 모바일부터 데스크톱까지 최적화된 UI

## 기술 스택

- **Frontend**: React, TypeScript, Tailwind CSS
- **Backend**: Supabase (PostgreSQL, Authentication, Storage)
- **AI**: OpenAI GPT-4, DALL-E 3
- **Payment**: Stripe
- **Deployment**: Netlify

## 시작하기

1. 프로젝트 루트에 `.env` 파일을 생성하고 다음과 같이 환경 변수를 설정합니다:

```bash
# Supabase 설정
# Supabase 프로젝트의 URL
VITE_SUPABASE_URL=your_supabase_project_url
# Supabase 프로젝트의 anon/public 키
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

# OpenAI API 설정
# OpenAI API 키
VITE_OPENAI_API_KEY=your_openai_api_key

# Stripe 설정
# Stripe 공개 키 (pk_test_로 시작)
VITE_STRIPE_PUBLIC_KEY=your_stripe_public_key
# Stripe 비밀 키 (sk_test_로 시작)
VITE_STRIPE_SECRET_KEY=your_stripe_secret_key
# Stripe Webhook 시크릿 키
VITE_STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
```

2. 의존성 설치
```bash
npm install
```

3. 개발 서버 실행
```bash
npm run dev
```

## 주요 기능 설명

### 인증 시스템
- 이메일/비밀번호 기반 회원가입 및 로그인
- 비밀번호 재설정
- 이메일 인증

### 캐릭터 시스템
- 카테고리별 캐릭터 분류
- AI 이미지 생성을 통한 캐릭터 아바타 생성
- 캐릭터별 통계 (대화 수, 좋아요 수)

### 크레딧 시스템
- 메시지당 1크레딧 소비
- Stripe를 통한 크레딧 구매
- 크레딧 사용 내역 및 통계

### 실시간 채팅
- 스트리밍 방식의 실시간 응답
- 메시지 복사 및 좋아요 기능
- 대화 기록 저장 및 관리

## 데이터베이스 구조

### 주요 테이블
- `characters`: 캐릭터 정보
- `character_categories`: 캐릭터 카테고리
- `character_stats`: 캐릭터별 통계
- `chats`: 대화방 정보
- `messages`: 대화 메시지
- `user_credits`: 사용자 크레딧 정보
- `credit_transactions`: 크레딧 거래 내역
- `orders`: 결제 주문 정보
- `payments`: 결제 처리 정보

## 배포

Netlify를 통해 배포되며, 다음 기능을 제공합니다:
- 자동 빌드 및 배포
- Serverless Functions
- 환경 변수 관리
- Stripe Webhook 처리

## 라이선스

MIT License