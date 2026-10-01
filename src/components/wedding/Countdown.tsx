import { useCountdown } from "@/hooks/useCountdown";
import SectionReveal from "./SectionReveal";
import DecoDivider from "./DecoDivider";

function Unit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex min-w-0 flex-col items-center justify-center leading-none">
      <span
        className="font-['Cormorant_Garamond'] font-semibold text-[26px] leading-none tabular-nums"
        style={{ color: "#fff" }}
      >
        {String(value).padStart(2, "0")}
      </span>
      <span
        className="mt-0 text-[8px] tracking-[0.2em] uppercase font-medium"
        style={{ color: "#fff" }}
      >
        {label}
      </span>
    </div>
  );
}

export default function Countdown() {
  const { days, hours, minutes, seconds } = useCountdown();
  const isOver = days === 0 && hours === 0 && minutes === 0 && seconds === 0;

  return (
    <section
      className="px-4 pb-4 pt-4 relative"
      style={{ background: "transparent" }}
    >
      <SectionReveal className="mx-auto max-w-sm text-center">
        <h2
          className="font-['Cormorant_Garamond'] text-xl font-semibold leading-none"
          style={{ color: "#fff" }}
        >
          Plus que...
        </h2>

        <div className="mt-2 mb-3 flex items-center justify-center gap-3">
          <div className="h-px w-10 bg-white/90" />
          <div className="h-px w-10 bg-white/90" />
        </div>

        {isOver ? (
          <p className="font-['Cormorant_Garamond'] text-lg italic text-white">
            Le grand jour est arrivé !
          </p>
        ) : (
          <div className="mt-3 flex items-start justify-center gap-2 leading-none">
            <Unit value={days} label="Jours" />
            <span
              className="font-['Cormorant_Garamond'] text-2xl leading-none"
              style={{ color: "#fff" }}
            >
              ·
            </span>
            <Unit value={hours} label="Heures" />
            <span
              className="font-['Cormorant_Garamond'] text-2xl leading-none"
              style={{ color: "#fff" }}
            >
              ·
            </span>
            <Unit value={minutes} label="Minutes" />
            <span
              className="font-['Cormorant_Garamond'] text-2xl leading-none"
              style={{ color: "#fff" }}
            >
              ·
            </span>
            <Unit value={seconds} label="Secondes" />
          </div>
        )}
      </SectionReveal>
    </section>
  );
}
