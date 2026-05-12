import type { ModalityId } from "@/components/ModalityContext";
import gabrielImg from "@/assets/gabriel-duarte.png";
import laraImg from "@/assets/lara-cassia.png";
import presuntinhoImg from "@/assets/presuntinho.png";
import victorImg from "@/assets/victor-pomar.png";

export type Teacher = {
  name: string;
  role: string;
  rank: string;
  bio: string;
  initials: string;
  photo?: string;
};

export const TEACHERS: Record<ModalityId, Teacher[]> = {
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
      bio: "Atleta competidora e educadora. Lidera turmas kids e fundamentos com técnica e carinho.",
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
