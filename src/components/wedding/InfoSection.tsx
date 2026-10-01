import SectionReveal from "./SectionReveal";
import DecoDivider from "./DecoDivider";
import { MapPin, Clock } from "lucide-react";

const LOCATIONS = [
  {
    title: "Dot au village FOMOPEA",
    address: "Village FOMOPEA, Dschang",
    time: "22 juin 2027 · à partir de 17h",
    query: "Village FOMOPEA Dschang Cameroon",
  },
  {
    title: "Cérémonie civile",
    address: "Mairie d'Efoulan, Yaoundé 6",
    time: "26 juin 2027 · à partir de 12h",
    query: "Mairie d'Efoulan Yaoundé 6 Cameroon",
  },
  {
    title: "Vin d'honneur",
    address: "Platinium Lounge, Tamtam",
    time: "26 juin 2027 · à partir de 17h",
    query: "Platinium Lounge Tamtam Yaoundé Cameroon",
  },
  {
    title: "Soirée",
    address: "Salle de fête de Kamthe Hôtel",
    time: "26 juin 2027 · à partir de 20h",
    query: "Salle de fête de Kamthe Hôtel Yaoundé Cameroon",
  },
];

const getMapEmbedUrl = (query: string) =>
  `https://www.google.com/maps?q=${encodeURIComponent(query)}&z=14&output=embed`;

export default function InfoSection() {
  return (
    <section
      id="infos"
      className="py-14 px-6 relative"
      style={{ background: "hsl(var(--blue-ice))" }}
    >
      <div className="botanical-corner bl" />
      <div className="botanical-corner br" />
      <SectionReveal className="max-w-sm mx-auto">
        <div className="text-center">
          <h2
            className="font-['Cormorant_Garamond'] text-3xl font-semibold"
            style={{ color: "hsl(var(--blue-navy))" }}
          >
            Informations pratiques
          </h2>
          <DecoDivider label="Lieux & horaires" />
        </div>

        <div className="space-y-8">
          {LOCATIONS.map((location) => (
            <div key={location.title} className="space-y-3">
              <div className="flex gap-4">
                <div
                  className="shrink-0 w-10 h-10 rounded-sm flex items-center justify-center"
                  style={{
                    border: "1.5px solid hsl(var(--blue-cobalt))",
                    background: "hsl(var(--blue-pale))",
                  }}
                >
                  <MapPin
                    className="w-4 h-4"
                    style={{ color: "hsl(var(--blue-cobalt))" }}
                    strokeWidth={1.5}
                  />
                </div>
                <div className="min-w-0">
                  <h3
                    className="font-['Cormorant_Garamond'] text-lg font-semibold"
                    style={{ color: "hsl(var(--blue-navy))" }}
                  >
                    {location.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-0.5 leading-relaxed">
                    {location.address}
                  </p>
                  <p className="text-sm text-muted-foreground mt-0.5 leading-relaxed">
                    {location.time}
                  </p>
                  <a
                    href={`https://maps.google.com/?q=${encodeURIComponent(location.address)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs underline underline-offset-4 hover:opacity-70 transition-opacity mt-1 inline-block"
                    style={{ color: "hsl(var(--blue-cobalt))" }}
                  >
                    Ouvrir dans Google Maps →
                  </a>
                </div>
              </div>

              <div
                className="rounded-sm overflow-hidden w-full aspect-[4/3]"
                style={{ border: "1px solid hsl(var(--blue-pale))" }}
              >
                <iframe
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  style={{ border: 0 }}
                  referrerPolicy="no-referrer-when-downgrade"
                  src={getMapEmbedUrl(location.query)}
                  allowFullScreen
                  title={location.title}
                  loading="lazy"
                />
              </div>
            </div>
          ))}

          <div className="flex gap-4">
            <div
              className="shrink-0 w-10 h-10 rounded-sm flex items-center justify-center"
              style={{
                border: "1.5px solid hsl(var(--blue-cobalt))",
                background: "hsl(var(--blue-pale))",
              }}
            >
              <Clock
                className="w-4 h-4"
                style={{ color: "hsl(var(--blue-cobalt))" }}
                strokeWidth={1.5}
              />
            </div>
            <div className="min-w-0">
              <h3
                className="font-['Cormorant_Garamond'] text-lg font-semibold"
                style={{ color: "hsl(var(--blue-navy))" }}
              >
                Moment fort
              </h3>
              <p className="text-sm text-muted-foreground mt-0.5">
                Deux célébrations inoubliables : un premier rendez-vous à
                Dschang puis une journée festive à Yaoundé.
              </p>
            </div>
          </div>
        </div>
      </SectionReveal>
    </section>
  );
}
