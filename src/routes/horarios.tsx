import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader, SiteFooter } from "@/components/SiteLayout";
import { ChatbotWidget } from "@/components/ChatbotWidget";
import { useModality, type ModalityId } from "@/components/ModalityContext";
import { CalendarPlus } from "lucide-react";

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
  return s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();
}

function buildGoogleCalendarUrl(modalityLabel: string, title: string, daysStr: string, time: string) {
  const tokens = daysStr.split("•").map((t) => normalize(t));
  const days = tokens.map((t) => DAY_MAP[t]).filter(Boolean);
  if (days.length === 0) return "#";

  const [hh, mm] = time.split(":").map(Number);
  const now = new Date();
  // Find next occurrence of any of the days
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

export const Route = createFileRoute("/horarios")({
  head: () => ({
    meta: [
      { title: "Horários — XOGUN" },
      { name: "description", content: "Confira os horários das aulas de Jiu Jitsu, Muay Thai e Aikido na XOGUN." },
      { property: "og:title", content: "Horários — XOGUN" },
      { property: "og:description", content: "Turmas para todas as idades e níveis." },
    ],
  }),
  component: HorariosPage,
});

type Slot = { days: string; time: string };
type Group = { title: string; age?: string; slots: Slot[]; note?: string };

const GROUPS: Record<ModalityId, Group[]> = {
  jiujitsu: [
    {
      title: "Baby",
      age: "3 a 7 anos",
      slots: [
        { days: "Segunda • Quarta • Sexta", time: "17:30" },
        { days: "Segunda • Quarta • Sexta", time: "18:30" },
      ],
    },
    {
      title: "Kids",
      age: "8 a 12 anos",
      slots: [
        { days: "Segunda • Quarta • Sexta", time: "19:30" },
        { days: "Terça • Quinta", time: "18:00" },
      ],
    },
    {
      title: "Adulto / Juvenil",
      slots: [
        { days: "Segunda • Quarta • Sexta", time: "20:30" },
        { days: "Terça • Quinta", time: "20:00" },
      ],
      note: "As turmas de Terça e Quinta também treinam junto na aula de Sexta — todo mundo no mesmo tatame, fortalecendo a equipe e trocando experiência entre os alunos.",
    },
  ],
  muaythai: [
    {
      title: "Muay Thai",
      slots: [{ days: "Terça • Quinta", time: "19:00" }],
    },
  ],
  aikido: [
    {
      title: "Aikido",
      slots: [
        { days: "Terça • Quinta", time: "21:00" },
      ],
    },
  ],
};

function HorariosPage() {
  const { modality } = useModality();
  const groups = GROUPS[modality.id];

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="mx-auto max-w-5xl px-6 py-16">
        <div className="mb-12 text-center">
          <div className="mb-3 inline-block rounded-full border border-blood/40 bg-blood/10 px-4 py-1 text-xs uppercase tracking-[0.25em] text-blood">
            Quadro de aulas • {modality.label}
          </div>
          <h1 className="font-display text-4xl uppercase tracking-tight text-foreground md:text-6xl">
            Horários da <span className="text-blood">Semana</span>
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            Escolha a turma que combina com você e venha treinar com a gente.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {groups.map((g) => (
            <div
              key={g.title}
              className="rounded-2xl border border-border bg-card p-7 transition-colors hover:border-blood/50"
            >
              <div className="mb-5 flex items-end justify-between gap-3 border-b border-border pb-4">
                <h2 className="font-display text-3xl uppercase tracking-wider text-foreground">
                  {g.title}
                </h2>
                {g.age && (
                  <span className="rounded-full border border-blood/40 bg-blood/10 px-3 py-1 text-xs uppercase tracking-wider text-blood">
                    {g.age}
                  </span>
                )}
              </div>
              <ul className="space-y-3">
                {g.slots.map((s, i) => (
                  <li key={i}>
                    <a
                      href={buildGoogleCalendarUrl(modality.label, g.title, s.days, s.time)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center justify-between gap-4 rounded-lg border border-transparent px-2 py-2 transition-all hover:border-blood/40 hover:bg-blood/5"
                      title="Adicionar ao Google Agenda"
                    >
                      <span className="flex items-center gap-2 text-base text-foreground md:text-lg">
                        <CalendarPlus className="h-4 w-4 text-blood opacity-0 transition-opacity group-hover:opacity-100" />
                        {s.days}
                      </span>
                      <span className="font-mono text-xl font-bold text-blood md:text-2xl">
                        {s.time}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
              {g.note && (
                <p className="mt-5 rounded-lg border border-blood/30 bg-blood/5 p-4 text-sm leading-relaxed text-muted-foreground">
                  <span className="mr-1 font-semibold uppercase tracking-wider text-blood">Importante:</span>
                  {g.note}
                </p>
              )}
            </div>
          ))}
        </div>
      </main>
      <SiteFooter />
      <ChatbotWidget />
    </div>
  );
}
