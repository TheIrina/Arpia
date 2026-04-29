import { Metadata } from "next";
import PrivacyClient from "./client";

export const metadata: Metadata = {
  title: "Política de Privacidad - Arpia",
  description: "Política de Privacidad y Tratamiento de Datos Personales en Arpia.",
};

export default function PrivacyPage() {
  return <PrivacyClient />;
}
