"use client";

import { Accordion } from "radix-ui";
import { SectionHeading } from "./section-heading";

const faqs = [
  {
    value: "prices",
    q: "How are prices set?",
    a: "Every service lists a fixed price in taka before you book. The listed price is what you pay — no hourly surprises when the job is done.",
  },
  {
    value: "pro",
    q: "Who shows up to fix it?",
    a: "A background-checked technician with a rating and reviews from the people who hired them. You see their name, rating and past jobs before you book.",
  },
  {
    value: "time",
    q: "When will someone come?",
    a: "Pick a slot that suits you at checkout. Most same-day jobs are confirmed within the hour, and you get the pro’s ETA before they set out.",
  },
  {
    value: "areas",
    q: "Do you cover my area?",
    a: "We’re live across Dhaka and Chattogram, with more neighbourhoods on the way. Open a service request — if it lists your area, we cover it.",
  },
  {
    value: "pay",
    q: "How do I pay?",
    a: "Secure checkout in taka when you book. The listed price is the price you pay — nothing changes hands at your door.",
  },
  {
    value: "done-right",
    q: "What if the job isn’t done right?",
    a: "Rate the technician when the job closes. Low ratings flag a profile for review, and you can rebook the same service with a different pro.",
  },
];

export function Faq() {
  return (
    <section
      id="faq"
      className="scroll-mt-20 border-b border-border bg-muted/40"
    >
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <SectionHeading
          eyebrow="// Quick answers"
          title="Questions, answered."
          sub="Straight answers before you book — prices, people, payment, and what happens if a fix isn’t right."
        />

        <Accordion.Root
          type="single"
          collapsible
          defaultValue="prices"
          className="overflow-hidden rounded-3xl border border-border bg-card shadow-[0_20px_55px_-34px_rgba(15,23,42,0.4)]"
        >
          {faqs.map((faq) => (
            <Accordion.Item
              key={faq.value}
              value={faq.value}
              className="not-first:border-t not-first:border-border"
            >
              <Accordion.Header asChild>
                <Accordion.Trigger className="group flex w-full items-center justify-between gap-4 px-5 py-5 text-left transition-colors hover:bg-teal-50/60 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-inset focus-visible:ring-primary/20 sm:px-6 dark:hover:bg-teal-950/20">
                  <span className="font-display text-lg font-bold leading-snug text-foreground">
                    {faq.q}
                  </span>
                  <span
                    aria-hidden
                    className="flex size-6 shrink-0 items-center justify-center rounded-full border border-primary/25 bg-teal-50 text-primary transition-all group-hover:border-primary/50 group-data-[state=open]:rotate-45 group-data-[state=open]:border-amber-300 group-data-[state=open]:bg-amber-100 group-data-[state=open]:text-amber-800 dark:bg-teal-950/40 dark:text-teal-200 dark:group-data-[state=open]:border-amber-800 dark:group-data-[state=open]:bg-amber-950/50 dark:group-data-[state=open]:text-amber-200"
                  >
                    <span className="text-xl leading-none">+</span>
                  </span>
                </Accordion.Trigger>
              </Accordion.Header>
              <Accordion.Content className="faq-answer overflow-hidden data-[state=closed]:hidden data-[state=open]:animate-accordion-down">
                <div className="border-t border-border px-5 pb-6 pt-5 sm:px-6">
                  <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
                    {faq.a}
                  </p>
                </div>
              </Accordion.Content>
            </Accordion.Item>
          ))}
        </Accordion.Root>
      </div>
    </section>
  );
}
