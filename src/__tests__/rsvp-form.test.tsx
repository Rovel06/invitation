import { fireEvent, render, screen } from "@testing-library/react";
import RsvpSection from "@/components/wedding/RsvpSection";

describe("RsvpSection", () => {
  it("displays the status, email, phone and drink preference fields", () => {
    render(<RsvpSection />);

    expect(screen.getByLabelText(/statut/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/votre prénom et nom/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/numéro de téléphone/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/boisson souhaitée/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/famille du marié/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/famille de la mariée/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/collègue du marié/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/collègue de la mariée/i)).toBeInTheDocument();
  });

  it("shows a free text field when the user selects other drink", () => {
    render(<RsvpSection />);

    fireEvent.change(screen.getByLabelText(/boisson souhaitée/i), {
      target: { value: "Autre" },
    });

    expect(
      screen.getByLabelText(/précisez votre boisson/i),
    ).toBeInTheDocument();
  });

  it("shows a beer-specific field when the user selects beers", () => {
    render(<RsvpSection />);

    fireEvent.change(screen.getByLabelText(/boisson souhaitée/i), {
      target: { value: "Bières" },
    });

    expect(
      screen.getByLabelText(/précisez votre bière préférée/i),
    ).toBeInTheDocument();
  });
});
