"use client";

import { useState } from "react";
import { useAuth } from "@/contexts/auth-context";
import { Sidebar } from "./sidebar";
import { Topbar } from "./topbar";

export function DashboardShell({
  role,
  children,
}: {
  role: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const { user } = useAuth();

  return (
    <div className="flex min-h-dvh bg-background text-foreground">
      <Sidebar
        role={role}
        user={user ?? undefined}
        mobileOpen={open}
        onClose={() => setOpen(false)}
      />
      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar role={role} user={user ?? undefined} onMenu={() => setOpen(true)} />
        <main className="flex-1 bg-background">
          <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
