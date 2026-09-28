const AUTH_ENTRY_PATHS = ["/login", "/signup", "/forgot-password"] as const;

export function isProtectedAppPath(pathname: string): boolean {
  return pathname === "/app" || pathname.startsWith("/app/");
}

export function isAuthEntryPath(pathname: string): boolean {
  return AUTH_ENTRY_PATHS.some(
    (path) => pathname === path || pathname.startsWith(`${path}/`),
  );
}

export function sanitizeNextPath(raw: string | null | undefined): string {
  if (!raw || !raw.startsWith("/") || raw.startsWith("//")) {
    return "/app";
  }
  if (isAuthEntryPath(raw) || raw.startsWith("/auth/")) {
    return "/app";
  }
  return raw;
}
