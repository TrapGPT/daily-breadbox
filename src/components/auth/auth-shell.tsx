import Link from "next/link";
import type { ReactNode } from "react";

import { Button } from "@/components/ui/button";

export function AuthShell({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-1 flex-col">
      <header className="border-b border-box-brown/10">
        <div className="mx-auto flex max-w-md items-center justify-between px-4 py-4">
          <Link href="/" className="font-semibold tracking-tight">
            Daily BreadBox
          </Link>
          <Link href="/">
            <Button variant="ghost" size="sm">
              Home
            </Button>
          </Link>
        </div>
      </header>
      <main className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center gap-6 px-4 py-12">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold">{title}</h1>
          {subtitle ? (
            <p className="text-sm text-box-brown/70">{subtitle}</p>
          ) : null}
        </div>
        {children}
      </main>
    </div>
  );
}
