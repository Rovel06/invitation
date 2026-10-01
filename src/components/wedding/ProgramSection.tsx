import SectionReveal from "./SectionReveal";
import DecoDivider from "./DecoDivider";
import type { ProgramEvent } from "@/types/types";
import {
  Flower2,
  UtensilsCrossed,
  Music,
  Cake,
  Sparkles,
  Camera,
} from "lucide-react";

const ICONS: Record<
  string,
  React.ComponentType<{ className?: string; strokeWidth?: number }>
> = {
  flower: Flower2,
  utensils: UtensilsCrossed,
  music: Music,
  cake: Cake,
  sparkles: Sparkles,
  camera: Camera,
};

const PROGRAM: ProgramEvent[] = [
  {
    time: "22 juin 2027",
    title: "Dot au village FOMOPEA",
    description:
      "Début de la célébration à partir de 17h dans le village FOMOPEA à Dschang.",
    icon: "flower",
  },
  {
    time: "26 juin 2027 · 12h",
    title: "Cérémonie civile",
    description: "Mariage civil à la mairie d'Efoulan, Yaoundé 6.",
    icon: "sparkles",
  },
  {
    time: "26 juin 2027 · 17h",
    title: "Vin d'honneur",
    description: "Célébration au Platinium Lounge à Tamtam.",
    icon: "camera",
  },
  {
    time: "26 juin 2027 · 20h",
    title: "Soirée",
    description: "Soirée festive à la Salle de fête de Kamthe Hôtel.",
    icon: "music",
  },
];

export default function ProgramSection() {
  return (
    <section
      id="programme"
      className="py-14 px-6 relative overflow-hidden"
      style={{ background: "hsl(var(--blue-ice))" }}
    >
      <div className="botanical-corner tl" />
      <div className="botanical-corner tr" />
      <SectionReveal className="max-w-sm mx-auto">
        <div className="text-center">
          <h2
            className="font-['Cormorant_Garamond'] text-3xl font-semibold"
            style={{ color: "hsl(var(--blue-navy))" }}
          >
            Programme des célébrations
          </h2>
          <DecoDivider label="22 & 26 juin 2027" />
        </div>

        <ol className="relative mt-2 space-y-0">
          {PROGRAM.map((event, i) => {
            const Icon = ICONS[event.icon] || Sparkles;
            return (
              <SectionReveal
                key={`${event.time}-${event.title}`}
                delay={`${i * 80}ms`}
                className="flex gap-4 pb-8 last:pb-0 relative"
              >
                {i < PROGRAM.length - 1 && (
                  <div
                    className="absolute left-[19px] top-10 bottom-0 w-px"
                    style={{ background: "hsl(var(--blue-pale))" }}
                  />
                )}
                <div
                  className="shrink-0 w-10 h-10 rounded-full flex items-center justify-center z-10"
                  style={{
                    border: "1.5px solid hsl(var(--blue-cobalt))",
                    background: "hsl(var(--blue-ice))",
                    color: "hsl(var(--blue-cobalt))",
                  }}
                >
                  <Icon className="w-4 h-4" strokeWidth={1.5} />
                </div>
                <div className="min-w-0 pt-1">
                  <div className="flex items-baseline gap-3 flex-wrap">
                    <span
                      className="font-['Cormorant_Garamond'] text-lg font-semibold leading-none"
                      style={{ color: "hsl(var(--blue-cobalt))" }}
                    >
                      {event.time}
                    </span>
                    <span
                      className="font-['Cormorant_Garamond'] text-base font-semibold"
                      style={{ color: "hsl(var(--blue-navy))" }}
                    >
                      {event.title}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                    {event.description}
                  </p>
                </div>
              </SectionReveal>
            );
          })}
        </ol>
      </SectionReveal>
    </section>
  );
}
