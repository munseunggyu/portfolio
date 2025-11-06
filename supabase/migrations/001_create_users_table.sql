-- Task 1.2: users 테이블 생성
-- 사용자 식별 및 사용량 추적

CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  fingerprint TEXT UNIQUE NOT NULL,  -- SHA-256 해시 (IP + User Agent)
  message_count INTEGER DEFAULT 0,   -- 현재 사용량
  last_reset_at TIMESTAMPTZ DEFAULT NOW(),  -- 마지막 리셋 시간
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 인덱스 생성
CREATE INDEX IF NOT EXISTS idx_users_fingerprint ON users(fingerprint);
CREATE INDEX IF NOT EXISTS idx_users_last_reset ON users(last_reset_at);

-- 코멘트 추가
COMMENT ON TABLE users IS '챗봇 사용자 식별 및 사용량 추적';
COMMENT ON COLUMN users.fingerprint IS 'IP + User Agent의 SHA-256 해시';
COMMENT ON COLUMN users.message_count IS '현재 사용량 (최대 3)';
COMMENT ON COLUMN users.last_reset_at IS '마지막 리셋 시간 (24시간 주기)';
