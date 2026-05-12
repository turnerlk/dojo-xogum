import { useState } from "react";
import { MessageCircle, X, Send } from "lucide-react";

const WHATSAPP_NUMBER = "5511999999999"; // placeholder
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  "Olá! Vim pelo site da XOGUN e quero saber mais sobre as aulas."
)}`;

type Msg = { from: "bot" | "user"; text: string; cta?: boolean };

const QUICK = [
  { q: "Quero fazer aula experimental", a: "Boa! A primeira aula é gratuita 🥋. Toque no botão abaixo para falar conosco no WhatsApp e agendar." },
  { q: "Quais os horários?", a: "Temos turmas de seg a sáb, manhã e noite. Veja a página de Horários ou fale no WhatsApp para detalhes." },
  { q: "Quanto custa?", a: "Mande mensagem no WhatsApp para um valor personalizado de acordo com o plano." },
  { q: "Onde fica?", a: "Estamos em Rocha Miranda, na Praça 8 de Maio. Fale no WhatsApp para mais detalhes." },
];

export function ChatbotWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([
    { from: "bot", text: "Oss! 🥋 Sou o assistente da XOGUN. Em que posso ajudar?" },
  ]);

  const ask = (item: typeof QUICK[number]) => {
    setMessages((m) => [
      ...m,
      { from: "user", text: item.q },
      { from: "bot", text: item.a, cta: true },
    ]);
  };

  return (
    <>
      <button
        onClick={() => setOpen((o) => !o)}
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-blood text-blood-foreground shadow-blood transition-transform hover:scale-110"
        aria-label="Abrir chat"
      >
        {open ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </button>

      {open && (
        <div className="fixed bottom-24 right-6 z-50 flex h-[28rem] w-[22rem] max-w-[calc(100vw-3rem)] flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-deep">
          <div className="flex items-center gap-3 border-b border-border bg-gradient-to-r from-blood to-blood/70 px-4 py-3">
            <div className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
            <div>
              <div className="font-display text-sm font-bold tracking-wider text-blood-foreground">XOGUN BOT</div>
              <div className="text-[10px] text-blood-foreground/80">Resposta rápida</div>
            </div>
          </div>

          <div className="flex-1 space-y-3 overflow-y-auto p-4">
            {messages.map((m, i) => (
              <div key={i} className={m.from === "user" ? "flex justify-end" : "flex justify-start"}>
                <div
                  className={
                    "max-w-[85%] rounded-2xl px-3 py-2 text-sm " +
                    (m.from === "user"
                      ? "rounded-br-sm bg-blood text-blood-foreground"
                      : "rounded-bl-sm bg-secondary text-secondary-foreground")
                  }
                >
                  {m.text}
                  {m.cta && (
                    <a
                      href={WHATSAPP_URL}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-2 flex items-center justify-center gap-2 rounded-lg bg-emerald-600 px-3 py-2 text-xs font-semibold uppercase tracking-wider text-white transition-colors hover:bg-emerald-500"
                    >
                      <Send className="h-3 w-3" /> Falar no WhatsApp
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-border bg-background/60 p-3">
            <div className="mb-2 text-[10px] uppercase tracking-wider text-muted-foreground">Perguntas rápidas</div>
            <div className="flex flex-wrap gap-2">
              {QUICK.map((q) => (
                <button
                  key={q.q}
                  onClick={() => ask(q)}
                  className="rounded-full border border-border bg-secondary px-3 py-1.5 text-xs text-secondary-foreground transition-colors hover:border-blood hover:text-blood"
                >
                  {q.q}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
