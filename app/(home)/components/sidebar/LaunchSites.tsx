"use client";

interface LaunchSite {
  name: string;
  windSpeed: number;
  windDirection: string;
  condition: "flyable" | "marginal" | "nofly";
  optimalTime: string;
}

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

const conditionDot: Record<LaunchSite["condition"], string> = {
  flyable: "bg-green-500 shadow-[0_0_6px_rgba(34,197,94,0.5)]",
  marginal: "bg-yellow-500 shadow-[0_0_6px_rgba(234,179,8,0.5)]",
  nofly: "bg-red-500 shadow-[0_0_6px_rgba(239,68,68,0.5)]",
};

function SiteRow({ site }: { site: LaunchSite }) {
  return (
    <div className="py-2.5 px-3 rounded-xl hover:bg-white/[0.03] transition-colors cursor-pointer">
      <div className="flex items-center gap-2">
        <div className={[
          "w-2 h-2 rounded-full shrink-0",
          conditionDot[site.condition],
        ].join(" ")} />
        <span className="text-[13px] text-white">
          {site.name}
        </span>
      </div>
      <div className="flex items-center justify-between pl-4 mt-0.5">
        <span className="text-[11px] text-white">
          {site.windDirection}
          <span className="text-white/30 mx-1">·</span>
          {site.windSpeed} km/h
        </span>
        <span className="text-[10px] text-white/50 tabular-nums">
          {site.optimalTime}
        </span>
      </div>
    </div>
  );
}

export function LaunchSites() {
  return (
    <div className="bg-white/5 rounded-3xl px-2 py-3">
      <span className="block px-3 mb-0.5 text-[10px] tracking-widest uppercase text-white/30">
        Despegues
      </span>

      <div className="divide-y divide-white/[0.04]">
        {SITES.map((site) => (
          <SiteRow key={site.name} site={site} />
        ))}
      </div>
    </div>
  );
}
