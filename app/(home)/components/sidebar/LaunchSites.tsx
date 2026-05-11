"use client";

import { NavigationArrow, Mountains } from "@phosphor-icons/react";

interface LaunchSite {
  name: string;
  windSpeed: number;
  windDirection: string;
  idealDirection: string;
  condition: "flyable" | "marginal" | "nofly";
  optimalTime: string;
}

const SITES: LaunchSite[] = [
  {
    name: "Aguaclara",
    windSpeed: 18,
    windDirection: "SE",
    idealDirection: "SE",
    condition: "flyable",
    optimalTime: "10:30 AM",
  },
  {
    name: "Los Tanques",
    windSpeed: 28,
    windDirection: "NW",
    idealDirection: "NW",
    condition: "marginal",
    optimalTime: "8:00 AM",
  },
  {
    name: "La Pista",
    windSpeed: 14,
    windDirection: "S",
    idealDirection: "S-SW",
    condition: "flyable",
    optimalTime: "11:00 AM",
  },
];

const conditionDot: Record<LaunchSite["condition"], string> = {
  flyable: "bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]",
  marginal: "bg-yellow-500 shadow-[0_0_8px_rgba(234,179,8,0.5)]",
  nofly: "bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]",
};

function SiteRow({ site }: { site: LaunchSite }) {
  return (
    <div className="flex items-center gap-3 py-2.5 px-3 rounded-2xl hover:bg-white/[0.03] transition-colors cursor-pointer group">
      {/* Condition dot */}
      <div className="relative shrink-0">
        <div className={[
          "w-2 h-2 rounded-full",
          conditionDot[site.condition],
        ].join(" ")} />
      </div>

      {/* Site name + optimal time */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="text-[13px] font-normal text-white leading-tight">
            {site.name}
          </span>
          <span className="text-[10px] text-white/30 tabular-nums">
            {site.windSpeed}
          </span>
        </div>
        <div className="text-[9px] text-white/30 mt-0.5">
          Hora óptima {site.optimalTime}
        </div>
      </div>

      {/* Wind direction indicator */}
      <div className="flex items-center gap-1.5 shrink-0 opacity-40 group-hover:opacity-70 transition-opacity">
        <NavigationArrow
          weight="regular"
          className="w-3 h-3 text-white"
        />
        <span className="text-[11px] text-white tabular-nums">
          {site.windDirection}
        </span>
      </div>
    </div>
  );
}

export function LaunchSites() {
  return (
    <div className="bg-white/5 rounded-3xl px-2 py-3">
      <div className="flex items-center gap-2 px-3 mb-1">
        <Mountains weight="regular" className="w-3.5 h-3.5 text-white/30 shrink-0" />
        <span className="text-[10px] tracking-widest uppercase text-white/30">
          Despegues
        </span>
      </div>

      <div className="divide-y divide-white/[0.04]">
        {SITES.map((site) => (
          <SiteRow key={site.name} site={site} />
        ))}
      </div>
    </div>
  );
}
