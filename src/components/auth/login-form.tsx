"use client";

import Link from "next/link";
import { useActionState } from "react";

import { signInAction } from "@/app/auth/actions";
import { initialAuthFormState } from "@/lib/auth/errors";
import { AuthAlert } from "@/components/auth/auth-alert";
import { SubmitButton } from "@/components/auth/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function LoginForm({ nextPath }: { nextPath: string }) {
  const [state, formAction] = useActionState(signInAction, initialAuthFormState);

  return (
    <form action={formAction} className="flex flex-col gap-4">
      <input type="hidden" name="next" value={nextPath} />
      {state.error ? <AuthAlert variant="error">{state.error}</AuthAlert> : null}
      {state.success ? (
        <AuthAlert variant="success">{state.success}</AuthAlert>
      ) : null}
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" name="email" type="email" autoComplete="email" required />
      </div>
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="password">Password</Label>
          <Link
            href="/forgot-password"
            className="text-xs font-medium text-bread-gold hover:underline"
          >
            Forgot password?
          </Link>
        </div>
        <Input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
        />
      </div>
      <SubmitButton pendingLabel="Signing in…">Log in</SubmitButton>
      <p className="text-center text-sm text-box-brown/70">
        No account?{" "}
        <Link href="/signup" className="font-medium text-bread-gold hover:underline">
          Sign up
        </Link>
      </p>
    </form>
  );
}
