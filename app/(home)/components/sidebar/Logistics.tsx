"use client";

import { Clock, Broadcast, Phone } from "@phosphor-icons/react";

interface JeepInfo {
  departureTime: string;
  meetingPoint: string;
  spots: number;
  status: "operating" | "standby";
}

interface LogisticsData {
  jeep: JeepInfo;
  radio: { frequency: string; channel?: string };
  emergency: { label: string; phone: string };
}

const MOCK: LogisticsData = {
  jeep: {
    departureTime: "08:30 AM",
    meetingPoint: "Parque Principal",
    spots: 4,
    status: "operating",
  },
  radio: {
    frequency: "147.400",
    channel: "VHF Local",
  },
  emergency: {
    label: "Rescate",
    phone: "+57 320 123 4567",
  },
};

export function Logistics() {
  const { jeep, radio, emergency } = MOCK;

  return (
    <div className="bg-white/5 rounded-3xl divide-y divide-white/[0.04]">
      {/* Jeep */}
      <div className="flex items-center gap-3 px-4 py-3 group cursor-pointer hover:bg-white/[0.03] transition-colors">
        <Clock weight="regular" className="w-3.5 h-3.5 text-white/30 shrink-0" />
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <span className="text-[12px] font-normal text-white">Jeeps al despegue</span>
            <div className="flex items-center gap-1.5">
              <div className={[
                "w-1.5 h-1.5 rounded-full",
                jeep.status === "operating"
                  ? "bg-green-500 shadow-[0_0_5px_rgba(34,197,94,0.8)]"
                  : "bg-yellow-500 shadow-[0_0_5px_rgba(234,179,8,0.8)]",
              ].join(" ")} />
              <span className="text-[9px] text-white/40">
                {jeep.status === "operating" ? "Operando" : "En espera"}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-3 mt-1">
            <span className="text-[11px] text-white/60">{jeep.departureTime}</span>
            <span className="text-[9px] text-white/30">{jeep.meetingPoint}</span>
          </div>
        </div>
        <span className="text-[11px] text-white/30 shrink-0 tabular-nums">
          {jeep.spots} cupos
        </span>
      </div>

      {/* Radio */}
      <div className="flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-white/[0.03] transition-colors">
        <Broadcast weight="regular" className="w-3.5 h-3.5 text-white/30 shrink-0" />
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <span className="text-[12px] font-normal text-white">
              {radio.frequency}
              <span className="text-[10px] text-white/30 ml-1">MHz</span>
            </span>
            <span className="text-[9px] text-white/30">{radio.channel}</span>
          </div>
        </div>
      </div>

      {/* Emergency */}
      <div className="flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-white/[0.03] transition-colors rounded-b-3xl">
        <Phone weight="regular" className="w-3.5 h-3.5 text-red-500/50 shrink-0" />
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <span className="text-[12px] font-normal text-white">
              {emergency.phone}
            </span>
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-red-500 shadow-[0_0_5px_rgba(239,68,68,0.8)]" />
              <span className="text-[10px] text-red-400/80">
                {emergency.label}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
