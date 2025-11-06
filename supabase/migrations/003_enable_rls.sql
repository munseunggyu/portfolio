-- Task 1.4: Row Level Security (RLS) 정책 설정
-- 서버 전용 접근 정책

-- users 테이블 RLS 활성화
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- chat_logs 테이블 RLS 활성화
ALTER TABLE chat_logs ENABLE ROW LEVEL SECURITY;

-- 코멘트
COMMENT ON TABLE users IS 'RLS 활성화: 서버 전용 접근 (Service Role Key 필요)';
COMMENT ON TABLE chat_logs IS 'RLS 활성화: 서버 전용 접근 (Service Role Key 필요)';
