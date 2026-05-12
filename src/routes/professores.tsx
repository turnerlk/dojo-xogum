import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SiteHeader, SiteFooter } from "@/components/SiteLayout";
import { ChatbotWidget } from "@/components/ChatbotWidget";
import { useModality, type ModalityId } from "@/components/ModalityContext";
import { Award } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import gabrielImg from "@/assets/gabriel-duarte.png";
import laraImg from "@/assets/lara-cassia.png";
import presuntinhoImg from "@/assets/presuntinho.png";
import victorImg from "@/assets/victor-pomar.png";

export const Route = createFileRoute("/professores")({
  head: () => ({
    meta: [
      { title: "Professores — XOGUN" },
      { name: "description", content: "Conheça os professores da escola XOGUN — Jiu Jitsu, Muay Thai e Aikido." },
      { property: "og:title", content: "Professores — XOGUN" },
      { property: "og:description", content: "Equipe técnica formada por instrutores experientes." },
    ],
  }),
  component: ProfessoresPage,
});

type Teacher = { name: string; role: string; rank: string; bio: string; initials: string; photo?: string };

const TEACHERS: Record<ModalityId, Teacher[]> = {
  jiujitsu: [
    {
      name: "Gabriel Duarte",
      role: "Professor",
      rank: "Faixa Preta 3º grau",
      bio: "Mais de 20 anos no Jiu Jitsu, fundador da XOGUN. Formador de campeões e referência técnica.",
      initials: "GD",
      photo: gabrielImg,
    },
    {
      name: "Lara Cássia",
      role: "Professora",
      rank: "Faixa Marrom",
      bio: "Atleta competidora e educadora. Lidera turmas femininas, kids e fundamentos com técnica e carinho.",
      initials: "LC",
      photo: laraImg,
    },
  ],
  muaythai: [
    {
      name: "Presuntinho",
      role: "Professor de Muay Thai",
      rank: "Khru — Faixa Preta",
      bio: "Lutador experiente e treinador completo. Comanda os treinos de Muay Thai com tradição tailandesa, técnica e ritmo.",
      initials: "PR",
      photo: presuntinhoImg,
    },
  ],
  aikido: [
    {
      name: "Victor Pomar",
      role: "Sensei de Aikido",
      rank: "Faixa Preta — Yudansha",
      bio: "Pratica Aikido há mais de uma década. Ensina o caminho da harmonia com foco em postura, respiração e fluxo.",
      initials: "VP",
      photo: victorImg,
    },
  ],
};

function ProfessoresPage() {
  const { modality } = useModality();
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
          <p className="mt-3 text-sm text-muted-foreground">Clique no nome do professor para ver a foto e a bio.</p>
        </div>

        <div className="grid gap-6 md:gap-8 md:grid-cols-2">
          {teachers.map((t) => (
            <article key={t.name} className="group flex flex-col gap-5 rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:border-blood/60 hover:shadow-blood md:flex-row md:gap-7 md:p-8">
              <div className="flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-blood to-blood/60 font-display text-3xl font-bold text-blood-foreground md:h-32 md:w-32">
                {t.photo ? (
                  <img src={t.photo} alt={t.name} loading="eager" decoding="async" fetchPriority="high" className="h-full w-full object-cover" />
                ) : (
                  t.initials
                )}
              </div>
              <div className="flex-1">
                <button
                  type="button"
                  onClick={() => setSelected(t)}
                  className="text-left font-display text-xl uppercase tracking-wider text-foreground transition-colors hover:text-blood focus:outline-none focus-visible:text-blood md:text-2xl"
                >
                  {t.name}
                </button>
                <p className="text-xs uppercase tracking-wider text-blood md:text-sm">{t.role}</p>
                <div className="mt-2 inline-flex items-center gap-2 rounded-full border border-border bg-secondary px-3 py-1 text-xs md:text-sm">
                  <Award className="h-3 w-3 text-blood md:h-4 md:w-4" />
                  <span className="text-secondary-foreground">{t.rank}</span>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground md:text-base">{t.bio}</p>
              </div>
            </article>
          ))}
        </div>
      </main>

      <Dialog open={!!selected} onOpenChange={(open) => !open && setSelected(null)}>
        <DialogContent className="max-w-lg overflow-hidden border-blood/30 bg-gradient-to-b from-card via-background to-background p-0">
          {selected && (
            <>
              <div className="relative h-72 w-full overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blood/40 via-background to-background" />
                {selected.photo ? (
                  <>
                    <img
                      src={selected.photo}
                      alt={selected.name}
                      className="absolute inset-0 h-full w-full object-cover object-top opacity-90"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-r from-blood/20 via-transparent to-blood/20 mix-blend-overlay" />
                  </>
                ) : (
                  <div className="flex h-full w-full items-center justify-center font-display text-7xl font-bold text-blood-foreground">
                    {selected.initials}
                  </div>
                )}
              </div>
              <div className="relative -mt-10 px-8 pb-8">
                <DialogHeader>
                  <DialogTitle className="text-center font-display text-3xl uppercase tracking-wider drop-shadow-lg">
                    {selected.name}
                  </DialogTitle>
                  <DialogDescription className="mt-2 text-center text-xs uppercase tracking-[0.25em] text-blood">
                    {selected.role}
                  </DialogDescription>
                </DialogHeader>
                <div className="mt-4 flex justify-center">
                  <div className="inline-flex items-center gap-2 rounded-full border border-blood/40 bg-blood/10 px-4 py-1.5 text-xs uppercase tracking-wider">
                    <Award className="h-3.5 w-3.5 text-blood" />
                    <span className="text-foreground">{selected.rank}</span>
                  </div>
                </div>
                <p className="mt-5 text-center text-sm leading-relaxed text-muted-foreground">{selected.bio}</p>
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
