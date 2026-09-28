import { AuthShell } from "@/components/auth/auth-shell";
import { LoginForm } from "@/components/auth/login-form";
import { AuthAlert } from "@/components/auth/auth-alert";
import { sanitizeNextPath } from "@/lib/auth/routes";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string; error?: string; msg?: string }>;
}) {
  const params = await searchParams;
  const nextPath = sanitizeNextPath(params.next);

  return (
    <AuthShell title="Log in" subtitle="Make Moves. Make Bread. Know the Score.">
      {params.error === "config" ? (
        <AuthAlert variant="error">
          Supabase is not configured. Add keys to <code>.env.local</code> and
          restart the dev server.
        </AuthAlert>
      ) : null}
      {params.error === "auth" && params.msg ? (
        <AuthAlert variant="error">{decodeURIComponent(params.msg)}</AuthAlert>
      ) : null}
      <LoginForm nextPath={nextPath} />
    </AuthShell>
  );
}
