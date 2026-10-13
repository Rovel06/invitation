import SectionReveal from "./SectionReveal";
import Countdown from "./Countdown";
import { ArrowDown } from "lucide-react";

const HERO_IMAGE =
  "https://miaoda-site-img.s3cdn.medo.dev/images/KLing_eab9c6ac-6678-4b9e-9493-a6b525e8bc0d.jpg";

interface Props {
  onEnterNav: () => void;
}

/**
 * Base size of the hero content: every size inside is in `em`, so the whole
 * block scales with the screen. The content measures 24em × 43em, so the base
 * follows whichever of width or height runs out first and fills the frame
 * without overflowing. `cqw`/`cqh` refer to the hero's container (see
 * InvitationPage), not the window, so it also works when the page is capped
 * on desktop.
 */
const HERO_FONT_SIZE = "clamp(12px, min(4.1cqw, 2.25cqh), 26px)";

export default function HeroSection({ onEnterNav }: Props) {
  return (
    <section
      id="accueil"
      className="relative min-h-[100dvh] flex flex-col items-center justify-center overflow-hidden"
    >
      <div className="absolute inset-0 z-0">
        <img
          src={HERO_IMAGE}
          alt="Décor floral bleu romantique de mariage"
          className="w-full h-full object-cover"
        />
        <div
          className="absolute inset-0"
          style={{ background: "hsla(224,68%,20%,0.62)" }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at center, transparent 35%, hsla(224,68%,10%,0.45) 100%)",
          }}
        />
      </div>
      <div className="botanical-corner tl z-10" style={{ opacity: 0.55 }} />
      <div className="botanical-corner tr z-10" style={{ opacity: 0.55 }} />
      <div className="botanical-corner bl z-10" style={{ opacity: 0.55 }} />
      <div className="botanical-corner br z-10" style={{ opacity: 0.55 }} />
      <div
        className="absolute inset-6 z-10 pointer-events-none"
        style={{ border: "1px solid hsl(207 53% 63% / 0.5)" }}
      />
      <div
        className="absolute inset-8 z-10 pointer-events-none"
        style={{ border: "1px solid hsl(207 53% 63% / 0.25)" }}
      />
      <div
        className="relative z-20 flex flex-col items-center text-center px-[2em] py-[2.5em] max-w-[24em] mx-auto"
        style={{ fontSize: HERO_FONT_SIZE }}
      >
        <SectionReveal delay="0ms">
          <p
            className="text-[0.75em] tracking-[0.4em] uppercase font-medium mb-[2em]"
            style={{ color: "hsl(var(--blue-pale))" }}
          >
            Vous êtes cordialement invités au mariage de
          </p>
        </SectionReveal>

        <SectionReveal delay="150ms">
          <div className="text-center leading-none gold-glow">
            <h1
              className="font-['Cormorant_Garamond'] font-semibold italic"
              style={{
                color: "hsl(var(--blue-ice))",
                fontSize: "2.6em",
              }}
            >
              La mariée
            </h1>
            <div
              className="font-['Cormorant_Garamond'] font-semibold italic"
              style={{
                color: "hsl(var(--blue-ice))",
                fontSize: "1.9em",
              }}
            >
              &
            </div>
            <h1
              className="font-['Cormorant_Garamond'] font-semibold italic"
              style={{
                color: "hsl(var(--blue-ice))",
                fontSize: "2.6em",
              }}
            >
              Le marié
            </h1>
          </div>
        </SectionReveal>

        <SectionReveal delay="300ms">
          <div className="flex items-center gap-[0.75em] my-[1.5em] w-[12em]">
            <div
              className="h-px flex-1"
              style={{
                background: "hsl(var(--blue-sky))",
                boxShadow: "0 2px 0 hsl(var(--blue-sky))",
              }}
            />
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              className="shrink-0"
            >
              <rect
                x="5"
                y="0"
                width="4"
                height="4"
                fill="hsl(207 53% 63%)"
                transform="rotate(45 7 2)"
              />
            </svg>
            <div
              className="h-px flex-1"
              style={{
                background: "hsl(var(--blue-sky))",
                boxShadow: "0 2px 0 hsl(var(--blue-sky))",
              }}
            />
          </div>
        </SectionReveal>

        <SectionReveal delay="400ms">
          <p
            className="font-['Cormorant_Garamond'] text-[1.25em]"
            style={{ color: "hsl(var(--blue-ice))" }}
          >
            22 &amp; 26 juin 2027
          </p>
          <p
            className="text-[0.875em] mt-[0.25em]"
            style={{ color: "hsl(var(--blue-pale))" }}
          >
            Dschang &amp; Yaoundé
          </p>
          <div
            className="mt-[0.5em] text-center"
            style={{ color: "hsl(var(--blue-pale))" }}
          >
            <p className="font-['Cormorant_Garamond'] text-[1em] italic leading-snug">
              Dot au village FOMOPEA
            </p>
            <p className="font-['Cormorant_Garamond'] text-[1em] italic leading-snug">
              Civil et soirée à Yaoundé
            </p>
          </div>
        </SectionReveal>

        <SectionReveal delay="550ms">
          <button
            id="scroll-to-nav"
            type="button"
            onClick={onEnterNav}
            aria-label="Découvrir le programme"
            className="press-me-button mt-[2.5em] inline-flex h-[5em] w-[5em] items-center justify-center rounded-full transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 active:scale-95"
            style={{
              background:
                "linear-gradient(145deg, hsl(43 72% 54%), hsl(32 82% 28%))",
              color: "hsl(44 86% 82%)",
              boxShadow:
                "0 0 0 1px hsl(43 72% 68% / 0.7), 0 7px 20px hsl(32 82% 15% / 0.5), inset 0 2px 3px hsl(45 100% 86% / 0.35)",
            }}
          >
            <ArrowDown
              className="h-[1.25em] w-[1.25em]"
              strokeWidth={1.8}
              aria-hidden="true"
            />
          </button>
        </SectionReveal>

        <div className="mt-[0.75em] w-full">
          <Countdown />
        </div>
      </div>
    </section>
  );
}
