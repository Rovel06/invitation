import { CalendarDays, ClipboardCheck, Heart, MapPin } from "lucide-react";

export type NavTarget = "accueil" | "programme" | "rsvp" | "infos";
export type TabId = Exclude<NavTarget, "accueil">;

const SECTION_LINKS: {
  id: NavTarget;
  label: string;
  icon: typeof Heart;
}[] = [
  { id: "accueil", label: "Accueil", icon: Heart },
  { id: "programme", label: "Programme", icon: CalendarDays },
  { id: "rsvp", label: "Réponse", icon: ClipboardCheck },
  { id: "infos", label: "Infos", icon: MapPin },
];

interface Props {
  activeTab: TabId;
  onSelect: (target: NavTarget) => void;
}

export default function BeforeProgramSection({ activeTab, onSelect }: Props) {
  return (
    <section
      id="avant-programme"
      aria-label="Navigation"
      className="relative flex shrink-0 items-center justify-center overflow-hidden bg-motif-fleurs"
      style={{ backgroundColor: "hsl(var(--blue-ice))" }}
    >
      <nav
        aria-label="Navigation entre les sections"
        role="tablist"
        className="relative z-10 grid w-full grid-cols-4 border shadow-[0_6px_18px_hsl(224_68%_18%_/_0.16)]"
        style={{
          background: "hsl(var(--blue-navy))",
          borderColor: "hsl(var(--blue-cobalt))",
        }}
      >
        {SECTION_LINKS.map(({ id, label, icon: Icon }) => {
          const isTab = id !== "accueil";
          const selected = isTab && id === activeTab;
          return (
            <button
              key={id}
              type="button"
              role={isTab ? "tab" : undefined}
              aria-selected={isTab ? selected : undefined}
              aria-controls={isTab ? `panel-${id}` : undefined}
              onClick={() => onSelect(id)}
              className={`flex min-w-0 flex-col items-center gap-1 px-1 py-2 text-[0.68rem] transition-colors [@media(hover:hover)]:hover:bg-[hsl(var(--blue-cobalt))] focus-visible:bg-[hsl(var(--blue-cobalt))] focus-visible:outline-none ${
                selected ? "bg-[hsl(var(--blue-cobalt))]" : ""
              }`}
              style={{ color: "hsl(var(--blue-ice))" }}
            >
              <Icon className="h-4 w-4" strokeWidth={1.7} aria-hidden="true" />
              <span className="truncate max-w-full">{label}</span>
            </button>
          );
        })}
      </nav>
    </section>
  );
}
