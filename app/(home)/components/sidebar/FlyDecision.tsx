"use client";

import { FlyConditions, Condition } from "@/lib/weather";

const conditions: Record<Condition, { bg: string; label: string }> = {
  flyable: {
    bg: "bg-green-500/[0.12]",
    label: "VOLABLE",
  },
  marginal: {
    bg: "bg-amber-500/[0.12]",
    label: "MARGINAL",
  },
  nofly: {
    bg: "bg-red-500/[0.15]",
    label: "NO VOLABLE",
  },
};

const directionMap: Record<string, number> = {
  N: 0,
  NNE: 22.5,
  NE: 45,
  ENE: 67.5,
  E: 90,
  ESE: 112.5,
  SE: 135,
  SSE: 157.5,
  S: 180,
  SSW: 202.5,
  SW: 225,
  WSW: 247.5,
  W: 270,
  WNW: 292.5,
  NW: 315,
  NNW: 337.5,
};

export function FlyDecision({ data }: { data: FlyConditions }) {
  const { windSpeed, windDirection, windGust, condition } = data;
  const s = conditions[condition];
  const rotation = directionMap[windDirection] ?? 0;
  const formattedSpeed = windSpeed.toString().padStart(2, "0");

  return (
    <div className={["rounded-2xl p-6", s.bg].join(" ")}>
      <div className="flex items-start justify-between gap-4">
        {/* Left: condition + wind details */}
        <div className="flex flex-col gap-6 flex-1">
          <div className="flex flex-col gap-1">
            <span className="text-[10px] font-medium tracking-[0.2em] text-white/50 uppercase">
              Estado
            </span>
            <span className="text-sm font-light text-white tracking-wide">
              {s.label}
            </span>
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-[10px] font-medium tracking-[0.2em] text-white/50 uppercase">
              Dirección
            </span>
            <div className="flex items-center gap-2">
              <div
                className="transition-transform duration-700 ease-in-out"
                style={{ transform: `rotate(${rotation}deg)` }}
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7 13V1M7 1L3 5M7 1L11 5"
                    stroke="white"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <span className="text-sm font-light text-white">
                {windDirection}
              </span>
            </div>
          </div>
        </div>

        {/* Right: hero wind speed */}
        <div className="flex flex-col items-end shrink-0">
          <span className="text-8xl font-light text-white tracking-tighter leading-[0.8]">
            {formattedSpeed}
          </span>
          <div className="flex items-center gap-2 mt-2">
            <span className="text-[10px] text-white/40 font-medium uppercase tracking-[0.2em]">
              KM/H
            </span>
            {windGust && (
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-white/20 font-light">|</span>
                <div className="flex items-center gap-1">
                  <span className="text-[9px] text-white/30 uppercase tracking-wider">
                    Gust
                  </span>
                  <span className="text-xs font-medium text-white/80">
                    {windGust}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
