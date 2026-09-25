import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { SectionHeading } from "./section-heading";

const steps = [
  {
    n: "01",
    title: "Book",
    tag: "Requested",
    tagClass:
      "border border-border bg-secondary text-secondary-foreground",
    body: "Pick a service and a time that suits you. No phone calls, no haggling.",
  },
  {
    n: "02",
    title: "Pay",
    tag: "Paid",
    tagClass:
      "border border-border bg-secondary text-secondary-foreground",
    body: "Secure checkout — the listed price is the price you pay.",
  },
  {
    n: "03",
    title: "Done",
    tag: "Done",
    tagClass:
      "border border-amber-200 bg-amber-50 text-amber-800 dark:border-amber-900 dark:bg-amber-950/50 dark:text-amber-200",
    body: "A vetted pro shows up on time and gets it fixed. Rate them after.",
  },
];

export function HowItWorks() {
  return (
    <section id="how" className="scroll-mt-20 border-b border-border bg-background">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <SectionHeading
          eyebrow="// How it works"
          title="Booked, paid, done — in that order."
          sub="Every job runs through the same three steps. You always know exactly where your fix stands."
        />
        <ol className="relative grid gap-5 md:grid-cols-3 md:gap-6">
          <span
            aria-hidden
            className="absolute left-[16.67%] right-[16.67%] top-9 hidden h-px bg-gradient-to-r from-teal-200 via-teal-400 to-amber-300 md:block dark:from-teal-900 dark:via-teal-700 dark:to-amber-800"
          />
          {steps.map((step) => (
            <li key={step.n} className="relative">
              <Card className="flex h-full flex-col rounded-3xl border-border bg-card p-6 shadow-[0_18px_45px_-30px_rgba(15,23,42,0.4)]">
                <span className="flex size-10 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground shadow-lg shadow-primary/20 ring-8 ring-background">
                  {step.n}
                </span>
                <h3 className="mt-5 font-display text-2xl font-bold text-foreground">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {step.body}
                </p>
                <Badge
                  className={`mt-5 inline-flex w-fit rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-widest ${step.tagClass}`}
                >
                  {step.tag}
                </Badge>
              </Card>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
