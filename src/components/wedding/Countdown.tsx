import { useCountdown } from "@/hooks/useCountdown";
import SectionReveal from "./SectionReveal";
import DecoDivider from "./DecoDivider";

function Unit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex min-w-0 flex-col items-center justify-center leading-none">
      <span
        className="font-['Cormorant_Garamond'] font-semibold text-[1.625em] leading-none tabular-nums"
        style={{ color: "#fff" }}
      >
        {String(value).padStart(2, "0")}
      </span>
      <span
        className="mt-0 text-[0.5em] tracking-[0.2em] uppercase font-medium"
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
      className="px-[1em] py-[1em] relative"
      style={{ background: "transparent" }}
    >
      <SectionReveal className="mx-auto max-w-[24em] text-center">
        <h2
          className="font-['Cormorant_Garamond'] text-[1.25em] font-semibold leading-none"
          style={{ color: "#fff" }}
        >
          Plus que...
        </h2>

        <div className="mt-[0.5em] mb-[0.75em] flex items-center justify-center gap-[0.75em]">
          <div className="h-px w-[2.5em] bg-white/90" />
          <div className="h-px w-[2.5em] bg-white/90" />
        </div>

        {isOver ? (
          <p className="font-['Cormorant_Garamond'] text-[1.125em] italic text-white">
            Le grand jour est arrivé !
          </p>
        ) : (
          <div className="mt-[0.75em] flex items-start justify-center gap-[0.5em] leading-none">
            <Unit value={days} label="Jours" />
            <span
              className="font-['Cormorant_Garamond'] text-[1.5em] leading-none"
              style={{ color: "#fff" }}
            >
              ·
            </span>
            <Unit value={hours} label="Heures" />
            <span
              className="font-['Cormorant_Garamond'] text-[1.5em] leading-none"
              style={{ color: "#fff" }}
            >
              ·
            </span>
            <Unit value={minutes} label="Minutes" />
            <span
              className="font-['Cormorant_Garamond'] text-[1.5em] leading-none"
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
