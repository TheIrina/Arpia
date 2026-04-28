"use client";

import dynamic from "next/dynamic";

export const ArpiaCookieBanner = dynamic(
  () => import("./CookieBanner"),
  { ssr: false }
);
