import { afterEach, describe, expect, it, vi } from "vitest";

import { authCallbackUrl, getSiteUrl } from "@/lib/auth/urls";

describe("getSiteUrl", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("prefers NEXT_PUBLIC_APP_URL", () => {
    vi.stubEnv("NEXT_PUBLIC_APP_URL", "https://app.example.com/");
    vi.stubEnv("VERCEL_URL", "ignored.vercel.app");
    expect(getSiteUrl()).toBe("https://app.example.com");
  });

  it("falls back to localhost", () => {
    vi.stubEnv("NEXT_PUBLIC_APP_URL", "");
    vi.stubEnv("VERCEL_URL", "");
    expect(getSiteUrl()).toBe("http://localhost:3000");
  });
});

describe("authCallbackUrl", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("builds callback with encoded next path", () => {
    vi.stubEnv("NEXT_PUBLIC_APP_URL", "http://localhost:3000");
    expect(authCallbackUrl("/reset-password")).toBe(
      "http://localhost:3000/auth/callback?next=%2Freset-password",
    );
  });
});
