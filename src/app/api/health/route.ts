import { isSupabaseConfigured } from "@/lib/supabase/env";

export async function GET() {
  return Response.json({
    status: "ok",
    service: "daily-breadbox",
    build: process.env.VERCEL_GIT_COMMIT_SHA?.slice(0, 7) ?? "local",
    supabase: isSupabaseConfigured() ? "configured" : "missing_env",
  });
}
