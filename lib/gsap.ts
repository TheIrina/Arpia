"use client";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP);
}

export * from "gsap";
export { default } from "gsap";
export { useGSAP };
