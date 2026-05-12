import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader, SiteFooter } from "@/components/SiteLayout";
import { ChatbotWidget } from "@/components/ChatbotWidget";
import { useModality, useModalitySlide, type ModalityId } from "@/components/ModalityContext";
import { TEACHERS } from "@/data/professores";
import type { Teacher } from "@/data/professores";
import { Calendar, Users, MessageCircle } from "lucide-react";
import { useState, useEffect } from "react";

export const Route = createFileRoute("/")({
  component: Index,
});

type FanPos = { x: number; y: number; rot: number };

const FAN_POSITIONS: FanPos[][] = [
  [{ x: 0, y: -155, rot: 0 }],
  [
    { x: -90, y: -135, rot: -22 },
    { x: 90, y: -135, rot: 22 },
  ],
  [
    { x: -115, y: -108, rot: -30 },
    { x: 0, y: -155, rot: 0 },
    { x: 115, y: -108, rot: 30 },
  ],
];

function FighterIcon() {
  return (
    <svg
      className="h-6 w-6"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="9" cy="3.5" r="1.8" />
      <line x1="9" y1="5.3" x2="9.5" y2="11" />
      <polyline points="9.5,7.5 5,6 4,7.5" />
      <polyline points="9.5,8 15,10.5 16,9.5" />
      <polyline points="9.5,11 7,17.5 5.5,17.5" />
      <polyline points="9.5,11 13,15.5 16,13.5" />
    </svg>
  );
}

function ProfessoresCard() {
  const { modality } = useModality();
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<Teacher | null>(null);
  const teachers: Teacher[] = TEACHERS[modality.id as ModalityId];
  const count = teachers.length;
  const positions = FAN_POSITIONS[count - 1] ?? FAN_POSITIONS[0];

  useEffect(() => {
    setOpen(false);
    setSelected(null);
  }, [modality.id]);

  const handleCardClick = () => {
    if (!selected) setOpen((o: boolean) => !o);
  };

  return (
    <>
      {/* Professor detail modal */}
      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm"
          onClick={() => setSelected(null)}
        >
          <div
            className="animate-in zoom-in-90 fade-in duration-200 relative w-72 overflow-hidden rounded-2xl border border-blood/50 bg-zinc-950 shadow-[0_0_80px_color-mix(in_oklab,var(--blood)_40%,transparent)]"
            onClick={(e: { stopPropagation(): void }) => e.stopPropagation()}
          >
            {selected.photo ? (
              <img
                src={selected.photo}
                alt={selected.name}
                className="h-52 w-full object-cover object-top"
              />
            ) : (
              <div className="flex h-40 items-center justify-center bg-blood/20 text-5xl font-bold text-blood">
                {selected.initials}
              </div>
            )}
            <div className="p-5">
              <h3 className="font-display text-2xl font-bold uppercase tracking-wide text-foreground">
                {selected.name}
              </h3>
              <p className="text-sm font-medium text-blood">{selected.role}</p>
              <p className="text-xs text-muted-foreground">{selected.rank}</p>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {selected.bio}
              </p>
              <button
                onClick={() => setSelected(null)}
                className="mt-5 w-full rounded-full border border-blood/40 py-2 text-xs font-semibold uppercase tracking-widest text-blood transition-colors hover:bg-blood/10"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="relative cursor-pointer" onClick={handleCardClick}>
        {/* Mini cards — scale(0) when closed (invisible), so z-index flip is seamless */}
        <div
          className="absolute"
          style={{
            top: -14,
            left: "calc(50% - 48px)",
            zIndex: open ? 10 : 0,
            pointerEvents: open ? "auto" : "none",
          }}
        >
          {teachers.map((teacher: Teacher, i: number) => {
            const pos = positions[i];
            return (
              <div
                key={teacher.name}
                className="absolute top-0 left-0 w-24 overflow-hidden rounded-xl border border-blood/40 bg-zinc-900 shadow-2xl transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
                style={{
                  height: 130,
                  transitionDelay: open
                    ? `${i * 65}ms`
                    : `${(count - 1 - i) * 65}ms`,
                  transform: open
                    ? `translate(${pos.x}px, ${pos.y}px) rotate(${pos.rot}deg) scale(1)`
                    : `translate(0px, 0px) rotate(${(i - (count - 1) / 2) * 6}deg) scale(0)`,
                  transformOrigin: "bottom center",
                  zIndex: count - i,
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelected(teacher);
                }}
              >
                {teacher.photo ? (
                  <img
                    src={teacher.photo}
                    alt={teacher.name}
                    className="h-[70px] w-full object-cover object-top"
                  />
                ) : (
                  <div className="flex h-[70px] w-full items-center justify-center bg-blood/20 text-xl font-bold text-blood">
                    {teacher.initials}
                  </div>
                )}
                <div className="p-2">
                  <p className="text-[11px] font-bold leading-tight text-foreground">
                    {teacher.name}
                  </p>
                  <p className="mt-0.5 text-[10px] leading-tight text-blood">
                    {teacher.rank}
                  </p>
                  <p className="mt-1 line-clamp-2 text-[9px] leading-snug text-muted-foreground">
                    {teacher.bio}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Main card — z-index: 1, always covers the closed (invisible) mini-cards */}
        <div className="group relative z-[1] rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:border-blood/60 hover:shadow-blood">
          <div
            className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-blood/10 text-blood transition-opacity duration-300"
            style={{ opacity: open ? 0 : 1 }}
          >
            <FighterIcon />
          </div>
          <h3 className="font-display text-xl uppercase tracking-wider text-foreground">
            Professores experientes
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            {open
              ? "Clique para fechar"
              : "Equipe técnica formada por instrutores dedicados e qualificados."}
          </p>
          {!open && (
            <p className="mt-2 text-xs text-blood/50">Clique para conhecer →</p>
          )}
        </div>
      </div>
    </>
  );
}

function Index() {
  const { modality } = useModality();
  const slide = useModalitySlide();

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div
          className="pointer-events-none absolute inset-0 opacity-30"
          style={{
            background:
              "radial-gradient(circle at 70% 30%, color-mix(in oklab, var(--blood) 40%, transparent), transparent 50%), radial-gradient(circle at 20% 80%, color-mix(in oklab, var(--blood) 25%, transparent), transparent 60%)",
          }}
        />
        <div key={slide.key} className={`relative mx-auto grid max-w-6xl items-center gap-10 px-6 py-20 md:grid-cols-2 md:py-32 ${slide.className}`}>
          <div>
            <div className="mb-4 inline-block rounded-full border border-blood/40 bg-blood/10 px-4 py-1 text-xs uppercase tracking-[0.25em] text-blood">
              {modality.short}
            </div>
            <h1 className="font-display text-5xl font-bold uppercase leading-[1.15] tracking-tight text-foreground md:text-7xl md:leading-[1.1]">
              {modality.tagline}
            </h1>
            <p className="mt-6 max-w-md text-base leading-relaxed text-muted-foreground [text-wrap:balance] md:text-lg">
              {modality.description}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/horarios"
                className="inline-flex items-center gap-2 rounded-full bg-blood px-6 py-3 text-sm font-semibold uppercase tracking-wider text-blood-foreground shadow-blood transition-transform hover:scale-105"
              >
                <Calendar className="h-4 w-4" /> Ver horários
              </Link>
              <Link
                to="/professores"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary px-6 py-3 text-sm font-semibold uppercase tracking-wider text-secondary-foreground transition-colors hover:border-blood hover:text-blood"
              >
                <Users className="h-4 w-4" /> Professores
              </Link>
            </div>
          </div>
          <div className="relative flex items-center justify-center">
            <div className="absolute inset-0 animate-pulse rounded-full bg-blood/20 blur-3xl" />
            <img src={modality.logo} alt={`Logo ${modality.label}`} className="relative w-72 drop-shadow-[0_20px_40px_rgba(0,0,0,0.4)] md:w-96" />
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-6 md:grid-cols-3">
          <div className="group rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:border-blood/60 hover:shadow-blood">
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-blood/10 text-blood">
              <Calendar className="h-6 w-6" />
            </div>
            <h3 className="font-display text-xl uppercase tracking-wider text-foreground">Aulas todos os dias</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">Turmas pela manhã, tarde e noite. Encontre o horário que cabe na sua rotina.</p>
          </div>

          <ProfessoresCard />

          <div className="group rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:border-blood/60 hover:shadow-blood">
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-blood/10 text-blood">
              <MessageCircle className="h-6 w-6" />
            </div>
            <h3 className="font-display text-xl uppercase tracking-wider text-foreground">Aula experimental grátis</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">Fale com a gente no chat e venha sentir o tatame antes de decidir.</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-6 pb-8">
        <div className="overflow-hidden rounded-3xl border border-blood/40 bg-gradient-to-br from-blood/20 via-card to-card p-10 text-center md:p-16">
          <h2 className="font-display text-3xl uppercase tracking-wider text-foreground md:text-5xl">
            Pronto para entrar no <span className="text-blood">tatame</span>?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            Toque no chat no canto da tela e fale direto com a gente respondemos pelo WhatsApp.
          </p>
          <div className="mt-8 flex flex-col items-center gap-4">
            <p className="text-sm text-muted-foreground">Quer saber como chegar?</p>
            <a
              href="https://www.google.com/maps/search/?api=1&query=Pra%C3%A7a+8+de+Maio+Rocha+Miranda+Rio+de+Janeiro"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-blood px-6 py-3 text-sm font-semibold uppercase tracking-wider text-blood-foreground shadow-blood transition-transform hover:scale-105"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
              </svg>
              Ver no Google Maps
            </a>
          </div>
        </div>
      </section>

      <SiteFooter />
      <ChatbotWidget />
    </div>
  );
}

