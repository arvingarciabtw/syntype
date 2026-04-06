"use client";

import { authClient } from "@/lib/auth-client";
import Link from "next/link";

export function AuthSection() {
  const { data: session, isPending } = authClient.useSession();

  if (isPending) {
    return null;
  }

  if (session) {
    return (
      <div style={{ display: "flex", alignItems: "center", gap: "var(--space-md)" }}>
        <span style={{ color: "var(--color-gray-300)", fontSize: "var(--font-sm)" }}>
          {session.user.email}
        </span>
        <button
          onClick={() => authClient.signOut()}
          style={{
            background: "transparent",
            border: "1px solid var(--color-gray-600)",
            color: "var(--color-gray-300)",
            padding: "var(--space-xs) var(--space-md)",
            borderRadius: "var(--radius-sm)",
            cursor: "pointer",
            fontSize: "var(--font-sm)",
          }}
        >
          Sign out
        </button>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "var(--space-md)" }}>
      <Link
        href="/sign-in"
        style={{
          color: "var(--color-gray-300)",
          textDecoration: "none",
          fontSize: "var(--font-sm)",
        }}
      >
        Sign in
      </Link>
    </div>
  );
}