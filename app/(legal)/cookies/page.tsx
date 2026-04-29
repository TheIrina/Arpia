import { Metadata } from "next";
import CookiesClient from "./client";

export const metadata: Metadata = {
  title: "Política de Cookies - Arpia",
  description: "Política de Uso de Cookies en la plataforma Arpia.",
};

export default function CookiesPage() {
  return <CookiesClient />;
}
