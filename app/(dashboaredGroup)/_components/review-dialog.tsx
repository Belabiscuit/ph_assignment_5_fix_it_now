"use client";

import { useEffect, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Dialog } from "@/components/ui/dialog";
import type { BookingListItem } from "@/lib/types";
import { createReview } from "../_actions/createReview";

const VERDICTS: Record<number, string> = {
  1: "Wouldn\u2019t rebook",
  2: "Rough work",
  3: "Got the job done",
  4: "Good, minor gripes",
  5: "Straight back to this pro",
};

const ALLOWED = "\u2605"; // ★
const IDLE = "\u2606"; // ☆

export function ReviewDialog({
  open,
  onClose,
  onReviewed,
  booking,
}: {
  open: boolean;
  onClose: () => void;
  onReviewed: () => void;
  booking: BookingListItem;
}) {
  const router = useRouter();
  const [rating, setRating] = useState(0);
  const [hovered, setHovered] = useState(0);
  const [comment, setComment] = useState("");
  const [pending, startTransition] = useTransition();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      const dir = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
      if (dir) {
        e.preventDefault();
        setRating((r) => Math.min(5, Math.max(1, (r || 0) + dir)));
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const shown = hovered || rating;

  function handleSubmit() {
    if (rating < 1) {
      toast.error("Pick a rating first.");
      return;
    }
    startTransition(async () => {
      const res = await createReview(booking.id, rating, comment.trim());
      if (res.success) {
        toast.success(res.message);
        onReviewed();
        onClose();
        router.refresh();
      } else if (res.status === 409) {
        // Server says this booking is already reviewed. Update local state
        // so the UI reflects the reviewed status and close the dialog.
        toast.success(res.message || "You already reviewed this booking.");
        onReviewed();
        onClose();
        router.refresh();
      } else {
        toast.error(res.message);
      }
    });
  }

  return (
    <Dialog open={open} onClose={onClose} title="Leave a review">
      <p className="text-sm leading-6 text-slate-600 dark:text-slate-300">
        Rate the work on{" "}
        <span className="font-semibold text-slate-950 dark:text-slate-50">
          {booking.service?.title ?? "this booking"}
        </span>
        . One review per booking — you can&apos;t change it later.
      </p>

      <div
        className="mt-4 flex items-center justify-between"
        role="radiogroup"
        aria-label="Rating from 1 to 5"
      >
        {[1, 2, 3, 4, 5].map((value) => {
          const active = value <= shown;
          return (
            <button
              key={value}
              type="button"
              role="radio"
              aria-checked={rating === value}
              aria-label={`${value} star${value === 1 ? "" : "s"}`}
              className="group relative inline-flex size-10 items-center justify-center rounded-xl text-3xl leading-none transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 dark:focus-visible:ring-teal-300 dark:focus-visible:ring-offset-slate-900"
              onPointerEnter={() => setHovered(value)}
              onPointerLeave={() => setHovered(0)}
              onClick={() => setRating(value)}
            >
              <span
                className={
                  active
                    ? "text-amber-500 transition-transform dark:text-amber-300"
                    : "text-slate-300 transition-colors group-hover:text-amber-500 dark:text-slate-600 dark:group-hover:text-amber-300"
                }
              >
                {active ? ALLOWED : IDLE}
              </span>
            </button>
          );
        })}
      </div>

      <p
        className="mt-3 min-h-5 text-sm text-slate-600 dark:text-slate-300"
        aria-live="polite"
      >
        {rating >= 1 ? `${rating}/5 — ${VERDICTS[rating]}` : "Tap a star to rate."}
      </p>

      <label
        htmlFor="review-note"
        className="mb-1 mt-4 block text-sm font-medium text-slate-700 dark:text-slate-200"
      >
        Comment{" "}
        <span className="font-normal text-slate-500 dark:text-slate-400">
          (optional)
        </span>
      </label>
      <textarea
        id="review-note"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        rows={3}
        maxLength={500}
        placeholder="What should the next customer know?"
        className="w-full resize-none rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-950 placeholder:text-slate-400 transition-colors focus:border-teal-600 focus:outline-none focus:ring-4 focus:ring-teal-600/15 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-50 dark:placeholder:text-slate-500 dark:focus:border-teal-400 dark:focus:ring-teal-400/15"
      />

      <div className="mt-5 flex flex-wrap justify-end gap-2">
        <button
          type="button"
          onClick={onClose}
          disabled={pending}
          className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-3.5 py-2 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 disabled:opacity-60 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800 dark:focus-visible:ring-offset-slate-900"
        >
          Not now
        </button>
        <button
          type="button"
          onClick={handleSubmit}
          disabled={pending || rating < 1}
          className="inline-flex items-center gap-2 rounded-xl bg-teal-700 px-3.5 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-teal-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 disabled:opacity-60 dark:bg-teal-600 dark:text-slate-950 dark:hover:bg-teal-500 dark:focus-visible:ring-offset-slate-900"
        >
          {pending && (
            <span
              aria-hidden
              className="size-3 animate-spin rounded-full border-2 border-current border-t-transparent"
            />
          )}
          {pending ? "Posting\u2026" : "Post review"}
        </button>
      </div>
    </Dialog>
  );
}
