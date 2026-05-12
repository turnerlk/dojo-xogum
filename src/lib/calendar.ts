const DAY_MAP: Record<string, { js: number; rrule: string }> = {
  domingo: { js: 0, rrule: "SU" },
  segunda: { js: 1, rrule: "MO" },
  terca: { js: 2, rrule: "TU" },
  quarta: { js: 3, rrule: "WE" },
  quinta: { js: 4, rrule: "TH" },
  sexta: { js: 5, rrule: "FR" },
  sabado: { js: 6, rrule: "SA" },
};

function normalize(s: string) {
  return s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().trim();
}

export function buildGoogleCalendarUrl(
  modalityLabel: string,
  title: string,
  daysStr: string,
  time: string,
) {
  const tokens = daysStr.split("•").map((t) => normalize(t));
  const days = tokens.map((t) => DAY_MAP[t]).filter(Boolean);
  if (days.length === 0) return "#";

  const [hh, mm] = time.split(":").map(Number);
  const now = new Date();
  let next: Date | null = null;
  for (let i = 0; i < 14; i++) {
    const d = new Date(now);
    d.setDate(now.getDate() + i);
    d.setHours(hh, mm, 0, 0);
    if (d <= now) continue;
    if (days.some((day) => day.js === d.getDay())) {
      next = d;
      break;
    }
  }
  if (!next) return "#";

  const end = new Date(next.getTime() + 60 * 60 * 1000);
  const fmt = (d: Date) =>
    d.getFullYear().toString() +
    String(d.getMonth() + 1).padStart(2, "0") +
    String(d.getDate()).padStart(2, "0") +
    "T" +
    String(d.getHours()).padStart(2, "0") +
    String(d.getMinutes()).padStart(2, "0") +
    "00";

  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: `XOGUN — ${modalityLabel} (${title})`,
    dates: `${fmt(next)}/${fmt(end)}`,
    details: `Aula de ${modalityLabel} — turma ${title} no Dojo XOGUN.`,
    location: "Dojo XOGUN",
    recur: `RRULE:FREQ=WEEKLY;BYDAY=${days.map((d) => d.rrule).join(",")}`,
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}
