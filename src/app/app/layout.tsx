import { requireUser } from "@/lib/auth/require-user";

export default async function AppShellLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireUser("/app");
  return (
    <div className="flex min-h-full flex-1 flex-col bg-cream">{children}</div>
  );
}
