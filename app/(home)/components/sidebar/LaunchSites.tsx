"use client";

type Condition = "flyable" | "marginal" | "nofly";

interface LaunchSite {
  name: string;
  windSpeed: number;
  windDirection: string;
  condition: Condition;
  optimalTime: string;
}

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

const SITES: LaunchSite[] = [
  {
    name: "Aguaclara",
    windSpeed: 18,
    windDirection: "SE",
    condition: "flyable",
    optimalTime: "10:30",
  },
  {
    name: "Los Tanques",
    windSpeed: 28,
    windDirection: "NW",
    condition: "marginal",
    optimalTime: "8:00",
  },
  {
    name: "La Pista",
    windSpeed: 14,
    windDirection: "S",
    condition: "flyable",
    optimalTime: "11:00",
  },
];

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

function WindArrow({ direction }: { direction: string }) {
  const rotation = directionMap[direction] ?? 0;
  return (
    <div
      className="shrink-0 transition-transform duration-700 ease-in-out"
      style={{ transform: `rotate(${rotation}deg)` }}
    >
      <svg
        width="10"
        height="10"
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
  );
}

function SiteRow({ site }: { site: LaunchSite }) {
  const s = conditions[site.condition];

  return (
    <div
      className={["rounded-xl p-4", s.bg].join(" ")}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex flex-col gap-4 flex-1">
          <div className="flex flex-col gap-1">
            <span className="text-[10px] font-medium tracking-[0.2em] text-white/50 uppercase">
              {site.name}
            </span>
            <span className="text-sm font-light text-white tracking-wide">
              {s.label}
            </span>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              <WindArrow direction={site.windDirection} />
              <span className="text-sm font-light text-white">
                {site.windDirection}
              </span>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-sm font-light text-white/80">
                {site.windSpeed}
              </span>
              <span className="text-[10px] text-white/40 font-medium uppercase tracking-[0.2em]">
                KM/H
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-end shrink-0">
          <span className="text-[10px] font-medium text-white/50 uppercase tracking-[0.2em]">
            Óptimo
          </span>
          <span className="text-sm font-light text-white tracking-wide">
            {site.optimalTime}
          </span>
        </div>
      </div>
    </div>
  );
}

export function LaunchSites() {
  return (
    <div className="flex flex-col gap-3">
      <div className="px-1">
        <span className="text-[10px] font-medium tracking-[0.2em] uppercase text-white/40">
          Despegues cercanos
        </span>
      </div>

      <div className="flex flex-col gap-2">
        {SITES.map((site) => (
          <SiteRow key={site.name} site={site} />
        ))}
      </div>
    </div>
  );
}
