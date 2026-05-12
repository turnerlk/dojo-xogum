import { Link } from "@tanstack/react-router";
import { useModality, MODALITIES } from "@/components/ModalityContext";

export function SiteHeader() {
  const { modality, setModalityId } = useModality();

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-6 py-4 md:flex-row md:items-center md:justify-between">
        <Link to="/" className="flex items-center gap-3">
          <img src={modality.logo} alt={`${modality.label} logo`} className="h-11 w-11 rounded-full ring-2 ring-blood/40" />
          <div className="leading-tight">
            <div className="font-display text-lg font-bold tracking-widest text-foreground">XOGUN</div>
            <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">{modality.short}</div>
          </div>
        </Link>

        <nav className="hidden gap-8 text-sm font-medium uppercase tracking-wider md:flex">
          <Link to="/" activeOptions={{ exact: true }} className="text-muted-foreground transition-colors hover:text-blood [&.active]:text-blood">Início</Link>
          <Link to="/horarios" className="text-muted-foreground transition-colors hover:text-blood [&.active]:text-blood">Horários</Link>
          <Link to="/professores" className="text-muted-foreground transition-colors hover:text-blood [&.active]:text-blood">Professores</Link>
        </nav>
      </div>

      {/* Tabs de modalidade */}
      <div className="border-t border-border/40 bg-card/40">
        <div className="mx-auto flex max-w-6xl justify-center gap-2 overflow-x-auto px-3 py-3">
          {MODALITIES.map((m) => {
            const active = m.id === modality.id;
            return (
              <button
                key={m.id}
                onClick={() => setModalityId(m.id)}
                className={
                  "flex items-center gap-2.5 whitespace-nowrap rounded-full px-5 py-2.5 text-sm font-semibold uppercase tracking-wider transition-all " +
                  (active
                    ? "bg-blood text-blood-foreground shadow-blood"
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground")
                }
              >
                <img src={m.logo} alt="" className="h-6 w-6 rounded-full" />
                {m.label}
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-border/60 bg-card/40">
      <div className="mx-auto max-w-6xl px-6 py-10 text-center text-sm text-muted-foreground">
        <p className="font-display text-base tracking-widest text-foreground">XOGUN — DOJÔ GABRIEL DUARTE</p>
        <p className="mt-2">© {new Date().getFullYear()} • Oss! 🥋</p>
      </div>
    </footer>
  );
}
