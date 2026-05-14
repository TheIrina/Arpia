"use client";

type Condition = "flyable" | "marginal" | "nofly";

interface FlyConditions {
  windSpeed: number;
  windDirection: string;
  windGust?: number;
  condition: Condition;
}

const conditions: Record<Condition, { bg: string; label: string }> = {
  flyable: {
    bg: "bg-green-500/[0.12]",
    label: "Volable",
  },
  marginal: {
    bg: "bg-amber-500/[0.12]",
    label: "Marginal",
  },
  nofly: {
    bg: "bg-red-500/[0.15]",
    label: "No volable",
  },
};

const MOCK: FlyConditions = {
  windSpeed: 18,
  windDirection: "SE",
  windGust: 24,
  condition: "flyable",
};

export function FlyDecision() {
  const { windSpeed, windDirection, windGust, condition } = MOCK;
  const s = conditions[condition];

  return (
    <div className={["rounded-lg p-5", s.bg].join(" ")}>
      <div className="flex items-center justify-between gap-4">
        {/* Left: condition + wind details */}
        <div className="flex flex-col gap-1.5 flex-1 min-w-0">
          <span className="text-xs font-normal text-white/90">{s.label}</span>
          <div className="text-[11px] text-white leading-relaxed">
            {windDirection}
            {windGust && (
              <>
                <span className="text-white/30 mx-1.5">·</span>
                Ráfagas {windGust} km/h
              </>
            )}
          </div>
        </div>

        {/* Right: hero wind speed */}
        <div className="flex flex-col items-end shrink-0">
          <span className="text-6xl font-light text-white tracking-tight leading-none">
            {windSpeed}
          </span>
          <span className="text-xs text-white tracking-widest mt-1">km/h</span>
        </div>
      </div>
    </div>
  );
}
