"use client";

import Link from "next/link";
import { useActionState } from "react";

import { forgotPasswordAction } from "@/app/auth/actions";
import { initialAuthFormState } from "@/lib/auth/errors";
import { AuthAlert } from "@/components/auth/auth-alert";
import { SubmitButton } from "@/components/auth/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function ForgotPasswordForm() {
  const [state, formAction] = useActionState(
    forgotPasswordAction,
    initialAuthFormState,
  );

  return (
    <form action={formAction} className="flex flex-col gap-4">
      {state.error ? <AuthAlert variant="error">{state.error}</AuthAlert> : null}
      {state.success ? (
        <AuthAlert variant="success">{state.success}</AuthAlert>
      ) : null}
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" name="email" type="email" autoComplete="email" required />
      </div>
      <SubmitButton pendingLabel="Sending…">Send reset link</SubmitButton>
      <Link
        href="/login"
        className="text-center text-sm font-medium text-bread-gold hover:underline"
      >
        Back to log in
      </Link>
    </form>
  );
}
