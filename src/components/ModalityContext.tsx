import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import jiuLogo from "@/assets/xogun-logo.png";
import muayLogo from "@/assets/muaythai-logo.png";
import aikidoLogo from "@/assets/aikido-logo.png";

export type ModalityId = "jiujitsu" | "muaythai" | "aikido";

export type Modality = {
  id: ModalityId;
  label: string;
  short: string;
  tagline: string;
  description: string;
  logo: string;
  accentName: string; // for "blood" word swap
};

export const MODALITIES: Modality[] = [
  {
    id: "jiujitsu",
    label: "Jiu Jitsu",
    short: "Dojo XOGUN",
    tagline: "Tradição, Técnica e Disciplina.",
    description:
      "Na XOGUN, formamos guerreiros através do Jiu Jitsu. Aulas para todas as idades — venha fazer sua aula experimental.",
    logo: jiuLogo,
    accentName: "blood",
  },
  {
    id: "muaythai",
    label: "Muay Thai",
    short: "Kai Muay Sahet",
    tagline: "Força, Ritmo e Coração.",
    description:
      "A arte das oito armas tailandesa. Treinos intensos com técnica, condicionamento e tradição do Muay Thai.",
    logo: muayLogo,
    accentName: "gold",
  },
  {
    id: "aikido",
    label: "Aikido",
    short: "Caminho da Harmonia",
    tagline: "Equilíbrio, Fluxo e Harmonia.",
    description:
      "A arte marcial japonesa do não-conflito. Aprenda a redirecionar a força com técnica, postura e serenidade.",
    logo: aikidoLogo,
    accentName: "azul",
  },
];

type Ctx = {
  modality: Modality;
  setModalityId: (id: ModalityId) => void;
};

const ModalityCtx = createContext<Ctx | null>(null);

export function ModalityProvider({ children }: { children: ReactNode }) {
  const [id, setId] = useState<ModalityId>("jiujitsu");

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.setAttribute("data-modality", id);
    }
  }, [id]);

  const modality = MODALITIES.find((m) => m.id === id) ?? MODALITIES[0];

  return (
    <ModalityCtx.Provider value={{ modality, setModalityId: setId }}>
      {children}
    </ModalityCtx.Provider>
  );
}

export function useModality() {
  const ctx = useContext(ModalityCtx);
  if (!ctx) throw new Error("useModality must be inside ModalityProvider");
  return ctx;
}
