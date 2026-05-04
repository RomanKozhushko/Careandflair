import { createHash } from "crypto";
import type { NextApiRequest } from "next";

export const adminAuthCookieName = "care-flair-admin-auth";

export function getAdminPassword(): string | undefined {
  const password = process.env.ADMIN_PASSWORD?.trim();
  return password && password.length > 0 ? password : undefined;
}

export function getAdminAuthToken(password: string): string {
  return createHash("sha256").update(password).digest("hex");
}

export function isAdminTokenValid(token?: string | null): boolean {
  const password = getAdminPassword();
  return Boolean(password && token && token === getAdminAuthToken(password));
}

export function getCookieValue(cookieHeader: string | null, name: string): string | undefined {
  if (!cookieHeader) return undefined;

  return cookieHeader
    .split(";")
    .map((cookie) => cookie.trim())
    .find((cookie) => cookie.startsWith(`${name}=`))
    ?.slice(name.length + 1);
}

export function isAdminApiRequestAuthorized(req: NextApiRequest): boolean {
  return isAdminTokenValid(req.cookies?.[adminAuthCookieName]);
}

export function isAdminRouteRequestAuthorized(request: Request): boolean {
  return isAdminTokenValid(getCookieValue(request.headers.get("cookie"), adminAuthCookieName));
}
