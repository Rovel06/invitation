import { useCallback, useEffect, useRef, useState } from "react";
import HeroSection from "@/components/wedding/HeroSection";
import BeforeProgramSection, {
  type NavTarget,
  type TabId,
} from "@/components/wedding/BeforeProgramSection";
import RsvpSection from "@/components/wedding/RsvpSection";
import ProgramSection from "@/components/wedding/ProgramSection";
import InfoSection from "@/components/wedding/InfoSection";
import DecoDivider from "@/components/wedding/DecoDivider";

type View = "hero" | "nav";

const TABS: { id: TabId; content: React.ReactNode }[] = [
  { id: "programme", content: <ProgramSection /> },
  { id: "rsvp", content: <RsvpSection /> },
  { id: "infos", content: <InfoSection /> },
];

/** Duration of the hero ↔ nav slide, also used to ignore trailing wheel/touch events. */
const TRANSITION_MS = 700;
/** Minimum vertical swipe distance (px) to trigger the switch on touch screens. */
const SWIPE_THRESHOLD = 50;

function Footer() {
  return (
    <footer
      className="py-5 px-6 text-center leading-tight"
      style={{ background: "hsl(var(--blue-navy))" }}
    >
      <DecoDivider className="mt-0 mb-3" />
      <p
        className="font-['Cormorant_Garamond'] italic text-lg"
        style={{ color: "hsl(var(--blue-ice))" }}
      >
        La mariée &amp; Le marié
      </p>
      <p
        className="mt-0.5 tracking-[0.18em] uppercase"
        style={{
          color: "hsl(var(--blue-pale))",
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "0.95rem",
          letterSpacing: "0.12em",
          fontStyle: "italic",
        }}
      >
        22 &amp; 26 juin 2027 · Dschang &amp; Yaoundé
      </p>
      <p className="text-xs mt-2" style={{ color: "hsl(var(--blue-pale))" }}>
        Avec tout notre amour, nous espérons vous voir ce jour si précieux.
      </p>
    </footer>
  );
}

export default function InvitationPage() {
  const [view, setView] = useState<View>("hero");
  const [activeTab, setActiveTab] = useState<TabId>("programme");
  const heroRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const lockedUntil = useRef(0);
  const touchStartY = useRef<number | null>(null);

  const switchView = useCallback((next: View) => {
    lockedUntil.current = Date.now() + TRANSITION_MS;
    if (next === "hero") heroRef.current?.scrollTo({ top: 0 });
    setView(next);
  }, []);

  // The page itself never scrolls: only the hero (if taller than the screen)
  // and the active tab panel have their own scroll.
  useEffect(() => {
    const html = document.documentElement;
    const prev = { overflow: html.style.overflow, overscroll: html.style.overscrollBehavior };
    html.style.overflow = "hidden";
    html.style.overscrollBehavior = "none";
    return () => {
      html.style.overflow = prev.overflow;
      html.style.overscrollBehavior = prev.overscroll;
    };
  }, []);

  // Keep keyboard focus / screen readers out of the off-screen view.
  useEffect(() => {
    if (heroRef.current) heroRef.current.inert = view !== "hero";
    if (navRef.current) navRef.current.inert = view !== "nav";
  }, [view]);

  const heroAtBottom = () => {
    const el = heroRef.current;
    return !el || el.scrollTop + el.clientHeight >= el.scrollHeight - 2;
  };

  const tryEnterNav = () => {
    if (view === "hero" && Date.now() >= lockedUntil.current && heroAtBottom()) {
      switchView("nav");
    }
  };

  useEffect(() => {
    if (view !== "hero") return;
    const onKey = (e: KeyboardEvent) => {
      if (["ArrowDown", "PageDown", " "].includes(e.key) && heroAtBottom()) {
        e.preventDefault();
        if (Date.now() >= lockedUntil.current) switchView("nav");
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [view, switchView]);

  const handleNavSelect = (target: NavTarget) => {
    if (target === "accueil") {
      switchView("hero");
    } else {
      setActiveTab(target);
    }
  };

  return (
    <div
      className="relative w-full md:max-w-[430px] mx-auto h-[100dvh] overflow-hidden"
      style={{ background: "hsl(var(--blue-ice))" }}
    >
      <div
        className="h-[200%] transition-transform ease-in-out motion-reduce:transition-none"
        style={{
          transitionDuration: `${TRANSITION_MS}ms`,
          transform: view === "nav" ? "translateY(-50%)" : "translateY(0)",
        }}
      >
        {/* 2. Accueil — landing view */}
        <div
          ref={heroRef}
          aria-hidden={view !== "hero"}
          className="h-1/2 overflow-y-auto overscroll-contain [container-type:size]"
          onWheel={(e) => {
            if (e.deltaY > 0) tryEnterNav();
          }}
          onTouchStart={(e) => {
            touchStartY.current = e.touches[0].clientY;
          }}
          onTouchMove={(e) => {
            if (touchStartY.current === null) return;
            if (touchStartY.current - e.touches[0].clientY > SWIPE_THRESHOLD) {
              touchStartY.current = null;
              tryEnterNav();
            }
          }}
          onTouchEnd={() => {
            touchStartY.current = null;
          }}
        >
          <HeroSection onEnterNav={() => switchView("nav")} />
        </div>

        {/* 1. Nav bar + tab panels — each panel scrolls on its own */}
        <div
          ref={navRef}
          aria-hidden={view !== "nav"}
          className="h-1/2 flex flex-col"
        >
          <BeforeProgramSection activeTab={activeTab} onSelect={handleNavSelect} />
          <div className="relative flex-1 min-h-0">
            {TABS.map(({ id, content }) => (
              <div
                key={id}
                id={`panel-${id}`}
                role="tabpanel"
                hidden={id !== activeTab}
                className="absolute inset-0 overflow-y-auto overscroll-contain"
              >
                {content}
                <Footer />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
