import { Metadata } from "next";
import TermsClient from "./client";

export const metadata: Metadata = {
  title: "Términos y Condiciones - Arpia",
  description: "Términos y Condiciones de Uso de la plataforma digital Arpia.",
};

export default function TermsPage() {
  return <TermsClient />;
}
