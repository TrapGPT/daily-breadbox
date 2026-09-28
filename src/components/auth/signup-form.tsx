"use client";

import Link from "next/link";
import { useActionState } from "react";

import { signUpAction } from "@/app/auth/actions";
import { initialAuthFormState } from "@/lib/auth/errors";
import { AuthAlert } from "@/components/auth/auth-alert";
import { SubmitButton } from "@/components/auth/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function SignupForm() {
  const [state, formAction] = useActionState(signUpAction, initialAuthFormState);

  return (
    <form action={formAction} className="flex flex-col gap-4">
      {state.error ? <AuthAlert variant="error">{state.error}</AuthAlert> : null}
      {state.success ? (
        <AuthAlert variant="success">{state.success}</AuthAlert>
      ) : null}
      <div className="space-y-2">
        <Label htmlFor="display_name">Display name</Label>
        <Input
          id="display_name"
          name="display_name"
          autoComplete="name"
          placeholder="Optional"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" name="email" type="email" autoComplete="email" required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          name="password"
          type="password"
          autoComplete="new-password"
          minLength={8}
          required
        />
        <p className="text-xs text-box-brown/60">At least 8 characters.</p>
      </div>
      <SubmitButton pendingLabel="Creating account…">Create account</SubmitButton>
      <p className="text-center text-sm text-box-brown/70">
        Already have an account?{" "}
        <Link href="/login" className="font-medium text-bread-gold hover:underline">
          Log in
        </Link>
      </p>
    </form>
  );
}
