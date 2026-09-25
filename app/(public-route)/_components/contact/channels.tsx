import { Clock, Mail, Phone } from "lucide-react";
import { Card } from "@/components/ui/card";
import { SectionHeading } from "../home/section-heading";

export const contactChannelValues = {
  email: "support@fixitnow.com",
  phone: "+880 1234-567890",
  hours: "8:00 AM – 9:00 PM",
};

const channels = [
  {
    icon: Mail,
    label: "Email",
    value: contactChannelValues.email,
    href: "mailto:support@fixitnow.com",
    note: "We reply within one working day",
  },
  {
    icon: Phone,
    label: "Phone",
    value: contactChannelValues.phone,
    href: "tel:+8801709341256",
    note: "Call for anything booking-related",
  },
  {
    icon: Clock,
    label: "Hours",
    value: contactChannelValues.hours,
    note: "Open today · Dhaka & Chattogram",
  },
];

export function Channels() {
  return (
    <section className="border-b border-border bg-background">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <SectionHeading
          eyebrow={"// Reach the team"}
          title="Pick the channel."
          sub="Bookings, payments and complaints all share the same mailbox — no runaround."
        />
        <div className="grid gap-5 sm:grid-cols-3">
          {channels.map((channel) => {
            const inner = (
              <>
                <div className="flex items-center justify-between gap-3">
                  <span className="flex size-11 items-center justify-center rounded-2xl bg-teal-50 text-primary shadow-sm dark:bg-teal-950/50 dark:text-teal-200">
                    <channel.icon className="size-5" aria-hidden />
                  </span>
                  <span className="rounded-full border border-amber-200 bg-amber-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-amber-800 dark:border-amber-900 dark:bg-amber-950/50 dark:text-amber-200">
                    {"✓"} live
                  </span>
                </div>
                <p className="mt-5 text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                  {channel.label}
                </p>
                <p className="mt-1 break-words font-display text-lg font-bold tracking-tight text-foreground">
                  {channel.value}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {channel.note}
                </p>
              </>
            );
            return (
              <Card
                key={channel.label}
                className="group flex flex-col rounded-3xl border-border bg-card p-6 shadow-[0_18px_45px_-30px_rgba(15,23,42,0.4)] transition-all duration-200 hover:-translate-y-1 hover:border-primary/35 hover:shadow-[0_24px_50px_-28px_rgba(15,118,110,0.32)]"
              >
                {channel.href ? (
                  <a
                    href={channel.href}
                    className="flex h-full flex-col rounded-2xl focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/20"
                  >
                    {inner}
                  </a>
                ) : (
                  inner
                )}
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
