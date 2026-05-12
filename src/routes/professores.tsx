import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SiteHeader, SiteFooter } from "@/components/SiteLayout";
import { ChatbotWidget } from "@/components/ChatbotWidget";
import { useModality, useModalitySlide } from "@/components/ModalityContext";
import { Award } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { TEACHERS, type Teacher } from "@/data/professores";

export const Route = createFileRoute("/professores")({
  component: ProfessoresPage,
});

function ProfessoresPage() {
  const { modality } = useModality();
  const slide = useModalitySlide();
  const teachers = TEACHERS[modality.id];
  const [selected, setSelected] = useState<Teacher | null>(null);

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="mx-auto max-w-5xl px-6 py-16">
        <div className="mb-12 text-center">
          <div className="mb-3 inline-block rounded-full border border-blood/40 bg-blood/10 px-4 py-1 text-xs uppercase tracking-[0.25em] text-blood">
            Nossa equipe • {modality.label}
          </div>
          <h1 className="font-display text-4xl uppercase tracking-tight text-foreground md:text-6xl">
            Professores <span className="text-blood">XOGUN</span>
          </h1>
          <p className="mt-3 text-sm text-muted-foreground">Clique no card para ver a foto e a bio completa.</p>
        </div>

        <div key={slide.key} className={`grid gap-6 md:gap-8 md:grid-cols-2 ${slide.className}`}>
          {teachers.map((t) => (
            <article
              key={t.name}
              onClick={() => setSelected(t)}
              className="group flex cursor-pointer flex-col gap-5 rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:border-blood/60 hover:shadow-blood md:flex-row md:gap-7 md:p-8"
            >
              <div className="flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-blood to-blood/60 font-display text-3xl font-bold text-blood-foreground md:h-32 md:w-32">
                {t.photo ? (
                  <img src={t.photo} alt={t.name} loading="eager" decoding="async" fetchPriority="high" className="h-full w-full object-cover" />
                ) : (
                  t.initials
                )}
              </div>
              <div className="flex-1">
                <p className="font-display text-xl uppercase tracking-wider text-foreground transition-colors group-hover:text-blood md:text-2xl">
                  {t.name}
                </p>
                <p className="text-xs uppercase tracking-wider text-blood md:text-sm">{t.role}</p>
                <div className="mt-2 inline-flex items-center gap-2 rounded-full border border-border bg-secondary px-3 py-1 text-xs md:text-sm">
                  <Award className="h-3 w-3 text-blood md:h-4 md:w-4" />
                  <span className="text-secondary-foreground">{t.rank}</span>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground md:text-base" dangerouslySetInnerHTML={{ __html: t.bio }} />
              </div>
            </article>
          ))}
        </div>
      </main>

      <Dialog open={!!selected} onOpenChange={(open) => !open && setSelected(null)}>
        <DialogContent className="max-w-lg overflow-hidden border-border bg-card p-0">
          {selected && (
            <>
              <div className="h-56 w-full overflow-hidden">
                {selected.photo ? (
                  <img
                    src={selected.photo}
                    alt={selected.name}
                    className="h-full w-full object-cover object-top"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-blood/20 font-display text-7xl font-bold text-blood">
                    {selected.initials}
                  </div>
                )}
              </div>
              <div className="px-8 py-6">
                <DialogHeader>
                  <DialogTitle className="text-center font-display text-2xl uppercase tracking-wider text-card-foreground">
                    {selected.name}
                  </DialogTitle>
                  <DialogDescription className="mt-1 text-center text-xs uppercase tracking-[0.25em] text-blood">
                    {selected.role}
                  </DialogDescription>
                </DialogHeader>
                <div className="mt-4 flex justify-center">
                  <div className="inline-flex items-center gap-2 rounded-full border border-blood/40 bg-blood/10 px-4 py-1.5 text-xs uppercase tracking-wider">
                    <Award className="h-3.5 w-3.5 text-blood" />
                    <span className="text-card-foreground">{selected.rank}</span>
                  </div>
                </div>
                <p className="mt-5 text-sm leading-relaxed text-card-foreground/80" dangerouslySetInnerHTML={{ __html: selected.bio }} />
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      <SiteFooter />
      <ChatbotWidget />
    </div>
  );
}
