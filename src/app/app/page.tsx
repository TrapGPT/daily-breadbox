import { signOutAction } from "@/app/auth/actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { requireUser } from "@/lib/auth/require-user";

export default async function AppHomePage() {
  const { user, profile } = await requireUser("/app");

  return (
    <main className="mx-auto flex w-full max-w-lg flex-1 flex-col gap-6 px-4 py-10">
      <div className="space-y-1">
        <p className="text-sm font-medium uppercase tracking-widest text-growth-green">
          BUILD 01
        </p>
        <h1 className="text-2xl font-bold">You&apos;re signed in</h1>
        <p className="text-sm text-box-brown/70">
          Account and BreadBox setup arrives in BUILD 02. This route confirms
          auth, session, and profile initialization.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Session</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <p>
            <span className="text-box-brown/60">User ID:</span>{" "}
            <code className="text-xs">{user.id}</code>
          </p>
          <p>
            <span className="text-box-brown/60">Email:</span> {user.email}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Profile</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          {profile ? (
            <>
              <p>
                <span className="text-box-brown/60">Display name:</span>{" "}
                {profile.display_name ?? "—"}
              </p>
              <p>
                <span className="text-box-brown/60">Timezone:</span>{" "}
                {profile.timezone}
              </p>
              <p>
                <span className="text-box-brown/60">Currency:</span>{" "}
                {profile.preferred_currency}
              </p>
              <p>
                <span className="text-box-brown/60">Onboarding:</span>{" "}
                {profile.onboarding_complete ? "complete" : "pending"}
              </p>
            </>
          ) : (
            <p className="text-burn">
              No profile row found. Apply the BUILD 01 Supabase migration and
              ensure the auth trigger is installed.
            </p>
          )}
        </CardContent>
      </Card>

      <form action={signOutAction}>
        <Button type="submit" variant="secondary" className="w-full">
          Log out
        </Button>
      </form>
    </main>
  );
}
