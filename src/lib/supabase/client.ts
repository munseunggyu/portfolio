import { createClient } from "@supabase/supabase-js";

/**
 * 클라이언트 사이드에서 사용할 Supabase 클라이언트
 * Anon Key 사용 (읽기 전용)
 */
export const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);
