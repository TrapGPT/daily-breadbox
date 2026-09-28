import { redirect } from "next/navigation";

import { sanitizeNextPath } from "@/lib/auth/routes";
import { getProfileForUser } from "@/lib/profiles/get-profile";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { Profile } from "@/lib/types/profile";
import type { User } from "@supabase/supabase-js";

export async function requireUser(nextPath = "/app"): Promise<{
  user: User;
  profile: Profile | null;
}> {
  if (!isSupabaseConfigured()) {
    redirect(`/login?error=config&next=${encodeURIComponent(nextPath)}`);
  }

  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    redirect(
      `/login?next=${encodeURIComponent(sanitizeNextPath(nextPath))}`,
    );
  }

  let profile: Profile | null = null;
  try {
    profile = await getProfileForUser(supabase, user.id);
  } catch {
    profile = null;
  }

  return { user, profile };
}
