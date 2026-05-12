import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader, SiteFooter } from "@/components/SiteLayout";
import { ChatbotWidget } from "@/components/ChatbotWidget";
import { useModality } from "@/components/ModalityContext";
import { Calendar, Users, MessageCircle } from "lucide-react";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const { modality } = useModality();

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
        <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-6 py-20 md:grid-cols-2 md:py-32">
          <div>
            <div className="mb-4 inline-block rounded-full border border-blood/40 bg-blood/10 px-4 py-1 text-xs uppercase tracking-[0.25em] text-blood">
              {modality.short}
            </div>
            <h1 className="font-display text-5xl font-bold uppercase leading-[1.15] tracking-tight text-foreground md:text-7xl md:leading-[1.1]">
              {modality.tagline}
            </h1>
            <p className="mt-6 max-w-md text-base leading-relaxed text-muted-foreground md:text-lg">
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
          {[
            { icon: Calendar, title: "Aulas todos os dias", text: "Turmas pela manhã, tarde e noite. Encontre o horário que cabe na sua rotina." },
            { icon: Users, title: "Professores experientes", text: "Equipe técnica formada por instrutores dedicados e qualificados." },
            { icon: MessageCircle, title: "Aula experimental grátis", text: "Fale com a gente no chat e venha sentir o tatame antes de decidir." },
          ].map((c) => (
            <div key={c.title} className="group rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:border-blood/60 hover:shadow-blood">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-blood/10 text-blood">
                <c.icon className="h-6 w-6" />
              </div>
              <h3 className="font-display text-xl uppercase tracking-wider text-foreground">{c.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{c.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-6 pb-8">
        <div className="overflow-hidden rounded-3xl border border-blood/40 bg-gradient-to-br from-blood/20 via-card to-card p-10 text-center md:p-16">
          <h2 className="font-display text-3xl uppercase tracking-wider text-foreground md:text-5xl">
            Pronto para entrar no <span className="text-blood">tatame</span>?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            Toque no chat no canto da tela e fale direto com a gente — respondemos pelo WhatsApp.
          </p>
        </div>
      </section>

      <SiteFooter />
      <ChatbotWidget />
    </div>
  );
}

