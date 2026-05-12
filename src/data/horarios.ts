import type { ModalityId } from "@/components/ModalityContext";

type Slot = { days: string; time: string };
export type Group = { title: string; age?: string; slots: Slot[]; note?: string };

export const GROUPS: Record<ModalityId, Group[]> = {
  jiujitsu: [
    {
      title: "Baby",
      age: "3 a 7 anos",
      slots: [
        { days: "Segunda • Quarta • Sexta", time: "17:30" },
        { days: "Segunda • Quarta • Sexta", time: "18:30" },
      ],
    },
    {
      title: "Kids",
      age: "8 a 12 anos",
      slots: [
        { days: "Segunda • Quarta • Sexta", time: "19:30" },
      ],
    },
    {
      title: "Adulto / Juvenil",
      slots: [
        { days: "Segunda • Quarta • Sexta", time: "20:30" },
        { days: "Terça • Quinta", time: "20:00" },
      ],
      note: "As turmas de Terça e Quinta também treinam junto na aula de Sexta — todo mundo no mesmo tatame, fortalecendo a equipe e trocando experiência entre os alunos.",
    },
  ],
  muaythai: [
    {
      title: "Muay Thai",
      slots: [{ days: "Terça • Quinta", time: "19:00" }],
    },
  ],
  aikido: [
    {
      title: "Aikido",
      slots: [
        { days: "Terça • Quinta", time: "21:00" },
      ],
    },
  ],
};
