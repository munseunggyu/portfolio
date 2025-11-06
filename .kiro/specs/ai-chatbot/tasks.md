# 구현 계획

## 1. Supabase 데이터베이스 설정

- [ ] 1.1 Supabase 프로젝트 생성 및 환경 변수 설정
  - Supabase 프로젝트 생성
  - `.env.local`에 환경 변수 추가 (NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY, SUPABASE_SERVICE_ROLE_KEY)
  - _요구사항: 12.6_

- [ ] 1.2 users 테이블 생성
  - SQL 마이그레이션 실행하여 users 테이블 생성
  - fingerprint, message_count, last_reset_at, created_at, updated_at 컬럼 포함
  - fingerprint에 UNIQUE 제약조건 추가
  - 인덱스 생성 (fingerprint, last_reset_at)
  - _요구사항: 12.7_

- [ ] 1.3 chat_logs 테이블 생성
  - SQL 마이그레이션 실행하여 chat_logs 테이블 생성
  - user_id, role, content, created_at 컬럼 포함
  - user_id에 외래 키 제약조건 추가 (users.id 참조, ON DELETE CASCADE)
  - role에 CHECK 제약조건 추가 ('user', 'assistant'만 허용)
  - 인덱스 생성 (user_id, created_at)
  - _요구사항: 12.1, 12.2, 12.3_

- [ ] 1.4 Row Level Security (RLS) 정책 설정
  - users 테이블에 RLS 활성화
  - chat_logs 테이블에 RLS 활성화
  - 서버 전용 접근 정책 설정
  - _요구사항: 12.4_

- [ ] 1.5 자동 리셋 스케줄러 설정
  - pg_cron 확장 활성화
  - 매일 한국시간 00:00 (UTC 15:00)에 실행되는 cron job 생성
  - message_count를 0으로 리셋하는 SQL 작성
  - _요구사항: 11.6_

## 2. Supabase 클라이언트 설정

- [ ] 2.1 Supabase 패키지 설치
  - `pnpm add @supabase/supabase-js` 명령어로 패키지 설치
  - _요구사항: 12.4_

- [ ] 2.2 Supabase 유틸리티 파일 생성
  - `src/lib/supabase/client.ts` 파일 생성 (클라이언트용, Anon Key 사용)
  - `src/lib/supabase/server.ts` 파일 생성 (서버용, Service Role Key 사용)
  - _요구사항: 12.4_

## 3. API 라우트 업데이트 - 사용자 식별 및 사용량 제한

- [ ] 3.1 사용자 핑거프린트 생성 함수 구현
  - IP 주소와 User Agent를 조합하여 SHA-256 해시 생성
  - `generateFingerprint(req: Request)` 함수 작성
  - _요구사항: 11.1, 11.2_

- [ ] 3.2 사용자 조회 또는 생성 함수 구현
  - Supabase에서 fingerprint로 사용자 조회
  - 사용자가 없으면 새로 생성
  - 24시간 경과 시 자동 리셋 로직 포함
  - `getOrCreateUser(fingerprint: string)` 함수 작성
  - _요구사항: 11.6, 11.7_

- [ ] 3.3 사용량 확인 및 증가 함수 구현
  - 현재 사용량 확인
  - 제한(3회) 초과 여부 검증
  - 사용량 증가 (message_count + 1)
  - `checkAndIncrementUsage(userId: string)` 함수 작성
  - _요구사항: 11.3, 11.7_

- [ ] 3.4 대화 로그 저장 함수 구현
  - chat_logs 테이블에 메시지 저장
  - 저장 실패 시 에러 로깅만 하고 챗봇은 계속 작동
  - `saveChatLog(userId: string, role: string, content: string)` 함수 작성
  - _요구사항: 12.1, 12.2, 12.5_

## 4. API 라우트 업데이트 - 메인 플로우 통합

- [ ] 4.1 POST 핸들러에 사용자 식별 로직 추가
  - 요청에서 사용자 핑거프린트 생성
  - 사용자 조회 또는 생성
  - _요구사항: 11.1, 11.2_

- [ ] 4.2 POST 핸들러에 사용량 제한 로직 추가
  - 사용량 확인 및 증가
  - 제한 초과 시 429 상태 코드와 에러 메시지 반환
  - _요구사항: 11.3, 11.4, 11.5_

- [ ] 4.3 POST 핸들러에 대화 로그 저장 로직 추가
  - 사용자 메시지 저장
  - AI 응답 저장 (onFinish 콜백 사용)
  - _요구사항: 12.1, 12.2, 12.3_

- [ ] 4.4 에러 처리 개선
  - Supabase 연결 실패 시 처리
  - 사용자 식별 실패 시 처리
  - _요구사항: 12.5_

## 5. UsageIndicator 컴포넌트 구현

- [ ] 5.1 UsageIndicator 컴포넌트 생성
  - `src/components/chatbot/UsageIndicator.tsx` 파일 생성
  - current, limit props 받기
  - 남은 횟수 계산 및 표시
  - _요구사항: 13.1, 13.2_

- [ ] 5.2 UsageIndicator 스타일링
  - 남은 횟수에 따른 색상 변경 (정상/경고)
  - text-sm 크기 적용
  - _요구사항: 13.3_

## 6. ChatbotWindow 컴포넌트 업데이트

- [ ] 6.1 사용량 정보 상태 추가
  - 현재 사용량과 제한 정보를 저장할 상태 추가
  - API 응답에서 사용량 정보 추출
  - _요구사항: 13.4_

- [ ] 6.2 UsageIndicator 컴포넌트 통합
  - ChatbotWindow에 UsageIndicator 추가
  - 헤더 또는 입력 필드 상단에 배치
  - _요구사항: 13.1_

- [ ] 6.3 대화 창 열릴 때 사용량 확인
  - 초기 로드 시 현재 사용량 조회 API 호출
  - _요구사항: 13.5_

- [ ] 6.4 제한 도달 시 UI 업데이트
  - 입력 필드 비활성화
  - 제한 도달 메시지 표시
  - _요구사항: 11.4, 11.5_

## 7. 사용량 조회 API 엔드포인트 생성

- [ ] 7.1 GET /api/chat/usage 엔드포인트 생성
  - 사용자 핑거프린트 생성
  - Supabase에서 현재 사용량 조회
  - UsageInfo 형식으로 응답 반환
  - _요구사항: 13.4, 13.5_

## 8. 타입 정의 추가

- [ ] 8.1 UsageInfo 타입 정의
  - `src/lib/types.ts`에 UsageInfo 인터페이스 추가
  - current, limit, remaining, resetAt 필드 포함
  - _요구사항: 13.4_

- [ ] 8.2 ChatResponse 타입 정의
  - `src/lib/types.ts`에 ChatResponse 인터페이스 추가
  - message, usage, error 필드 포함
  - _요구사항: 12.4_

## 9. 환영 메시지 업데이트

- [ ] 9.1 환영 메시지에 사용량 제한 안내 추가
  - "챗봇은 최대 3회까지 질문에 답변드리며..." 문구 포함
  - _요구사항: 11.3_

## 10. 테스트 및 검증

- [ ] 10.1 사용량 제한 기능 테스트
  - 3번 질문 후 제한 확인
  - 제한 도달 시 입력 필드 비활성화 확인
  - 제한 도달 메시지 표시 확인
  - _요구사항: 11.3, 11.4, 11.5_

- [ ] 10.2 Supabase 데이터 저장 테스트
  - 질문/응답이 chat_logs 테이블에 저장되는지 확인
  - users 테이블에 사용자가 생성되는지 확인
  - message_count가 증가하는지 확인
  - _요구사항: 12.1, 12.2, 12.3_

- [ ] 10.3 자동 리셋 스케줄러 테스트
  - pg_cron job이 정상 실행되는지 확인
  - 매일 00:00 이후 사용량이 0으로 리셋되는지 확인
  - _요구사항: 11.6_

- [ ] 10.4 시크릿 모드 테스트
  - 일반 브라우저에서 3번 질문
  - 시크릿 모드에서 접속 시 동일하게 제한되는지 확인
  - _요구사항: 11.1, 11.2_

- [ ] 10.5 남은 횟수 UI 테스트
  - 메시지 전송 시 남은 횟수 업데이트 확인
  - 남은 횟수 0일 때 경고 스타일 확인
  - _요구사항: 13.1, 13.2, 13.3_
