"use client";

import { useActionState } from "react";

import { resetPasswordAction } from "@/app/auth/actions";
import { initialAuthFormState } from "@/lib/auth/errors";
import { AuthAlert } from "@/components/auth/auth-alert";
import { SubmitButton } from "@/components/auth/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function ResetPasswordForm() {
  const [state, formAction] = useActionState(
    resetPasswordAction,
    initialAuthFormState,
  );

  return (
    <form action={formAction} className="flex flex-col gap-4">
      {state.error ? <AuthAlert variant="error">{state.error}</AuthAlert> : null}
      <div className="space-y-2">
        <Label htmlFor="password">New password</Label>
        <Input
          id="password"
          name="password"
          type="password"
          autoComplete="new-password"
          minLength={8}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="confirm_password">Confirm password</Label>
        <Input
          id="confirm_password"
          name="confirm_password"
          type="password"
          autoComplete="new-password"
          minLength={8}
          required
        />
      </div>
      <SubmitButton pendingLabel="Updating…">Update password</SubmitButton>
    </form>
  );
}
