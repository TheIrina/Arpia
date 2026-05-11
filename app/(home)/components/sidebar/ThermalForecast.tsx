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

function Bar({ rate, maxRate, isCurrent }: { rate: number; maxRate: number; isCurrent: boolean }) {
  const height = Math.max((rate / maxRate) * 100, 4);
  return (
    <div
      className={[
        "w-1.5 rounded-full transition-all duration-500",
        isCurrent ? "bg-white shadow-[0_0_4px_rgba(255,255,255,0.3)]" : "bg-white/20",
      ].join(" ")}
      style={{ height: `${height}%` }}
    />
  );
}

export function ThermalForecast() {
  const { currentClimbRate, maxClimbRate, cloudbase, forecast } = MOCK;
  const currentIndex = forecast.findIndex((f) => f.rate === currentClimbRate);

  return (
    <div className="bg-white/5 rounded-3xl p-5">
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <TrendUp weight="regular" className="w-3.5 h-3.5 text-white/30 shrink-0" />
        <span className="text-[10px] tracking-widest uppercase text-white/30">
          Térmica
        </span>
      </div>

      {/* Current Climb Rate + Cloudbase */}
      <div className="flex items-end justify-between mb-5">
        <div>
          <div className="flex items-baseline gap-1">
            <span className="text-3xl font-light text-white tracking-tight">
              {currentClimbRate}
            </span>
            <span className="text-xs text-white/50">m/s</span>
          </div>
          <div className="text-[10px] text-white/30 mt-1">
            Máx hoy {maxClimbRate} m/s
          </div>
        </div>
        <div className="text-right">
          <div className="flex items-center justify-end gap-1.5">
            <Cloud weight="regular" className="w-3.5 h-3.5 text-white/40" />
            <span className="text-lg font-light text-white">
              {cloudbase.toLocaleString()}
            </span>
            <span className="text-[10px] text-white/40">m</span>
          </div>
          <div className="text-[10px] text-white/30 mt-1">Base de nubes</div>
        </div>
      </div>

      {/* Forecast Bars */}
      <div className="flex items-end justify-between h-16 px-1">
        {forecast.map((f, i) => (
          <div key={f.time} className="flex flex-col items-center gap-1.5 flex-1">
            <Bar rate={f.rate} maxRate={maxClimbRate} isCurrent={i === currentIndex} />
            <span
              className={[
                "text-[9px] tabular-nums",
                i === currentIndex ? "text-white/70" : "text-white/20",
              ].join(" ")}
            >
              {f.time}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
