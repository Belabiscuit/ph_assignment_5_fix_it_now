import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const APP_TIME_ZONE = "Asia/Dhaka"

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"] as const

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sept",
  "Oct",
  "Nov",
  "Dec",
] as const

interface ZonedParts {
  year: number
  month: number
  day: number
  hour: number
  minute: number
}

const zonedFormatter = new Intl.DateTimeFormat("en-GB", {
  timeZone: APP_TIME_ZONE,
  calendar: "gregory",
  numberingSystem: "latn",
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
  hourCycle: "h23",
})

function zonedParts(input: string | number | Date): ZonedParts | null {
  const date = input instanceof Date ? input : new Date(input)
  if (Number.isNaN(date.getTime())) return null

  const parts = zonedFormatter.formatToParts(date)
  const read = (type: string): number => {
    const part = parts.find((entry) => entry.type === type)
    return part ? Number(part.value) : Number.NaN
  }

  const resolved: ZonedParts = {
    year: read("year"),
    month: read("month"),
    day: read("day"),
    hour: read("hour"),
    minute: read("minute"),
  }

  const complete =
    Number.isFinite(resolved.year) &&
    Number.isFinite(resolved.month) &&
    Number.isFinite(resolved.day) &&
    Number.isFinite(resolved.hour) &&
    Number.isFinite(resolved.minute)

  return complete ? resolved : null
}

function pad2(value: number): string {
  return String(value).padStart(2, "0")
}

function weekdayOf(parts: Pick<ZonedParts, "year" | "month" | "day">): string {
  return WEEKDAYS[new Date(Date.UTC(parts.year, parts.month - 1, parts.day)).getUTCDay()]
}

function monthOf(parts: Pick<ZonedParts, "month">): string {
  return MONTHS[parts.month - 1]
}

function shortDate(parts: Pick<ZonedParts, "year" | "month" | "day">): string {
  return `${pad2(parts.day)} ${monthOf(parts)} ${parts.year}`
}

function groupIndianDigits(digits: string): string {
  if (digits.length <= 3) return digits

  const groups: string[] = []
  let rest = digits.slice(0, -3)

  while (rest.length > 2) {
    groups.unshift(rest.slice(-2))
    rest = rest.slice(0, -2)
  }
  if (rest.length > 0) groups.unshift(rest)

  groups.push(digits.slice(-3))
  return groups.join(",")
}

export function formatTodayBadge(): string {
  const now = zonedParts(new Date())
  if (!now) return "—"
  return `${weekdayOf(now)} · ${pad2(now.day)} · ${monthOf(now)}`.toUpperCase()
}

export function formatDate(iso: string): string {
  const parts = zonedParts(iso)
  if (!parts) return "—"
  return shortDate(parts)
}

export function formatDateTime(iso: string): string {
  const parts = zonedParts(iso)
  if (!parts) return "—"
  return `${shortDate(parts)}, ${pad2(parts.hour)}:${pad2(parts.minute)}`
}

const decimalFormatter = new Intl.NumberFormat("en-US", {
  useGrouping: false,
  maximumFractionDigits: 2,
})

export function formatBDT(value: string | number): string {
  const amount = typeof value === "string" ? Number(value) : value
  if (!Number.isFinite(amount)) return "—"

  const [wholeRaw = "", fractionRaw = ""] = decimalFormatter
    .format(Math.abs(amount))
    .split(".")
  const fraction = fractionRaw.replace(/0+$/, "")
  const sign = amount < 0 ? "-" : ""
  const whole = groupIndianDigits(wholeRaw)

  return `৳${sign}${whole}${fraction ? `.${fraction}` : ""}`
}
