import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function SignupPage() {
  return (
    <main className="mx-auto flex max-w-md flex-1 flex-col justify-center gap-6 px-4 py-16">
      <h1 className="text-2xl font-bold">Sign up</h1>
      <p className="text-box-brown/80">
        Account creation ships in BUILD 01 (Supabase Auth).
      </p>
      <Link href="/">
        <Button variant="secondary">Back home</Button>
      </Link>
    </main>
  );
}
