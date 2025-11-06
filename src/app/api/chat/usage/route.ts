import { generateFingerprint, getOrCreateUser } from "@/lib/user-fingerprint";

// 상수
const MESSAGE_LIMIT = 3;

/**
 * GET /api/chat/usage
 * 현재 사용량 조회
 * Task 7.1
 */
export async function GET(req: Request) {
  try {
    // 사용자 핑거프린트 생성
    const fingerprint = generateFingerprint(req);

    // 사용자 조회 또는 생성
    const user = await getOrCreateUser(fingerprint);

    if (!user) {
      return new Response(JSON.stringify({ error: "사용자 정보를 가져올 수 없습니다." }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }

    // 다음 리셋 시간 계산 (다음 날 00:00 KST)
    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);

    // UsageInfo 형식으로 응답
    const usageInfo = {
      current: user.message_count,
      limit: MESSAGE_LIMIT,
      remaining: MESSAGE_LIMIT - user.message_count,
      resetAt: tomorrow.toISOString(),
    };

    return new Response(JSON.stringify(usageInfo), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("❌ Usage API Error:", error);
    return new Response(JSON.stringify({ error: "사용량 정보를 가져올 수 없습니다." }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
