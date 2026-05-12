import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader, SiteFooter } from "@/components/SiteLayout";
import { ChatbotWidget } from "@/components/ChatbotWidget";
import { useModality, useModalitySlide } from "@/components/ModalityContext";
import { CalendarPlus } from "lucide-react";
import { GROUPS } from "@/data/horarios";
import { buildGoogleCalendarUrl } from "@/lib/calendar";

export const Route = createFileRoute("/horarios")({
  component: HorariosPage,
});

function HorariosPage() {
  const { modality } = useModality();
  const slide = useModalitySlide();
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

        <div key={slide.key} className={`grid gap-6 md:grid-cols-2 ${slide.className}`}>
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
