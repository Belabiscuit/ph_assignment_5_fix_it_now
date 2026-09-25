"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Dialog } from "@/components/ui/dialog";
import type { AdminUserListItem } from "@/lib/types";
import { cn } from "@/lib/utils";
import { updateUserStatus } from "../_actions/updateUserStatus";

export function BanUserDialog({
  user,
  open,
  onClose,
}: {
  user: AdminUserListItem;
  open: boolean;
  onClose: () => void;
}) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const banning = user.status === "ACTIVE";
  const label = banning ? "Ban" : "Unban";

  function handleConfirm() {
    startTransition(async () => {
      const res = await updateUserStatus(user.id, banning ? "BANNED" : "ACTIVE");
      if (res.success) {
        toast.success(res.message);
        onClose();
        router.refresh();
      } else {
        toast.error(res.message);
      }
    });
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      title={banning ? "Ban this user?" : "Unban this user?"}
    >
      <p className="text-sm leading-6 text-slate-600 dark:text-slate-300">
        {banning ? "This will block " : "This will restore "}
        <span className="break-words font-semibold text-slate-950 dark:text-slate-50">
          {user.name}
        </span>
        {banning
          ? " from the platform. They won\u2019t be able to log in until you unban them."
          : " to the platform. They can log in again."}
      </p>
      <div className="mt-5 flex flex-wrap justify-end gap-2">
        <button
          type="button"
          onClick={onClose}
          className="inline-flex h-10 items-center justify-center rounded-xl border border-slate-300 bg-white px-4 text-sm font-semibold text-slate-700 shadow-sm transition-colors hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800 dark:focus-visible:ring-offset-slate-950"
        >
          Keep
        </button>
        <button
          type="button"
          onClick={handleConfirm}
          disabled={pending}
          className={cn(
            "inline-flex h-10 items-center justify-center rounded-xl px-4 text-sm font-semibold shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-60",
            banning
              ? "bg-red-700 text-white hover:bg-red-800 focus-visible:ring-red-500 dark:bg-red-600 dark:hover:bg-red-500 dark:text-white dark:focus-visible:ring-red-400"
              : "bg-teal-700 text-white hover:bg-teal-800 focus-visible:ring-teal-500 dark:bg-teal-600 dark:text-slate-950 dark:hover:bg-teal-500 dark:focus-visible:ring-teal-400"
          )}
        >
          {pending ? "Updating…" : label}
        </button>
      </div>
    </Dialog>
  );
}
