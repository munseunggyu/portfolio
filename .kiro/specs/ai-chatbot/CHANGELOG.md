# 변경 이력

## 2025-11-06

### 리팩토링: 사용자 핑거프린트 로직 분리

**변경 사항:**

- `generateFingerprint`와 `getOrCreateUser` 함수를 `src/lib/user-fingerprint.ts`로 분리
- `/api/chat`와 `/api/chat/usage`에서 중복 코드 제거
- 재사용 가능한 공통 유틸리티로 변경

**영향받는 파일:**

- 신규: `src/lib/user-fingerprint.ts`
- 수정: `src/app/api/chat/route.ts`
- 수정: `src/app/api/chat/usage/route.ts`

**이유:**

- 코드 중복 제거
- 유지보수성 향상
- 단일 책임 원칙 준수

---

### 개선: 대화 로그 저장 방식 변경

**변경 사항:**

- 기존: user와 assistant 메시지를 각각 별도 row로 저장
- 변경: 질문과 응답을 하나의 대화 쌍으로 저장
- `saveChatLog` → `saveConversation` 함수명 변경
- `chat_logs` 테이블 스키마 변경:
  - 기존: `role` (TEXT), `content` (TEXT)
  - 변경: `user_question` (TEXT), `ai_response` (TEXT)

**영향받는 파일:**

- 수정: `src/app/api/chat/route.ts`
- 신규: `supabase/migrations/update_chat_logs_to_conversation_pairs.sql`
- 수정: `.kiro/specs/ai-chatbot/design.md`
- 수정: `.kiro/specs/ai-chatbot/requirements.md`

**이유:**

- 대화 분석 시 질문-응답 쌍을 한 번에 확인 가능
- 데이터 구조가 더 직관적
- 쿼리 성능 향상 (JOIN 불필요)

**마이그레이션:**
Supabase 대시보드에서 다음 SQL 실행 필요:

```sql
-- supabase/migrations/update_chat_logs_to_conversation_pairs.sql 참조
```

---

---

### 리팩토링: 컴포넌트 구조 개선 및 유틸리티 분리

**변경 사항:**

- `ChatbotMessageList` 컴포넌트 분리
  - 기존: `ChatbotWindow`에서 메시지 목록 렌더링
  - 변경: 독립적인 `ChatbotMessageList` 컴포넌트로 분리
  - 책임: 메시지 목록, 환영 메시지, 빠른 답변 버튼, 로딩/에러 표시, 자동 스크롤
- `extractTextFromMessage` 함수 분리
  - 위치: `src/lib/extract-text-from-message.ts`
  - UIMessage에서 텍스트 추출하는 공통 유틸리티
  - 사용처: `/api/chat`, `ChatbotMessageList`

**영향받는 파일:**

- 신규: `src/components/chatbot/ChatbotMessageList.tsx`
- 신규: `src/lib/extract-text-from-message.ts`
- 수정: `src/components/chatbot/ChatbotWindow.tsx`
- 수정: `src/app/api/chat/route.ts`
- 수정: `.kiro/specs/ai-chatbot/design.md`

**이유:**

- 단일 책임 원칙 준수
- 컴포넌트 재사용성 향상
- 코드 가독성 및 유지보수성 개선
- 관심사 분리 (UI 렌더링 vs 상태 관리)

---

## 향후 계획

- [ ] 대화 분석 대시보드 구현
- [ ] 자주 묻는 질문(FAQ) 자동 생성
- [ ] 대화 품질 평가 시스템
