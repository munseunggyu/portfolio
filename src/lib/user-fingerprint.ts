import crypto from "crypto";
import { supabaseServer } from "@/lib/supabase/server";

/**
 * 사용자 핑거프린트 생성 (IP + User Agent → SHA-256)
 */
export function generateFingerprint(req: Request): string {
  const ip = req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || "unknown";
  const userAgent = req.headers.get("user-agent") || "unknown";

  return crypto.createHash("sha256").update(`${ip}-${userAgent}`).digest("hex");
}

/**
 * 사용자 조회 또는 생성
 * Supabase cron job이 매일 00:00에 자동으로 리셋하므로 애플리케이션에서는 체크 불필요
 */
export async function getOrCreateUser(fingerprint: string) {
  // 기존 사용자 조회
  const { data: existingUser } = await supabaseServer.from("users").select("*").eq("fingerprint", fingerprint).single();

  if (existingUser) {
    return existingUser;
  }

  // 새 사용자 생성
  const { data: newUser } = await supabaseServer
    .from("users")
    .insert({
      fingerprint,
      message_count: 0,
    })
    .select()
    .single();

  return newUser;
}
