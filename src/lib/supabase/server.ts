import { createClient } from "@supabase/supabase-js";

/**
 * 서버 사이드에서 사용할 Supabase 클라이언트
 * Service Role Key 사용 (모든 권한, RLS 우회)
 *
 * ⚠️ 주의: 이 클라이언트는 절대 클라이언트 사이드에 노출되어서는 안 됩니다!
 * API 라우트나 서버 컴포넌트에서만 사용하세요.
 */
export const supabaseServer = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  }
);
