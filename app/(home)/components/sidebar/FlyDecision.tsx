"use client";

import { Wind, Compass, Warning, CheckCircle } from "@phosphor-icons/react";

interface FlyConditions {
  windSpeed: number;
  windDirection: string;
  windGust?: number;
  condition: "flyable" | "marginal" | "nofly";
  label: string;
}

const MOCK: FlyConditions = {
  windSpeed: 18,
  windDirection: "SE",
  windGust: 24,
  condition: "flyable",
  label: "Condiciones de vuelo",
};

const conditionStyles: Record<FlyConditions["condition"], { dot: string; text: string; glow: string; icon: React.ReactNode }> = {
  flyable: {
    dot: "bg-green-500",
    text: "text-green-400",
    glow: "shadow-[0_0_12px_rgba(34,197,94,0.4)]",
    icon: <CheckCircle weight="fill" className="w-3.5 h-3.5 text-green-500" />,
  },
  marginal: {
    dot: "bg-yellow-500",
    text: "text-yellow-400",
    glow: "shadow-[0_0_12px_rgba(234,179,8,0.4)]",
    icon: <Warning weight="fill" className="w-3.5 h-3.5 text-yellow-500" />,
  },
  nofly: {
    dot: "bg-red-500",
    text: "text-red-400",
    glow: "shadow-[0_0_12px_rgba(239,68,68,0.4)]",
    icon: <Warning weight="fill" className="w-3.5 h-3.5 text-red-500" />,
  },
};

export function FlyDecision() {
  const { windSpeed, windDirection, windGust, condition, label } = MOCK;
  const s = conditionStyles[condition];

  return (
    <div className="bg-white/5 rounded-3xl p-5">
      {/* Location + Date */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-[10px] tracking-widest uppercase text-white/40">
          Roldanillo
        </span>
        <span className="text-[10px] text-white/30">
          Hoy · 10:30 AM
        </span>
      </div>

      {/* Hero Metric: Wind Speed + Direction */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-baseline gap-1">
          <span className="text-5xl font-light text-white tracking-tight">
            {windSpeed}
          </span>
          <span className="text-sm text-white/50">km/h</span>
        </div>
        <div className="flex items-center gap-2 bg-white/5 rounded-full px-3 py-1.5">
          <Compass weight="regular" className="w-3.5 h-3.5 text-white/60" />
          <span className="text-sm font-medium text-white tracking-wider">
            {windDirection}
          </span>
        </div>
      </div>

      {/* Wind Details */}
      <div className="flex items-center gap-4 mb-5 text-[11px] text-white/50">
        <div className="flex items-center gap-1.5">
          <Wind weight="regular" className="w-3 h-3" />
          <span>Sostenido</span>
        </div>
        {windGust && (
          <div className="flex items-center gap-1.5">
            <span className="text-white/30">Ráfagas</span>
            <span className="text-white/70">{windGust} km/h</span>
          </div>
        )}
      </div>

      {/* Condition Badge */}
      <div className="flex items-center gap-2.5">
        <div className={[
          "w-2.5 h-2.5 rounded-full",
          s.dot,
          s.glow,
        ].join(" ")} />
        <span className={["text-xs font-normal", s.text].join(" ")}>
          {label}
        </span>
        {s.icon}
      </div>
    </div>
  );
}
