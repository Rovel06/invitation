import InvitationPage from "./pages/InvitationPage";
import type { ReactNode } from "react";

export interface RouteConfig {
  name: string;
  path: string;
  element: ReactNode;
  visible?: boolean;
  public?: boolean;
}

export const routes: RouteConfig[] = [
  {
    name: "Invitation de Mariage",
    path: "/",
    element: <InvitationPage />,
    public: true,
  },
];
