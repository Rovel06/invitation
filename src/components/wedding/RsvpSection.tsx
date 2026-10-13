import { useState } from "react";
import { toast } from "sonner";
import { submitRsvp } from "@/services/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import SectionReveal from "./SectionReveal";
import DecoDivider from "./DecoDivider";
import { Heart, X, CheckCircle2 } from "lucide-react";

type Attending = "yes" | "no" | null;

export default function RsvpSection() {
  const [status, setStatus] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [drinkPreference, setDrinkPreference] = useState("");
  const [customDrink, setCustomDrink] = useState("");
  const [beerPreference, setBeerPreference] = useState("");
  const [relationship, setRelationship] = useState("");
  const [attending, setAttending] = useState<Attending>(null);
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [statusError, setStatusError] = useState("");
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [drinkError, setDrinkError] = useState("");
  const [relationshipError, setRelationshipError] = useState("");
  const [attendingError, setAttendingError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    let valid = true;
    setStatusError("");
    setNameError("");
    setEmailError("");
    setPhoneError("");
    setDrinkError("");
    setRelationshipError("");
    setAttendingError("");

    if (!status.trim()) {
      setStatusError("Veuillez choisir votre statut.");
      valid = false;
    }

    if (!name.trim()) {
      setNameError("Veuillez indiquer votre prénom et nom.");
      valid = false;
    }

    const trimmedEmail = email.trim();
    if (!trimmedEmail) {
      setEmailError("Veuillez renseigner votre adresse e-mail.");
      valid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      setEmailError("Veuillez entrer une adresse e-mail valide.");
      valid = false;
    }

    const trimmedPhone = phone.trim();
    if (!trimmedPhone) {
      setPhoneError("Veuillez renseigner votre numéro de téléphone.");
      valid = false;
    } else if (!/^[0-9+\s().-]{7,20}$/.test(trimmedPhone)) {
      setPhoneError("Veuillez entrer un numéro de téléphone valide.");
      valid = false;
    }

    const effectiveDrink =
      drinkPreference === "Autre"
        ? customDrink.trim()
        : drinkPreference === "Bières"
          ? beerPreference.trim()
          : drinkPreference.trim();

    if (!effectiveDrink) {
      setDrinkError(
        drinkPreference === "Autre"
          ? "Veuillez préciser votre boisson souhaitée."
          : drinkPreference === "Bières"
            ? "Veuillez préciser votre bière préférée."
            : "Veuillez choisir votre boisson souhaitée.",
      );
      valid = false;
    }

    if (!relationship.trim()) {
      setRelationshipError("Veuillez choisir votre relation avec le couple.");
      valid = false;
    }

    if (attending === null) {
      setAttendingError("Veuillez choisir votre réponse.");
      valid = false;
    }
    if (!valid) return;

    setSubmitting(true);
    const result = await submitRsvp({
      status: status.trim(),
      guest_name: name.trim(),
      email: trimmedEmail,
      phone_number: trimmedPhone,
      drink_preference: effectiveDrink,
      relationship: relationship.trim(),
      attending: attending === "yes",
      message: message.trim() || undefined,
    });
    setSubmitting(false);

    if (result.success) {
      setSubmitted(true);
      toast.success(
        attending === "yes"
          ? "Merci ! Nous avons hâte de vous voir !"
          : "Merci pour votre réponse. Vous serez présent dans nos pensées.",
      );
    } else {
      toast.error("Une erreur est survenue. Veuillez réessayer.");
    }
  }

  return (
    <section
      id="rsvp"
      className="py-14 px-6 relative bg-motif-fleurs"
      style={{ backgroundColor: "hsl(var(--blue-pale))" }}
    >
      <div className="botanical-corner bl" />
      <div className="botanical-corner br" />
      <SectionReveal className="max-w-sm mx-auto text-center">
        <h2
          className="font-['Cormorant_Garamond'] text-3xl font-semibold"
          style={{ color: "hsl(var(--blue-navy))" }}
        >
          Votre Réponse
        </h2>
        <p className="text-sm text-muted-foreground mt-2">
          Merci de confirmer votre présence avant le{" "}
          <strong>1er mai 2027</strong>
        </p>
        <DecoDivider label="RSVP" />

        {submitted ? (
          <div className="flex flex-col items-center gap-4 py-8">
            <CheckCircle2
              className="w-12 h-12"
              style={{ color: "hsl(var(--blue-cobalt))" }}
              strokeWidth={1.5}
            />
            <p
              className="font-['Cormorant_Garamond'] text-xl"
              style={{ color: "hsl(var(--blue-navy))" }}
            >
              {attending === "yes"
                ? "Avec joie, à très bientôt !"
                : "Merci pour votre réponse."}
            </p>
            <button
              type="button"
              onClick={() => {
                setSubmitted(false);
                setStatus("");
                setName("");
                setEmail("");
                setPhone("");
                setDrinkPreference("");
                setCustomDrink("");
                setBeerPreference("");
                setRelationship("");
                setAttending(null);
                setMessage("");
              }}
              className="text-xs text-muted-foreground underline underline-offset-4 hover:text-foreground transition-colors"
            >
              Modifier ma réponse
            </button>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="space-y-6 text-left mt-6"
            noValidate
          >
            <div className="space-y-1">
              <Label
                htmlFor="guest_status"
                className="text-sm font-medium text-foreground"
              >
                Statut <span className="text-primary">*</span>
              </Label>
              <select
                id="guest_status"
                value={status}
                onChange={(e) => {
                  setStatus(e.target.value);
                  setStatusError("");
                }}
                className="flex h-9 w-full rounded-md border px-3 py-1 shadow-sm bg-background text-base"
                style={{
                  borderColor: "hsl(var(--blue-pale))",
                  color: "hsl(var(--blue-navy))",
                }}
              >
                <option value="">Choisir un statut</option>
                <option value="M.">M.</option>
                <option value="Mlle">Mlle</option>
                <option value="M. & Mme">M. & Mme</option>
              </select>
              {statusError && (
                <p className="text-xs text-destructive">{statusError}</p>
              )}
            </div>

            {/* Name */}
            <div className="space-y-1">
              <Label
                htmlFor="guest_name"
                className="text-sm font-medium text-foreground"
              >
                Votre prénom et nom <span className="text-primary">*</span>
              </Label>
              <Input
                id="guest_name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  setNameError("");
                }}
                placeholder="Ex. Marie Dupont"
                className="bg-background border-border text-base"
                style={
                  {
                    "--tw-ring-color": "hsl(var(--blue-cobalt))",
                  } as React.CSSProperties
                }
              />
              {nameError && (
                <p className="text-xs text-destructive">{nameError}</p>
              )}
            </div>

            <div className="space-y-1">
              <Label
                htmlFor="guest_email"
                className="text-sm font-medium text-foreground"
              >
                Email <span className="text-primary">*</span>
              </Label>
              <Input
                id="guest_email"
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setEmailError("");
                }}
                placeholder="Ex. marie.dupont@email.com"
                className="bg-background border-border text-base"
                style={
                  {
                    "--tw-ring-color": "hsl(var(--blue-cobalt))",
                  } as React.CSSProperties
                }
              />
              {emailError && (
                <p className="text-xs text-destructive">{emailError}</p>
              )}
            </div>

            <div className="space-y-1">
              <Label
                htmlFor="guest_phone"
                className="text-sm font-medium text-foreground"
              >
                Numéro de téléphone <span className="text-primary">*</span>
              </Label>
              <Input
                id="guest_phone"
                type="tel"
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value);
                  setPhoneError("");
                }}
                placeholder="Ex. +237 6XX XXX XXX"
                className="bg-background border-border text-base"
                style={
                  {
                    "--tw-ring-color": "hsl(var(--blue-cobalt))",
                  } as React.CSSProperties
                }
              />
              {phoneError && (
                <p className="text-xs text-destructive">{phoneError}</p>
              )}
            </div>

            <div className="space-y-1">
              <Label
                htmlFor="drink_preference"
                className="text-sm font-medium text-foreground"
              >
                Boisson souhaitée <span className="text-primary">*</span>
              </Label>
              <select
                id="drink_preference"
                value={drinkPreference}
                onChange={(e) => {
                  const nextValue = e.target.value;
                  setDrinkPreference(nextValue);
                  if (nextValue !== "Autre") {
                    setCustomDrink("");
                  }
                  if (nextValue !== "Bières") {
                    setBeerPreference("");
                  }
                  setDrinkError("");
                }}
                className="flex h-9 w-full rounded-md border px-3 py-1 shadow-sm bg-background text-base"
                style={{
                  borderColor: "hsl(var(--blue-pale))",
                  color: "hsl(var(--blue-navy))",
                }}
              >
                <option value="">Choisir une boisson</option>
                <option value="Eau">Eau</option>
                <option value="Jus de fruits">Jus de fruits</option>
                <option value="Coca-Cola">Coca-Cola</option>
                <option value="Bières">Bières</option>
                <option value="Whisky">Whisky</option>
                <option value="Champagne">Champagne</option>
                <option value="Autre">Autre</option>
              </select>

              {drinkPreference === "Autre" && (
                <div className="space-y-1 pt-1">
                  <Label
                    htmlFor="custom_drink"
                    className="text-sm font-medium text-foreground"
                  >
                    Précisez votre boisson{" "}
                    <span className="text-primary">*</span>
                  </Label>
                  <Input
                    id="custom_drink"
                    value={customDrink}
                    onChange={(e) => {
                      setCustomDrink(e.target.value);
                      setDrinkError("");
                    }}
                    placeholder="Ex. Mojito, vin rouge..."
                    className="bg-background border-border text-base"
                    style={
                      {
                        "--tw-ring-color": "hsl(var(--blue-cobalt))",
                      } as React.CSSProperties
                    }
                  />
                </div>
              )}

              {drinkPreference === "Bières" && (
                <div className="space-y-1 pt-1">
                  <Label
                    htmlFor="beer_preference"
                    className="text-sm font-medium text-foreground"
                  >
                    Précisez votre bière préférée{" "}
                    <span className="text-primary">*</span>
                  </Label>
                  <Input
                    id="beer_preference"
                    value={beerPreference}
                    onChange={(e) => {
                      setBeerPreference(e.target.value);
                      setDrinkError("");
                    }}
                    placeholder="Ex. Heineken, Primus..."
                    className="bg-background border-border text-base"
                    style={
                      {
                        "--tw-ring-color": "hsl(var(--blue-cobalt))",
                      } as React.CSSProperties
                    }
                  />
                </div>
              )}

              {drinkError && (
                <p className="text-xs text-destructive">{drinkError}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium text-foreground">
                Relation avec le couple <span className="text-primary">*</span>
              </Label>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <input
                    id="relationship_groom"
                    type="radio"
                    name="relationship"
                    value="Famille du marié"
                    checked={relationship === "Famille du marié"}
                    onChange={(e) => {
                      setRelationship(e.target.value);
                      setRelationshipError("");
                    }}
                  />
                  <Label htmlFor="relationship_groom" className="text-sm">
                    Famille du marié
                  </Label>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    id="relationship_bride"
                    type="radio"
                    name="relationship"
                    value="Famille de la mariée"
                    checked={relationship === "Famille de la mariée"}
                    onChange={(e) => {
                      setRelationship(e.target.value);
                      setRelationshipError("");
                    }}
                  />
                  <Label htmlFor="relationship_bride" className="text-sm">
                    Famille de la mariée
                  </Label>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    id="relationship_groom_colleague"
                    type="radio"
                    name="relationship"
                    value="Collègue du marié"
                    checked={relationship === "Collègue du marié"}
                    onChange={(e) => {
                      setRelationship(e.target.value);
                      setRelationshipError("");
                    }}
                  />
                  <Label
                    htmlFor="relationship_groom_colleague"
                    className="text-sm"
                  >
                    Collègue du marié
                  </Label>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    id="relationship_bride_colleague"
                    type="radio"
                    name="relationship"
                    value="Collègue de la mariée"
                    checked={relationship === "Collègue de la mariée"}
                    onChange={(e) => {
                      setRelationship(e.target.value);
                      setRelationshipError("");
                    }}
                  />
                  <Label
                    htmlFor="relationship_bride_colleague"
                    className="text-sm"
                  >
                    Collègue de la mariée
                  </Label>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    id="relationship_groom_friend"
                    type="radio"
                    name="relationship"
                    value="Ami (e) du marié"
                    checked={relationship === "Ami (e) du marié"}
                    onChange={(e) => {
                      setRelationship(e.target.value);
                      setRelationshipError("");
                    }}
                  />
                  <Label
                    htmlFor="relationship_groom_friend"
                    className="text-sm"
                  >
                    Ami (e) du marié
                  </Label>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    id="relationship_bride_friend"
                    type="radio"
                    name="relationship"
                    value="Ami (e) de la mariée"
                    checked={relationship === "Ami (e) de la mariée"}
                    onChange={(e) => {
                      setRelationship(e.target.value);
                      setRelationshipError("");
                    }}
                  />
                  <Label
                    htmlFor="relationship_bride_friend"
                    className="text-sm"
                  >
                    Ami (e) de la mariée
                  </Label>
                </div>
              </div>
              {relationshipError && (
                <p className="text-xs text-destructive">{relationshipError}</p>
              )}
            </div>

            {/* Attending choice */}
            <div className="space-y-2">
              <Label className="text-sm font-medium text-foreground">
                Serez-vous présent(e) ? <span className="text-primary">*</span>
              </Label>
              <div className="grid grid-cols-2 gap-3">
                {/* Yes */}
                <button
                  type="button"
                  onClick={() => {
                    setAttending("yes");
                    setAttendingError("");
                  }}
                  className="flex items-center justify-center gap-2 py-3 rounded-sm border text-sm font-medium transition-all"
                  style={
                    attending === "yes"
                      ? {
                          background: "hsl(var(--blue-navy))",
                          color: "#fff",
                          borderColor: "hsl(var(--blue-navy))",
                        }
                      : {
                          background: "hsl(var(--blue-ice))",
                          color: "hsl(var(--blue-navy))",
                          borderColor: "hsl(var(--blue-cobalt))",
                        }
                  }
                >
                  <Heart className="w-4 h-4" strokeWidth={1.5} />
                  Avec plaisir
                </button>
                {/* No */}
                <button
                  type="button"
                  onClick={() => {
                    setAttending("no");
                    setAttendingError("");
                  }}
                  className="flex items-center justify-center gap-2 py-3 rounded-sm border text-sm font-medium transition-all"
                  style={
                    attending === "no"
                      ? {
                          background: "hsl(var(--blue-cobalt))",
                          color: "#fff",
                          borderColor: "hsl(var(--blue-cobalt))",
                        }
                      : {
                          background: "hsl(var(--blue-ice))",
                          color: "hsl(var(--blue-navy))",
                          borderColor: "hsl(var(--blue-pale))",
                        }
                  }
                >
                  <X className="w-4 h-4" strokeWidth={1.5} />
                  Dans l'impossibilité
                </button>
              </div>
              {attendingError && (
                <p className="text-xs text-destructive">{attendingError}</p>
              )}
            </div>

            {/* Optional message */}
            <div className="space-y-1">
              <Label
                htmlFor="message"
                className="text-sm font-medium text-foreground"
              >
                Un mot pour les mariés{" "}
                <span className="text-muted-foreground">(optionnel)</span>
              </Label>
              <Textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Vos vœux, un message..."
                rows={3}
                className="bg-background border-border resize-none text-base"
              />
            </div>

            <Button
              type="submit"
              disabled={submitting}
              className="w-full font-medium text-sm tracking-wide py-3 rounded-sm transition-all active:scale-[0.97]"
              style={{ background: "hsl(var(--blue-navy))", color: "#fff" }}
            >
              {submitting ? "Envoi en cours..." : "Envoyer ma réponse"}
            </Button>
          </form>
        )}
      </SectionReveal>
    </section>
  );
}
