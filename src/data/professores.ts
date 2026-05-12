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
      bio: "Se você pensa que Muaythai é São so socos e chutes, pare por ai. Rodrigo Alves, mais conhecido como Presuntinho, com mais da metade da vida dentro do Muaythai. Atuo como professor e treinador e falo com experiência de quem vive isso diariamente.",
      initials: "PR",
      photo: presuntinhoImg,
    },
  ],
  aikido: [
    {
      name: "Victor Pomar",
      role: "Sensei de Aikido",
      rank: "Faixa Preta — Yudansha",
      bio: "Victor Pomar é um Sensei de Aikido da FACERJ Aikido, com atuação destacada no Rio de Janeiro. Ele é reconhecido por seu trabalho de difusão da arte marcial desde a década de 1990.<br />Experiência:<br />Praticante de longa data, já era ativo na modalidade em meados de 1996. Foco Pedagógico: Suas aulas buscam harmonizar o praticante com o adversário, seguindo os princípios tradicionais da arte marcial japonesa",
      initials: "VP",
      photo: victorImg,
    },
  ],
};
