-- chat_logs 테이블 구조 변경: role/content → user_question/ai_response
-- 실행 전 주의: 기존 데이터가 있다면 백업을 권장합니다

-- 1. 기존 데이터 백업 (선택사항)
CREATE TABLE IF NOT EXISTS chat_logs_backup AS SELECT * FROM chat_logs;

-- 2. 새로운 컬럼 추가
ALTER TABLE chat_logs 
ADD COLUMN IF NOT EXISTS user_question TEXT,
ADD COLUMN IF NOT EXISTS ai_response TEXT;

-- 3. 기존 컬럼 삭제 (기존 데이터 확인 후 실행)
-- 주의: 기존 데이터가 있다면 먼저 마이그레이션 로직이 필요합니다
ALTER TABLE chat_logs 
DROP COLUMN IF EXISTS role,
DROP COLUMN IF EXISTS content;

-- 4. NOT NULL 제약조건 추가
ALTER TABLE chat_logs 
ALTER COLUMN user_question SET NOT NULL,
ALTER COLUMN ai_response SET NOT NULL;

-- 5. 컬럼 설명 추가
COMMENT ON COLUMN chat_logs.user_question IS '사용자 질문';
COMMENT ON COLUMN chat_logs.ai_response IS 'AI 응답';
