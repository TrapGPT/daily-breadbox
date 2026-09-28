"use server";

import { redirect } from "next/navigation";

import { authCallbackUrl } from "@/lib/auth/urls";
import { mapAuthError, type AuthFormState } from "@/lib/auth/errors";
import { sanitizeNextPath } from "@/lib/auth/routes";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/env";

function configErrorState(): AuthFormState {
  return {
    error:
      "Authentication is not configured. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.",
    success: null,
  };
}

export async function signUpAction(
  _prev: AuthFormState,
  formData: FormData,
): Promise<AuthFormState> {
  if (!isSupabaseConfigured()) return configErrorState();

  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const displayName = String(formData.get("display_name") ?? "").trim();

  if (!email || !password) {
    return { error: "Email and password are required.", success: null };
  }
  if (password.length < 8) {
    return {
      error: "Password must be at least 8 characters.",
      success: null,
    };
  }

  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: displayName ? { display_name: displayName } : undefined,
      emailRedirectTo: authCallbackUrl("/app"),
    },
  });

  if (error) {
    return { error: mapAuthError(error.message), success: null };
  }

  if (data.session) {
    redirect("/app");
  }

  return {
    error: null,
    success:
      "Account created. Check your email to confirm your address, then log in.",
  };
}

export async function signInAction(
  _prev: AuthFormState,
  formData: FormData,
): Promise<AuthFormState> {
  if (!isSupabaseConfigured()) return configErrorState();

  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const next = sanitizeNextPath(String(formData.get("next") ?? "/app"));

  if (!email || !password) {
    return { error: "Email and password are required.", success: null };
  }

  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    return { error: mapAuthError(error.message), success: null };
  }

  redirect(next);
}

export async function signOutAction(): Promise<void> {
  if (!isSupabaseConfigured()) {
    redirect("/");
  }
  const supabase = await createSupabaseServerClient();
  await supabase.auth.signOut();
  redirect("/login");
}

export async function forgotPasswordAction(
  _prev: AuthFormState,
  formData: FormData,
): Promise<AuthFormState> {
  if (!isSupabaseConfigured()) return configErrorState();

  const email = String(formData.get("email") ?? "").trim();
  if (!email) {
    return { error: "Email is required.", success: null };
  }

  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: authCallbackUrl("/reset-password"),
  });

  if (error) {
    return { error: mapAuthError(error.message), success: null };
  }

  return {
    error: null,
    success: "If an account exists for that email, a reset link is on its way.",
  };
}

export async function resetPasswordAction(
  _prev: AuthFormState,
  formData: FormData,
): Promise<AuthFormState> {
  if (!isSupabaseConfigured()) return configErrorState();

  const password = String(formData.get("password") ?? "");
  const confirm = String(formData.get("confirm_password") ?? "");

  if (!password || password.length < 8) {
    return {
      error: "Password must be at least 8 characters.",
      success: null,
    };
  }
  if (password !== confirm) {
    return { error: "Passwords do not match.", success: null };
  }

  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return {
      error: "Reset link expired or invalid. Request a new reset email.",
      success: null,
    };
  }

  const { error } = await supabase.auth.updateUser({ password });
  if (error) {
    return { error: mapAuthError(error.message), success: null };
  }

  redirect("/app");
}
