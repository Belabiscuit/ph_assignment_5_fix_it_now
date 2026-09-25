"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronDown, LayoutDashboard, LogOut } from "lucide-react";
import type { User } from "@/lib/types";
import Image from "next/image";
import { useAuth } from "@/contexts/auth-context";

const dashboardByRole: Record<User["role"], string> = {
  CUSTOMER: "/dashboard",
  TECHNICIAN: "/technician-dashboard",
  ADMIN: "/admin-dashboard",
};

function initialsOf(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

export function UserMenu() {
  const router = useRouter();
  const { user, status, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const handleLogout = async () => {
    setOpen(false);
    await logout();
    router.refresh();
  };

  return (
    <div ref={rootRef} className="relative shrink-0">
      {status === "loading" ? (
        <div className="flex items-center gap-2">
          <span className="hidden size-9 animate-pulse rounded-xl bg-muted sm:block" />
          <span className="hidden h-4 w-16 animate-pulse rounded-lg bg-muted sm:block" />
        </div>
      ) : user === null ? (
        <div className="flex items-center gap-2">
          <Link
            href="/login"
            className="rounded-xl px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            Log in
          </Link>
          <Link
            href="/register"
            className="rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            Book a service
          </Link>
        </div>
      ) : (
        <>
          <button
            type="button"
            aria-haspopup="menu"
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
            className="flex items-center gap-2 rounded-xl p-1.5 transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            {user.avatarUrl ? (
              <Image
                src={user.avatarUrl}
                alt=""
                className="size-9 rounded-xl object-cover ring-1 ring-border"
                width={36}
                height={36}
              />
            ) : (
              <span className="flex size-9 items-center justify-center rounded-xl bg-primary text-sm font-semibold text-primary-foreground shadow-sm">
                {initialsOf(user.name)}
              </span>
            )}
            <span className="hidden max-w-40 truncate text-sm font-medium text-foreground sm:block">
              {user.name}
            </span>
            <ChevronDown
              className={`size-4 text-muted-foreground transition-transform ${open ? "rotate-180" : ""}`}
              aria-hidden
            />
          </button>

          {open && (
            <div
              role="menu"
              className="absolute right-0 top-full mt-2 w-64 overflow-hidden rounded-2xl border border-border bg-card p-1.5 text-card-foreground shadow-lg"
            >
              <div className="rounded-xl bg-muted/60 px-3 py-3">
                <p className="truncate text-sm font-semibold text-foreground">
                  {user.name}
                </p>
                <p className="truncate text-xs text-muted-foreground">{user.email}</p>
              </div>
              <Link
                href={dashboardByRole[user.role]}
                role="menuitem"
                onClick={() => setOpen(false)}
                className="mt-1 flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <LayoutDashboard className="size-4 text-primary" aria-hidden />
                Dashboard
              </Link>
              <button
                type="button"
                role="menuitem"
                onClick={handleLogout}
                className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <LogOut className="size-4" aria-hidden />
                Log out
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
