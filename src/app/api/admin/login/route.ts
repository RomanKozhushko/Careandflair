import { adminAuthCookieName, getAdminAuthToken, getAdminPassword } from "@/admin/auth";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const adminPassword = getAdminPassword();

  if (!adminPassword) {
    return Response.json({ success: false, error: "Admin password is not configured." }, { status: 423 });
  }

  const body = (await request.json().catch(() => null)) as { password?: string } | null;

  if (!body?.password || body.password !== adminPassword) {
    return Response.json({ success: false, error: "Invalid password." }, { status: 401 });
  }

  const secure = process.env.NODE_ENV === "production" ? "; Secure" : "";

  return new Response(JSON.stringify({ success: true }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      "Set-Cookie": `${adminAuthCookieName}=${getAdminAuthToken(adminPassword)}; Path=/; HttpOnly; SameSite=Lax; Max-Age=86400${secure}`,
    },
  });
}
