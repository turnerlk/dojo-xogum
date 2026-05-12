import { useEffect, useState } from "react";
import xogunLogo from "@/assets/xogun-logo.png";

const WORDS = ["Respeito", "Disciplina", "Foco", "Evolução", "Oss"];

export function IntroSplash({ onDone }: { onDone: () => void }) {
  // step: 0..WORDS.length-1 = words, WORDS.length = logo small, WORDS.length+1 = logo maximizing
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (step < WORDS.length) {
      const t = setTimeout(() => setStep(step + 1), 150);
      return () => clearTimeout(t);
    }
    if (step === WORDS.length) {
      // show small logo briefly then maximize
      const t = setTimeout(() => setStep(step + 1), 600);
      return () => clearTimeout(t);
    }
    if (step === WORDS.length + 1) {
      // maximize + fade duration
      const t = setTimeout(() => onDone(), 1100);
      return () => clearTimeout(t);
    }
  }, [step, onDone]);

  const showingWord = step < WORDS.length;
  const showingSmallLogo = step === WORDS.length;
  const showingBigLogo = step === WORDS.length + 1;

  return (
    <div
      className={
        "fixed inset-0 z-[100] flex items-center justify-center bg-black transition-opacity duration-500 " +
        (showingBigLogo ? "opacity-0" : "opacity-100")
      }
      style={{ pointerEvents: showingBigLogo ? "none" : "auto" }}
    >
      {showingWord && (
        <h1
          key={step}
          className="font-display text-6xl font-bold uppercase tracking-[0.2em] md:text-8xl"
          style={{
            color: "oklch(0.55 0.22 27)",
            animation: "fade-in 0.4s ease-out",
          }}
        >
          {WORDS[step]}
        </h1>
      )}

      {(showingSmallLogo || showingBigLogo) && (
        <img
          src={xogunLogo}
          alt="XOGUN"
          className="transition-all duration-1000 ease-out drop-shadow-[0_0_60px_rgba(220,38,38,0.5)]"
          style={{
            width: showingBigLogo ? "90vmin" : "120px",
            height: showingBigLogo ? "90vmin" : "120px",
            opacity: showingBigLogo ? 0 : 1,
          }}
        />
      )}
    </div>
  );
}
