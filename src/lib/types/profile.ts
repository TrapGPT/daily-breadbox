export type Profile = {
  id: string;
  auth_user_id: string;
  display_name: string | null;
  email: string | null;
  avatar_url: string | null;
  timezone: string;
  preferred_currency: string;
  onboarding_complete: boolean;
  created_at: string;
  updated_at: string;
};
