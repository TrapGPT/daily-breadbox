import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { isSupabaseConfigured } from "@/lib/supabase/env";

export default function Home() {
  const supabaseReady = isSupabaseConfigured();

  return (
    <div className="flex flex-1 flex-col">
      <header className="border-b border-box-brown/10 bg-cream/80 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
          <span className="text-lg font-semibold tracking-tight">
            Daily BreadBox
          </span>
          <nav className="flex items-center gap-2">
            <Link href="/login">
              <Button variant="ghost" size="sm">
                Log in
              </Button>
            </Link>
            <Link href="/signup">
              <Button size="sm">Sign up</Button>
            </Link>
          </nav>
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col justify-center gap-10 px-4 py-16">
        <div className="max-w-2xl space-y-4">
          <p className="text-sm font-medium uppercase tracking-widest text-growth-green">
            V1 foundation
          </p>
          <h1 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
            Make Moves. Make Bread. Know the Score.
          </h1>
          <p className="text-lg text-box-brown/80">
            TIME → MOVES → RESULTS → BREAD. Open the Box, run your day, close
            with a Bread Receipt, and repeat.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>BUILD 00 — Foundation</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-box-brown/80">
              <p>Next.js · TypeScript · Tailwind · component primitives</p>
              <p>
                Supabase env:{" "}
                <span
                  className={
                    supabaseReady
                      ? "font-medium text-growth-green"
                      : "font-medium text-burn"
                  }
                >
                  {supabaseReady ? "configured" : "add .env.local"}
                </span>
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Next Build Pack</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-box-brown/80">
              BUILD 01 — Authentication (signup, login, profile bootstrap).
              See{" "}
              <code className="rounded bg-cream-dark px-1.5 py-0.5 text-xs">
                docs/BUILD-PACKS.md
              </code>
              .
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
