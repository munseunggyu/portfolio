-- Task 1.3: chat_logs 테이블 생성
-- 대화 내용 저장

CREATE TABLE IF NOT EXISTS chat_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('user', 'assistant')),
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 인덱스 생성
CREATE INDEX IF NOT EXISTS idx_chat_logs_user_id ON chat_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_chat_logs_created_at ON chat_logs(created_at);

-- 코멘트 추가
COMMENT ON TABLE chat_logs IS '챗봇 대화 로그';
COMMENT ON COLUMN chat_logs.user_id IS '사용자 ID (users 테이블 참조)';
COMMENT ON COLUMN chat_logs.role IS '메시지 역할 (user 또는 assistant)';
COMMENT ON COLUMN chat_logs.content IS '메시지 내용';
