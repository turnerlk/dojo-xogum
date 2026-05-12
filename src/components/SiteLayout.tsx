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
        <p className="font-display text-base tracking-widest text-foreground">DOJÔ XOGUN</p>
        <p className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">Centro de Treinamento de Lutas</p>
        <div className="mt-3 flex flex-wrap justify-center gap-x-6 gap-y-1 text-xs text-muted-foreground">
          <span>Aqui a inclusão acontece de verdade!</span>
          <span>🧩 Diploma reconhecido pelo MEC</span>
          <span>📍 Rocha Miranda</span>
        </div>
        <div className="mt-4 flex justify-center">
          <a
            href="https://www.instagram.com/dojoxogun/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-xs font-medium transition-colors hover:border-blood hover:text-blood"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
            @dojoxogun
          </a>
        </div>
        <p className="mt-4">© {new Date().getFullYear()} • Oss! 🥋</p>
      </div>
    </footer>
  );
}
