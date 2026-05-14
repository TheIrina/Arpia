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
    <div className="bg-white/5 rounded-2xl divide-y divide-white/[0.04]">
      {/* Radio */}
      <div className="flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-white/[0.03] transition-colors rounded-t-2xl">
        <Broadcast
          weight="regular"
          className="w-3.5 h-3.5 text-white/30 shrink-0"
        />
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
      <div className="flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-white/[0.03] transition-colors rounded-b-2xl">
        <Phone
          weight="regular"
          className="w-3.5 h-3.5 text-red-500/50 shrink-0"
        />
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
