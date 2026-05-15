"use client";

import { Broadcast, Phone } from "@phosphor-icons/react";

interface LogisticsData {
  radio: { frequency: string; channel?: string };
  emergency: { label: string; phone: string };
}

const MOCK: LogisticsData = {
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
  const { radio, emergency } = MOCK;

  return (
    <div className="bg-white/[0.04] rounded-2xl divide-y divide-white/[0.04]">
      {/* Radio */}
      <div className="flex items-center gap-4 px-5 py-4 cursor-pointer hover:bg-white/[0.03] transition-colors rounded-t-2xl">
        <Broadcast
          weight="regular"
          className="w-5 h-5 text-white/30 shrink-0"
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <div className="flex items-baseline gap-1.5">
              <span className="text-xl font-light text-white tracking-wide">
                {radio.frequency}
              </span>
              <span className="text-[10px] font-medium tracking-wider text-white/30 uppercase">
                MHz
              </span>
            </div>
            <span className="text-[10px] font-light text-white/30">
              {radio.channel}
            </span>
          </div>
        </div>
      </div>

      {/* Emergency */}
      <div className="flex items-center gap-4 px-5 py-4 cursor-pointer hover:bg-white/[0.03] transition-colors rounded-b-2xl">
        <Phone weight="regular" className="w-5 h-5 text-red-500/50 shrink-0" />
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <span className="text-lg font-light text-white tracking-wide">
              {emergency.phone}
            </span>
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-red-500 shadow-[0_0_5px_rgba(239,68,68,0.8)]" />
              <span className="text-[10px] font-light text-red-400/80">
                {emergency.label}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
