-- Task 1.5: 자동 리셋 스케줄러 설정
-- 매일 한국시간 00:00 (UTC 15:00)에 사용량 리셋

-- pg_cron 확장 활성화 (Supabase에서 기본 제공)
CREATE EXTENSION IF NOT EXISTS pg_cron;

-- 기존 cron job이 있다면 삭제
SELECT cron.unschedule('reset-daily-usage') WHERE EXISTS (
  SELECT 1 FROM cron.job WHERE jobname = 'reset-daily-usage'
);

-- 매일 한국시간 00:00 (UTC 15:00)에 실행되는 cron job 생성
SELECT cron.schedule(
  'reset-daily-usage',           -- job 이름
  '0 15 * * *',                  -- 매일 UTC 15:00 (KST 00:00)
  $$
  UPDATE users
  SET message_count = 0,
      last_reset_at = NOW(),
      updated_at = NOW()
  WHERE message_count > 0;
  $$
);

-- 코멘트
COMMENT ON EXTENSION pg_cron IS '매일 자정 사용량 자동 리셋';
