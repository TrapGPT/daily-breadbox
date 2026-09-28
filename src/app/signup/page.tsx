import { AuthShell } from "@/components/auth/auth-shell";
import { SignupForm } from "@/components/auth/signup-form";

export default function SignupPage() {
  return (
    <AuthShell
      title="Create account"
      subtitle="Create your Daily BreadBox login. Business setup continues in BUILD 02."
    >
      <SignupForm />
    </AuthShell>
  );
}
