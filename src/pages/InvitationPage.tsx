import HeroSection from "@/components/wedding/HeroSection";
import BeforeProgramSection from "@/components/wedding/BeforeProgramSection";
import RsvpSection from "@/components/wedding/RsvpSection";
import ProgramSection from "@/components/wedding/ProgramSection";
import InfoSection from "@/components/wedding/InfoSection";
import DecoDivider from "@/components/wedding/DecoDivider";

export default function InvitationPage() {
  return (
    <div
      className="w-full max-w-[430px] mx-auto min-h-screen overflow-x-hidden"
      style={{ background: "hsl(var(--blue-ice))" }}
    >
      <HeroSection />
      <BeforeProgramSection />
      <ProgramSection />
      <RsvpSection />
      <InfoSection />

      {/* Footer */}
      <footer
        className="py-10 px-6 text-center"
        style={{ background: "hsl(var(--blue-navy))" }}
      >
        <DecoDivider />
        <p
          className="font-['Cormorant_Garamond'] italic text-lg"
          style={{ color: "hsl(var(--blue-ice))" }}
        >
          Ariane Dora &amp; Ghislain
        </p>
        <p
          className="mt-1 tracking-[0.18em] uppercase"
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
        <p className="text-xs mt-4" style={{ color: "hsl(var(--blue-pale))" }}>
          Avec tout notre amour, nous espérons vous voir ce jour si précieux.
        </p>
      </footer>
    </div>
  );
}
