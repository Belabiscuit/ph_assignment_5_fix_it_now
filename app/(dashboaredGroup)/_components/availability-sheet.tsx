"use client";

import { useMemo, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Plus, X } from "lucide-react";
import type { DayOfWeek, TechnicianAvailability } from "@/lib/types";
import { DAYS_OF_WEEK } from "@/lib/booking-status";
import { cn } from "@/lib/utils";
import { setTechnicianAvailability } from "../_actions/setTechnicianAvailability";

interface Slot {
  id: string;
  startTime: string;
  endTime: string;
}

const DAY_LABELS: Record<DayOfWeek, string> = {
  MONDAY: "Mon",
  TUESDAY: "Tue",
  WEDNESDAY: "Wed",
  THURSDAY: "Thu",
  FRIDAY: "Fri",
  SATURDAY: "Sat",
  SUNDAY: "Sun",
};

function emptyDraft(): Record<DayOfWeek, { start: string; end: string }> {
  return Object.fromEntries(
    DAYS_OF_WEEK.map((day) => [day, { start: "09:00", end: "17:00" }])
  ) as Record<DayOfWeek, { start: string; end: string }>;
}

export function AvailabilitySheet({
  initialSlots,
}: {
  initialSlots: TechnicianAvailability[];
}) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [drafts, setDrafts] = useState(emptyDraft);

  const [slots, setSlots] = useState<Record<DayOfWeek, Slot[]>>(() => {
    const grouped = Object.fromEntries(
      DAYS_OF_WEEK.map((day) => [day, [] as Slot[]])
    ) as Record<DayOfWeek, Slot[]>;

    for (const slot of initialSlots) {
      grouped[slot.dayOfWeek].push({
        id: slot.id,
        startTime: slot.startTime,
        endTime: slot.endTime,
      });
    }
    return grouped;
  });

  const totalSlots = useMemo(
    () => Object.values(slots).reduce((sum, list) => sum + list.length, 0),
    [slots]
  );

  function addSlot(day: DayOfWeek) {
    const { start, end } = drafts[day];
    if (!start || !end) {
      toast.error("Pick a start and end time.");
      return;
    }
    if (start >= end) {
      toast.error("Start time must be before end time.");
      return;
    }
    setSlots((prev) => ({
      ...prev,
      [day]: [...prev[day], { id: crypto.randomUUID(), startTime: start, endTime: end }],
    }));
  }

  function removeSlot(day: DayOfWeek, id: string) {
    setSlots((prev) => ({
      ...prev,
      [day]: prev[day].filter((s) => s.id !== id),
    }));
  }

  function handleSave() {
    const payload = DAYS_OF_WEEK.flatMap((day) =>
      slots[day].map((slot) => ({
        dayOfWeek: day,
        startTime: slot.startTime,
        endTime: slot.endTime,
      }))
    );

    startTransition(async () => {
      const res = await setTechnicianAvailability(payload);
      if (res.success) {
        toast.success(res.message);
        router.refresh();
      } else {
        toast.error(res.message);
      }
    });
  }

  return (
    <div className="mx-auto w-full max-w-3xl space-y-6 rounded-3xl bg-slate-50/80 p-5 dark:bg-slate-950/60 sm:p-7">
      <header className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-teal-700 dark:text-teal-300">
          Professional schedule
        </p>
        <h2 className="font-display text-3xl font-bold tracking-tight text-slate-950 dark:text-slate-50 sm:text-4xl">
          Availability
        </h2>
        <p className="text-sm leading-6 text-slate-600 dark:text-slate-300">
          Weekly working hours — customers can only book within these windows.
        </p>
      </header>

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 px-5 py-4 dark:border-slate-800 sm:px-6">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-600 dark:text-slate-300">
            Weekly hours · {totalSlots} slot{totalSlots === 1 ? "" : "s"}
          </p>
          <button
            type="button"
            onClick={handleSave}
            disabled={pending || totalSlots === 0}
            className="rounded-xl bg-teal-700 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-teal-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:bg-teal-600 dark:text-slate-950 dark:hover:bg-teal-500 dark:focus-visible:ring-offset-slate-950"
          >
            {pending ? "Saving…" : "Save schedule"}
          </button>
        </div>

        <ul className="divide-y divide-slate-100 dark:divide-slate-800">
          {DAYS_OF_WEEK.map((day) => {
            const daySlots = slots[day];
            return (
              <li key={day} className="px-5 py-4 sm:px-6">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span
                        aria-hidden="true"
                        className={cn(
                          "size-2 rounded-full",
                          daySlots.length > 0 ? "bg-teal-500" : "bg-amber-400"
                        )}
                      />
                      <p className="text-sm font-semibold text-slate-950 dark:text-slate-50">
                        {DAY_LABELS[day]} · {day}
                      </p>
                    </div>

                    {daySlots.length > 0 ? (
                      <div className="mt-3 flex flex-wrap gap-2">
                        {daySlots.map((slot) => (
                          <span
                            key={slot.id}
                            className="inline-flex items-center gap-1.5 rounded-full border border-teal-200 bg-teal-50 px-2.5 py-1.5 text-sm font-medium text-teal-800 dark:border-teal-800 dark:bg-teal-950/50 dark:text-teal-200"
                          >
                            {slot.startTime}–{slot.endTime}
                            <button
                              type="button"
                              onClick={() => removeSlot(day, slot.id)}
                              aria-label={`Remove ${slot.startTime}–${slot.endTime}`}
                              className="rounded-full p-0.5 text-teal-700 transition-colors hover:bg-teal-100 hover:text-teal-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 dark:text-teal-300 dark:hover:bg-teal-900 dark:hover:text-teal-100 dark:focus-visible:ring-offset-slate-900"
                            >
                              <X className="size-3" aria-hidden />
                            </button>
                          </span>
                        ))}
                      </div>
                    ) : (
                      <p className="mt-3 inline-flex items-center gap-2 rounded-full bg-amber-50 px-2.5 py-1.5 text-xs font-medium text-amber-800 dark:bg-amber-950/40 dark:text-amber-200">
                        <span aria-hidden="true" className="size-1.5 rounded-full bg-amber-400" />
                        No hours set
                      </p>
                    )}
                  </div>

                  <div className="flex shrink-0 flex-wrap items-center gap-2">
                    <label className="sr-only" htmlFor={`av-${day}-start`}>
                      Start time
                    </label>
                    <input
                      id={`av-${day}-start`}
                      type="time"
                      value={drafts[day].start}
                      onChange={(e) =>
                        setDrafts((prev) => ({
                          ...prev,
                          [day]: { ...prev[day], start: e.target.value },
                        }))
                      }
                      className="w-28 rounded-xl border border-slate-300 bg-white px-2.5 py-2 text-sm text-slate-950 shadow-sm transition focus:border-teal-600 focus:outline-none focus:ring-4 focus:ring-teal-600/15 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-50 dark:focus:border-teal-400 dark:focus:ring-teal-400/15"
                    />
                    <span aria-hidden="true" className="text-sm text-slate-400">
                      →
                    </span>
                    <label className="sr-only" htmlFor={`av-${day}-end`}>
                      End time
                    </label>
                    <input
                      id={`av-${day}-end`}
                      type="time"
                      value={drafts[day].end}
                      onChange={(e) =>
                        setDrafts((prev) => ({
                          ...prev,
                          [day]: { ...prev[day], end: e.target.value },
                        }))
                      }
                      className="w-28 rounded-xl border border-slate-300 bg-white px-2.5 py-2 text-sm text-slate-950 shadow-sm transition focus:border-teal-600 focus:outline-none focus:ring-4 focus:ring-teal-600/15 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-50 dark:focus:border-teal-400 dark:focus:ring-teal-400/15"
                    />
                    <button
                      type="button"
                      onClick={() => addSlot(day)}
                      aria-label={`Add hours on ${DAY_LABELS[day]}`}
                      className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-teal-700 text-white shadow-sm transition-colors hover:bg-teal-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 dark:bg-teal-600 dark:text-slate-950 dark:hover:bg-teal-500 dark:focus-visible:ring-offset-slate-950"
                    >
                      <Plus className="size-4" aria-hidden />
                    </button>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>

      {totalSlots === 0 && (
        <p className="flex items-center gap-2 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900 dark:border-amber-900/70 dark:bg-amber-950/40 dark:text-amber-200">
          <span aria-hidden="true" className="size-2 rounded-full bg-amber-400" />
          No schedule saved yet — add at least one block and hit save.
        </p>
      )}
    </div>
  );
}
