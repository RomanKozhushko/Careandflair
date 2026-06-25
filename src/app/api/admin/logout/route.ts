import { adminAuthCookieName } from "@/admin/auth";

export const runtime = "nodejs";

export async function POST() {
  const secure = process.env.NODE_ENV === "production" ? "; Secure" : "";

  return new Response(JSON.stringify({ success: true }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      "Set-Cookie": `${adminAuthCookieName}=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0${secure}`,
    },
  });
}
