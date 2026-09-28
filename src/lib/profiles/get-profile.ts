import type { SupabaseClient } from "@supabase/supabase-js";

import type { Profile } from "@/lib/types/profile";

export async function getProfileForUser(
  supabase: SupabaseClient,
  authUserId: string,
): Promise<Profile | null> {
  const { data, error } = await supabase
    .from("profiles")
    .select(
      "id, auth_user_id, display_name, email, avatar_url, timezone, preferred_currency, onboarding_complete, created_at, updated_at",
    )
    .eq("auth_user_id", authUserId)
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }
  return data as Profile | null;
}
