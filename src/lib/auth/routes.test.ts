import { describe, expect, it } from "vitest";

import {
  isAuthEntryPath,
  isProtectedAppPath,
  sanitizeNextPath,
} from "@/lib/auth/routes";

describe("isProtectedAppPath", () => {
  it("protects /app and nested routes", () => {
    expect(isProtectedAppPath("/app")).toBe(true);
    expect(isProtectedAppPath("/app/foo")).toBe(true);
    expect(isProtectedAppPath("/application")).toBe(false);
    expect(isProtectedAppPath("/")).toBe(false);
  });
});

describe("isAuthEntryPath", () => {
  it("matches auth entry routes", () => {
    expect(isAuthEntryPath("/login")).toBe(true);
    expect(isAuthEntryPath("/signup")).toBe(true);
    expect(isAuthEntryPath("/forgot-password")).toBe(true);
    expect(isAuthEntryPath("/app")).toBe(false);
  });
});

describe("sanitizeNextPath", () => {
  it("defaults invalid values to /app", () => {
    expect(sanitizeNextPath(undefined)).toBe("/app");
    expect(sanitizeNextPath("")).toBe("/app");
    expect(sanitizeNextPath("//evil.com")).toBe("/app");
    expect(sanitizeNextPath("https://evil.com")).toBe("/app");
  });

  it("blocks open redirects via auth routes", () => {
    expect(sanitizeNextPath("/login")).toBe("/app");
    expect(sanitizeNextPath("/auth/callback")).toBe("/app");
  });

  it("allows safe internal paths", () => {
    expect(sanitizeNextPath("/app/settings")).toBe("/app/settings");
  });
});
