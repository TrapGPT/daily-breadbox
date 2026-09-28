import { describe, expect, it } from "vitest";

import { mapAuthError } from "@/lib/auth/errors";

describe("mapAuthError", () => {
  it("maps known Supabase messages", () => {
    expect(mapAuthError("Invalid login credentials")).toBe(
      "Email or password is incorrect.",
    );
    expect(mapAuthError("User already registered")).toContain("already exists");
    expect(mapAuthError("Email not confirmed")).toContain("Confirm your email");
  });

  it("falls back to generic copy", () => {
    expect(mapAuthError(undefined)).toBe(
      "Something went wrong. Please try again.",
    );
    expect(mapAuthError("Custom server message")).toBe("Custom server message");
  });
});
