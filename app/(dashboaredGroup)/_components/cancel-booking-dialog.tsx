"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Dialog } from "@/components/ui/dialog";
import { cancelBooking } from "../_actions/cancelBooking";

export function CancelBookingDialog({
  open,
  onClose,
  bookingId,
  serviceTitle,
}: {
  open: boolean;
  onClose: () => void;
  bookingId: string;
  serviceTitle: string;
}) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [reason, setReason] = useState("");

  function handleConfirm() {
    startTransition(async () => {
      const res = await cancelBooking(bookingId, reason);
      if (res.success) {
        toast.success(res.message);
        setReason("");
        onClose();
        router.refresh();
      } else {
        toast.error(res.message);
      }
    });
  }

  return (
    <Dialog open={open} onClose={onClose} title="Cancel booking?">
      <div className="rounded-2xl border border-amber-200 bg-amber-50/80 p-4 dark:border-amber-900/70 dark:bg-amber-950/30">
        <p className="text-sm leading-6 text-slate-700 dark:text-slate-200">
          This will cancel{" "}
          <span className="font-semibold text-slate-950 dark:text-slate-50">
            {serviceTitle}
          </span>
          . Once cancelled it can&apos;t be undone.
        </p>
      </div>
      <label
        htmlFor="cancel-reason"
        className="mb-1 mt-4 block text-sm font-medium text-slate-700 dark:text-slate-200"
      >
        Reason{" "}
        <span className="font-normal text-slate-500 dark:text-slate-400">
          (optional)
        </span>
      </label>
      <textarea
        id="cancel-reason"
        value={reason}
        onChange={(e) => setReason(e.target.value)}
        rows={2}
        placeholder="Changed my mind…"
        className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-950 placeholder:text-slate-400 transition-colors focus:border-teal-600 focus:outline-none focus:ring-4 focus:ring-teal-600/15 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-50 dark:placeholder:text-slate-500 dark:focus:border-teal-400 dark:focus:ring-teal-400/15"
      />
      <div className="mt-5 flex flex-wrap justify-end gap-2">
        <button
          type="button"
          onClick={onClose}
          className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-3.5 py-2 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800 dark:focus-visible:ring-offset-slate-900"
        >
          Keep booking
        </button>
        <button
          type="button"
          onClick={handleConfirm}
          disabled={pending}
          className="inline-flex items-center justify-center rounded-xl bg-red-600 px-3.5 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-red-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 disabled:opacity-60 dark:focus-visible:ring-offset-slate-900"
        >
          {pending ? "Cancelling…" : "Cancel booking"}
        </button>
      </div>
    </Dialog>
  );
}
