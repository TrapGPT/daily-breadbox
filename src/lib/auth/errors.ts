export type AuthFormState = {
  error: string | null;
  success: string | null;
};

export const initialAuthFormState: AuthFormState = {
  error: null,
  success: null,
};

export function mapAuthError(message: string | undefined): string {
  if (!message) {
    return "Something went wrong. Please try again.";
  }
  const lower = message.toLowerCase();
  if (lower.includes("invalid login credentials")) {
    return "Email or password is incorrect.";
  }
  if (lower.includes("user already registered")) {
    return "An account with this email already exists. Try logging in.";
  }
  if (lower.includes("password should be at least")) {
    return "Password must be at least 6 characters.";
  }
  if (lower.includes("email not confirmed")) {
    return "Confirm your email before signing in (check your inbox).";
  }
  if (lower.includes("rate limit")) {
    return "Too many attempts. Wait a moment and try again.";
  }
  return message;
}
