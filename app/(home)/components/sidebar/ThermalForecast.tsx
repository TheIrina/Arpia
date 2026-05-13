"use client";

import { TrendUp, Cloud } from "@phosphor-icons/react";

interface ThermalData {
  currentClimbRate: number; // m/s
  maxClimbRate: number;
  cloudbase: number; // meters
  forecast: { time: string; rate: number }[];
}

const MOCK: ThermalData = {
  currentClimbRate: 3.2,
  maxClimbRate: 4.5,
  cloudbase: 2100,
  forecast: [
    { time: "10h", rate: 2.1 },
    { time: "11h", rate: 3.2 },
    { time: "12h", rate: 4.1 },
    { time: "13h", rate: 4.5 },
    { time: "14h", rate: 3.8 },
    { time: "15h", rate: 3.0 },
    { time: "16h", rate: 1.8 },
  ],
};

function Line({ rate, maxRate, isCurrent }: { rate: number; maxRate: number; isCurrent: boolean }) {
  const height = Math.max((rate / maxRate) * 100, 4);
  return (
    <div className="flex flex-col justify-end items-center h-full w-4 group pb-2">
      <div
        className={[
          "w-[1px] transition-all duration-500",
          isCurrent ? "bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]" : "bg-white/30 group-hover:bg-white/60",
        ].join(" ")}
        style={{ height: height + '%' }}
      />
    </div>
  );
}

export function ThermalForecast() {
  const { currentClimbRate, maxClimbRate, cloudbase, forecast } = MOCK;
  const currentIndex = forecast.findIndex((f) => f.rate === currentClimbRate);

  return (
    <div className="w-full flex items-end justify-between gap-12 h-[80px] px-6">
      
      {/* Left Column: Data */}
      <div className="flex flex-col justify-end pb-1 drop-shadow-md">
        <div className="flex items-baseline gap-1.5">
          <span className="text-4xl font-light text-white tracking-tighter leading-none">
            {currentClimbRate}
          </span>
          <span className="text-xs text-white/80 font-medium tracking-widest">M/S</span>
        </div>
        <div className="flex items-center gap-2 mt-2">
          <TrendUp weight="light" className="w-3.5 h-3.5 text-white/60" />
          <span className="text-[10px] tracking-widest uppercase text-white/60 font-medium">
            Máx {maxClimbRate}
          </span>
        </div>
      </div>

      {/* Middle: Minimalist Graph */}
      <div className="flex-1 flex items-end justify-between h-full px-8 border-b border-white/10 pb-1">
        {forecast.map((f, i) => (
          <div key={f.time} className="flex flex-col items-center justify-end gap-2 h-full">
            <Line rate={f.rate} maxRate={maxClimbRate} isCurrent={i === currentIndex} />
            <span
              className={[
                "text-[10px] tabular-nums tracking-widest font-medium",
                i === currentIndex ? "text-white drop-shadow-md" : "text-white/40",
              ].join(" ")}
            >
              {f.time}
            </span>
          </div>
        ))}
      </div>

      {/* Right Column: Cloudbase Data */}
      <div className="flex flex-col text-right justify-end pb-1 drop-shadow-md">
        <div className="flex items-baseline justify-end gap-1.5">
          <span className="text-3xl font-light text-white leading-none tracking-tighter">
            {cloudbase.toLocaleString()}
          </span>
          <span className="text-xs text-white/80 font-medium tracking-widest">M</span>
        </div>
        <div className="flex items-center justify-end gap-2 mt-2">
          <span className="text-[10px] tracking-widest uppercase text-white/60 font-medium">
            Base Nubes
          </span>
          <Cloud weight="light" className="w-3.5 h-3.5 text-white/60" />
        </div>
      </div>

    </div>
  );
}
