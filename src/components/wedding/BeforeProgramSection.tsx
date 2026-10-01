import { CalendarDays, ClipboardCheck, Heart, MapPin } from "lucide-react";

const SECTION_LINKS = [
  { href: "#accueil", label: "Accueil", icon: Heart },
  { href: "#programme", label: "Programme", icon: CalendarDays },
  { href: "#rsvp", label: "Réponse", icon: ClipboardCheck },
  { href: "#infos", label: "Infos", icon: MapPin },
];

export default function BeforeProgramSection() {
  return (
    <section
      id="avant-programme"
      aria-label="Section à compléter"
      className="relative flex min-h-[55dvh] items-center justify-center overflow-hidden"
      style={{ background: "hsl(var(--blue-ice))" }}
    >
      <img
        src="/images/fleurs-haut-gauche.jpg"
        alt=""
        aria-hidden="true"
        className="fleurs-haut-gauche"
      />
      <img
        src="/images/fleurs-bas-droite.jpg"
        alt=""
        aria-hidden="true"
        className="fleurs-bas-droite"
      />
      <nav
        aria-label="Navigation entre les sections"
        className="relative z-10 mt-[12dvh] grid w-[calc(100%-2rem)] max-w-[400px] grid-cols-4 border shadow-[0_6px_18px_hsl(224_68%_18%_/_0.16)]"
        style={{
          background: "hsl(var(--blue-navy))",
          borderColor: "hsl(var(--blue-cobalt))",
        }}
      >
        {SECTION_LINKS.map(({ href, label, icon: Icon }) => (
          <a
            key={href}
            href={href}
            className="flex min-w-0 flex-col items-center gap-1 px-1 py-2 text-[0.68rem] transition-colors hover:bg-[hsl(var(--blue-cobalt))] focus-visible:bg-[hsl(var(--blue-cobalt))] focus-visible:outline-none"
            style={{ color: "hsl(var(--blue-ice))" }}
          >
            <Icon className="h-4 w-4" strokeWidth={1.7} aria-hidden="true" />
            <span className="truncate max-w-full">{label}</span>
          </a>
        ))}
      </nav>
    </section>
  );
}