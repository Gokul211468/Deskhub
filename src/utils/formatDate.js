/**
 * utils/formatDate.js
 *
 * Format ISO date strings into human-friendly versions.
 *
 * Use built-in Intl APIs — no library needed:
 *   - new Intl.DateTimeFormat("en-IN", { ... })
 *   - new Intl.RelativeTimeFormat("en", { numeric: "auto" })
 *
 * Examples to aim for:
 *   formatDate("2026-05-07T09:14:00Z")    →  "7 May 2026"
 *   formatDateTime("2026-05-07T09:14:00Z") →  "7 May 2026, 2:44 pm"   (IST)
 *   formatRelative("2026-05-07T09:14:00Z") →  "2 hours ago"
 *
 * TODO:
 *   [ ] formatDate(iso)
 *   [ ] formatDateTime(iso)
 *   [ ] formatRelative(iso) — calculate diff in ms, pick best unit (sec/min/hour/day)
 *
 * Hint: Intl.RelativeTimeFormat with `numeric: "auto"` gives "yesterday" instead of "1 day ago"
 */

// export function formatDate(iso) {
//   // TODO
// }

// export function formatDateTime(iso) {
//   // TODO
// }

// export function formatRelative(iso) {
//   // TODO
// }


const LOCALE = "en-IN";
const TZ = "Asia/Kolkata";

const dateFormatter = new Intl.DateTimeFormat(LOCALE, {
  timeZone: TZ,
  day: "numeric",
  month: "short",
  year: "numeric",
});

const dateTimeFormatter = new Intl.DateTimeFormat(LOCALE, {
  timeZone: TZ,
  day: "numeric",
  month: "short",
  year: "numeric",
  hour: "numeric",
  minute: "2-digit",
  hour12: true,
});

const relativeFormatter = new Intl.RelativeTimeFormat("en", {
  numeric: "auto",
});

function parseDate(iso) {
  if (iso == null || iso === "") return null;
  const d = new Date(iso);
  return Number.isNaN(d.getTime()) ? null : d;
}


export function formatDate(iso) {
  const d = parseDate(iso);
  return d ? dateFormatter.format(d) : "";
}


export function formatDateTime(iso) {
  const d = parseDate(iso);
  return d ? dateTimeFormatter.format(d) : "";
}


export function formatRelative(iso) {
  const d = parseDate(iso);
  if (!d) return "";

  const now = Date.now();
  let diffSec = Math.round((d.getTime() - now) / 1000);

  const abs = Math.abs(diffSec);
  if (abs < 45) {
    return relativeFormatter.format(0, "second");
  }

  const divisions = [
    { s: 60, unit: "minute" },
    { s: 60, unit: "hour" },
    { s: 24, unit: "day" },
    { s: 7, unit: "week" },
    { s: 4.34524, unit: "month" },
    { s: 12, unit: "year" },
  ];

  let unit = "second";
  let value = diffSec;

  for (const { s, unit: nextUnit } of divisions) {
    if (abs < s) break;
    value /= s;
    unit = nextUnit;
  }

  const rounded =
    unit === "second" ? Math.trunc(value) : Math.round(value);

  return relativeFormatter.format(rounded, unit);
}