import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

export function AuthAlert({
  variant,
  children,
}: {
  variant: "error" | "success";
  children: ReactNode;
}) {
  return (
    <div
      role="alert"
      className={cn(
        "rounded-xl border px-3 py-2 text-sm",
        variant === "error" &&
          "border-burn/30 bg-burn/5 text-burn",
        variant === "success" &&
          "border-growth-green/30 bg-growth-green/5 text-growth-green",
      )}
    >
      {children}
    </div>
  );
}
