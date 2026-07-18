const CATEGORY_LABELS: Record<string, string> = {
  book: "Book",
  conference: "Conference",
  teaching: "Workshop",
  research: "Research",
  client: "Client work",
};

export function categoryLabel(value: string): string {
  return CATEGORY_LABELS[value] ?? value;
}

/** Format an ISO date (YYYY-MM-DD or full ISO) as e.g. "Jan 2026". */
export function formatMonthYear(iso: string | undefined): string {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-GB", { month: "short", year: "numeric" });
}

export function formatFullDate(iso: string | undefined): string {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

/** Pad a number to 2 digits for the tabular stat display. */
export function pad2(n: number): string {
  return n < 10 ? `0${n}` : String(n);
}

export function cx(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(" ");
}
