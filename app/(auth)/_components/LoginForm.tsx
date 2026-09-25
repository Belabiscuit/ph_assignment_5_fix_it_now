"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useAuth } from "@/contexts/auth-context";
import type { User } from "@/lib/types";
import { Label } from "@/components/ui/input";

const inputClass =
  "w-full rounded-xl border border-input bg-background px-4 py-3 text-sm text-foreground shadow-sm transition placeholder:text-muted-foreground/70 focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/15";

const labelClass =
  "mb-2 block text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground";

const roleHome: Record<User["role"], string> = {
  CUSTOMER: "/dashboard",
  TECHNICIAN: "/technician-dashboard",
  ADMIN: "/admin-dashboard",
};

export default function LoginForm({ redirectTo }: { redirectTo: string }) {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);
    setPending(true);

    let role: User["role"] | null = null;
    try {
      role = await login(email.trim(), password);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Sign-in failed. Try again.";
      setError(message);
      toast.error(message);
      setPending(false);
      return;
    }

    toast.success("Signed in");
    const destination =
      redirectTo &&
      redirectTo.startsWith("/") &&
      !redirectTo.startsWith("//")
        ? redirectTo
        : roleHome[role ?? "CUSTOMER"];

    router.replace(destination);
    router.refresh();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5 px-5 py-7 sm:px-6">
      <div>
        <Label htmlFor="email" className={labelClass}>
          Email
        </Label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          placeholder="you@example.com"
          className={inputClass}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div>
        <Label htmlFor="password" className={labelClass}>
          Password
        </Label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          placeholder="\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022"
          className={inputClass}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      {error && (
        <p
          role="alert"
          className="flex items-start gap-2 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 dark:border-red-900/70 dark:bg-red-950/30"
        >
          <span
            aria-hidden
            className="text-sm font-bold text-red-600 dark:text-red-300"
          >
            {"\u2717"}
          </span>
          <span className="text-sm leading-relaxed text-red-900 dark:text-red-100">
            {error}
          </span>
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/25 disabled:pointer-events-none disabled:opacity-60"
      >
        {pending && (
          <span
            aria-hidden
            className="size-4 animate-spin rounded-full border-2 border-current border-t-transparent"
          />
        )}
        {pending ? "Signing in\u2026" : "Sign in"}
      </button>
    </form>
  );
}