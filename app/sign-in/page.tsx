"use client";

import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignInPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const result = await authClient.signIn.email(
      { email, password },
      {
        onSuccess: () => {
          router.push("/");
        },
        onError: (ctx) => {
          setError(ctx.error.message);
          setIsLoading(false);
        },
      }
    );

    if (result.error) {
      setError(result.error.message || "An error occurred");
      setIsLoading(false);
    }
  };

  const handleOAuthSignIn = (provider: "google" | "github") => {
    authClient.signIn.social({
      provider,
    });
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "60vh",
        padding: "var(--space-lg)",
      }}
    >
      <h1 style={{ marginBottom: "var(--space-xl)" }}>Sign In</h1>

      <form
        onSubmit={handleEmailSignIn}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "var(--space-md)",
          width: "100%",
          maxWidth: "300px",
        }}
      >
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{
            padding: "var(--space-sm)",
            borderRadius: "var(--radius-sm)",
            border: "1px solid var(--color-gray-600)",
            background: "var(--color-bg)",
            color: "var(--color-text)",
          }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{
            padding: "var(--space-sm)",
            borderRadius: "var(--radius-sm)",
            border: "1px solid var(--color-gray-600)",
            background: "var(--color-bg)",
            color: "var(--color-text)",
          }}
        />
        {error && (
          <p style={{ color: "var(--color-error)", fontSize: "var(--font-sm)" }}>
            {error}
          </p>
        )}
        <button
          type="submit"
          disabled={isLoading}
          style={{
            padding: "var(--space-sm) var(--space-md)",
            borderRadius: "var(--radius-sm)",
            border: "none",
            background: "var(--color-primary)",
            color: "var(--color-white)",
            cursor: isLoading ? "not-allowed" : "pointer",
            opacity: isLoading ? 0.7 : 1,
          }}
        >
          {isLoading ? "Signing in..." : "Sign in"}
        </button>
      </form>

      <div
        style={{
          marginTop: "var(--space-lg)",
          display: "flex",
          flexDirection: "column",
          gap: "var(--space-md)",
          alignItems: "center",
        }}
      >
        <p style={{ color: "var(--color-gray-300)" }}>or continue with</p>
        <div style={{ display: "flex", gap: "var(--space-md)" }}>
          <button
            onClick={() => handleOAuthSignIn("google")}
            style={{
              padding: "var(--space-sm) var(--space-md)",
              borderRadius: "var(--radius-sm)",
              border: "1px solid var(--color-gray-600)",
              background: "transparent",
              color: "var(--color-text)",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "var(--space-xs)",
            }}
          >
            Google
          </button>
          <button
            onClick={() => handleOAuthSignIn("github")}
            style={{
              padding: "var(--space-sm) var(--space-md)",
              borderRadius: "var(--radius-sm)",
              border: "1px solid var(--color-gray-600)",
              background: "transparent",
              color: "var(--color-text)",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "var(--space-xs)",
            }}
          >
            GitHub
          </button>
        </div>
      </div>

      <p
        style={{
          marginTop: "var(--space-xl)",
          color: "var(--color-gray-300)",
          fontSize: "var(--font-sm)",
        }}
      >
        Don&apos;t have an account?{" "}
        <Link href="/sign-up" style={{ color: "var(--color-primary)" }}>
          Sign up
        </Link>
      </p>
    </div>
  );
}