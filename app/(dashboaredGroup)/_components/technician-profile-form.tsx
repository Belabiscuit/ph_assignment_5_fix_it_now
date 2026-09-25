"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { X } from "lucide-react";
import type { User } from "@/lib/types";
import { cn } from "@/lib/utils";
import { updateTechnicianProfile } from "../_actions/updateTechnicianProfile";

const labelCls =
  "text-xs font-semibold uppercase tracking-[0.16em] text-slate-600 dark:text-slate-300";
const inputCls =
  "mt-1.5 w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-950 shadow-sm transition placeholder:text-slate-400 focus:border-teal-600 focus:outline-none focus:ring-4 focus:ring-teal-600/15 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-50 dark:placeholder:text-slate-500 dark:focus:border-teal-400 dark:focus:ring-teal-400/15";

function Field({
  label,
  htmlFor,
  hint,
  children,
}: {
  label: string;
  htmlFor: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className={labelCls}>
        {label}
      </label>
      {children}
      {hint && (
        <p className="mt-1 text-xs leading-5 text-slate-500 dark:text-slate-400">
          {hint}
        </p>
      )}
    </div>
  );
}

export function TechnicianProfileForm({ user }: { user: User }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  const [name, setName] = useState(user.name ?? "");
  const [phone, setPhone] = useState(user.phone ?? "");
  const [address, setAddress] = useState(user.address ?? "");
  const [avatarUrl, setAvatarUrl] = useState(user.avatarUrl ?? "");
  const [bio, setBio] = useState(user.technicianProfile?.bio ?? "");
  const [location, setLocation] = useState(user.technicianProfile?.location ?? "");
  const [hourlyRate, setHourlyRate] = useState(user.technicianProfile?.hourlyRate ?? "");
  const [experienceYrs, setExperienceYrs] = useState(
    user.technicianProfile ? String(user.technicianProfile.experienceYrs) : ""
  );

  const [skills, setSkills] = useState<string[]>(user.technicianProfile?.skills ?? []);
  const [skillDraft, setSkillDraft] = useState("");

  function addSkill() {
    const value = skillDraft.trim().replace(/\s+/g, " ").toLowerCase();
    if (!value) return;
    setSkills((prev) => (prev.includes(value) ? prev : [...prev, value]));
    setSkillDraft("");
  }

  function removeSkill(skill: string) {
    setSkills((prev) => prev.filter((s) => s !== skill));
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    startTransition(async () => {
      const res = await updateTechnicianProfile({
        name: name.trim() || undefined,
        phone: phone.trim() || undefined,
        address: address.trim() || undefined,
        avatarUrl: avatarUrl.trim() || undefined,
        bio: bio.trim() || undefined,
        location: location.trim() || undefined,
        hourlyRate: hourlyRate === "" ? undefined : Number(hourlyRate),
        experienceYrs: experienceYrs === "" ? undefined : Number(experienceYrs),
        skills,
      });

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
           Profile details · edit
        </p>
        <h2 className="font-display text-3xl font-bold tracking-tight text-slate-950 dark:text-slate-50 sm:text-4xl">
          Edit profile
        </h2>
        <p className="text-sm leading-6 text-slate-600 dark:text-slate-300">
          Update your profile — customers see this on your public profile.
        </p>
      </header>

      <form
        onSubmit={handleSubmit}
        className="space-y-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-6 lg:p-8"
      >
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Full name" htmlFor="tp-name">
            <input
              id="tp-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className={inputCls}
              placeholder="Karim Hossain"
            />
          </Field>
          <Field label="Phone" htmlFor="tp-phone">
            <input
              id="tp-phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              className={inputCls}
              placeholder="+88017…"
            />
          </Field>
          <Field label="Address" htmlFor="tp-address" hint="Where customers find you">
            <input
              id="tp-address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className={inputCls}
              placeholder="Mirpur, Dhaka"
            />
          </Field>
          <Field label="Avatar URL" htmlFor="tp-avatar" hint="Paste an image link to update your photo">
            <div className="mt-1.5 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
              {avatarUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={avatarUrl}
                  alt="Avatar preview"
                  className="size-14 shrink-0 rounded-full border border-slate-200 object-cover dark:border-slate-700"
                />
              ) : (
                <span className="flex size-14 shrink-0 items-center justify-center rounded-full bg-teal-100 font-display text-xl font-bold text-teal-800 ring-4 ring-teal-50 dark:bg-teal-950 dark:text-teal-200 dark:ring-teal-950/60">
                  {(name.trim()[0] ?? "?").toUpperCase()}
                </span>
              )}
              <input
                id="tp-avatar"
                type="url"
                value={avatarUrl}
                onChange={(e) => setAvatarUrl(e.target.value)}
                className={cn(inputCls, "mt-0 min-w-0 flex-1")}
                placeholder="https://…"
              />
            </div>
          </Field>
          <Field label="Hourly rate (৳)" htmlFor="tp-rate" hint="Positive number">
            <input
              id="tp-rate"
              type="number"
              min="0"
              step="0.01"
              value={hourlyRate}
              onChange={(e) => setHourlyRate(e.target.value)}
              className={inputCls}
              placeholder="500"
            />
          </Field>
          <Field label="Experience (years)" htmlFor="tp-exp" hint="Zero or more">
            <input
              id="tp-exp"
              type="number"
              min="0"
              step="1"
              value={experienceYrs}
              onChange={(e) => setExperienceYrs(e.target.value)}
              className={inputCls}
              placeholder="8"
            />
          </Field>
          <Field label="Service location" htmlFor="tp-location" hint="Must appear in booking addresses">
            <input
              id="tp-location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className={inputCls}
              placeholder="Mirpur"
            />
          </Field>
        </div>

        <Field label="Bio" htmlFor="tp-bio">
          <textarea
            id="tp-bio"
            rows={3}
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className={cn(inputCls, "resize-y")}
            placeholder="Plumbing expert with 8 years experience…"
          />
        </Field>

        <Field label="Skills" htmlFor="tp-skill-input" hint="Enter a skill, then press Add">
          <div className="mt-1.5 flex flex-col gap-2 sm:flex-row">
            <input
              id="tp-skill-input"
              value={skillDraft}
              onChange={(e) => setSkillDraft(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addSkill();
                }
              }}
              className={cn(inputCls, "mt-0 min-w-0 flex-1")}
              placeholder="plumbing"
            />
            <button
              type="button"
              onClick={addSkill}
              className="shrink-0 rounded-xl bg-teal-700 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-teal-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 dark:bg-teal-600 dark:text-slate-950 dark:hover:bg-teal-500 dark:focus-visible:ring-offset-slate-950"
            >
              Add
            </button>
          </div>
          {skills.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-2">
              {skills.map((skill) => (
                <span
                  key={skill}
                  className="inline-flex items-center gap-1.5 rounded-full border border-teal-200 bg-teal-50 px-2.5 py-1.5 text-sm font-medium text-teal-800 dark:border-teal-800 dark:bg-teal-950/50 dark:text-teal-200"
                >
                  {skill}
                  <button
                    type="button"
                    onClick={() => removeSkill(skill)}
                    aria-label={`Remove ${skill}`}
                    className="rounded-full p-0.5 text-teal-700 transition-colors hover:bg-teal-100 hover:text-teal-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 dark:text-teal-300 dark:hover:bg-teal-900 dark:hover:text-teal-100 dark:focus-visible:ring-offset-slate-900"
                  >
                    <X className="size-3" aria-hidden />
                  </button>
                </span>
              ))}
            </div>
          )}
        </Field>

        <div className="flex items-center justify-end gap-3 border-t border-slate-100 pt-5 dark:border-slate-800">
          <button
            type="submit"
            disabled={pending}
            className="rounded-xl bg-teal-700 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-teal-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:bg-teal-600 dark:text-slate-950 dark:hover:bg-teal-500 dark:focus-visible:ring-offset-slate-950"
          >
            {pending ? "Saving…" : "Save changes"}
          </button>
        </div>
      </form>
    </div>
  );
}
