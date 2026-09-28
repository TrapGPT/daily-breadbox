import Link from "next/link";

import { AuthShell } from "@/components/auth/auth-shell";
import { ResetPasswordForm } from "@/components/auth/reset-password-form";
import { AuthAlert } from "@/components/auth/auth-alert";
import { Button } from "@/components/ui/button";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/env";

export default async function ResetPasswordPage() {
  if (!isSupabaseConfigured()) {
    return (
      <AuthShell title="Set new password">
        <AuthAlert variant="error">
          Supabase is not configured. Add keys to <code>.env.local</code>.
        </AuthAlert>
      </AuthShell>
    );
  }

  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return (
      <AuthShell title="Set new password">
        <AuthAlert variant="error">
          Open the reset link from your email in this browser, or request a new
          link.
        </AuthAlert>
        <Link href="/forgot-password">
          <Button variant="secondary" className="w-full">
            Request reset link
          </Button>
        </Link>
      </AuthShell>
    );
  }

  return (
    <AuthShell title="Set new password" subtitle={`Signed in as ${user.email}`}>
      <ResetPasswordForm />
    </AuthShell>
  );
}
