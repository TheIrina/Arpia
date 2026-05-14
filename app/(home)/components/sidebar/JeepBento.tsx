"use client";

interface JeepDeparture {
  id: string;
  time: string;
  destination: string;
  meetingPoint: string;
  spots: number;
}

const DEPARTURES: JeepDeparture[] = [
  {
    id: "1",
    time: "10:00",
    destination: "Aguaclara",
    meetingPoint: "Parque Principal",
    spots: 4,
  },
  {
    id: "2",
    time: "11:30",
    destination: "La Pista",
    meetingPoint: "Parque Principal",
    spots: 6,
  },
  {
    id: "3",
    time: "14:00",
    destination: "Los Tanques",
    meetingPoint: "Calle 10",
    spots: 8,
  },
  {
    id: "4",
    time: "16:30",
    destination: "Aguaclara",
    meetingPoint: "Parque Principal",
    spots: 3,
  },
];

function JeepCard({
  jeep,
  isFirst,
}: {
  jeep: JeepDeparture;
  isFirst: boolean;
}) {
  return (
    <div className="col-span-2 bg-white/5 rounded-lg p-4 relative group cursor-pointer hover:bg-white/[0.08] transition-colors">
      {isFirst && (
        <span className="absolute top-4 left-4 text-[9px] text-green-400/80 bg-green-500/10 px-2 py-0.5 rounded-full">
          Próximo
        </span>
      )}

      {/* Vehicle image placeholder */}
      <div className="w-full h-16 rounded-lg bg-zinc-900 mb-3 flex items-center justify-center overflow-hidden">
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-white/10"
        >
          <path d="M14 18v-2h4v2" />
          <path d="M6 18v-2h4v2" />
          <path d="M2 10h20" />
          <path d="M3 10l1.5-5h15L21 10" />
          <path d="M5 16h14a1 1 0 001-1v-3H4v3a1 1 0 001 1z" />
          <circle cx="7" cy="17" r="1.5" />
          <circle cx="17" cy="17" r="1.5" />
        </svg>
      </div>

      {/* Time */}
      <div className="flex items-baseline gap-1 mb-1">
        <span className="text-xl font-light text-white tabular-nums">
          {jeep.time}
        </span>
      </div>

      {/* Destination + meeting point */}
      <div className="text-[11px] text-white/80 leading-tight mb-2">
        Despegue {jeep.destination}
      </div>
      <div className="text-[10px] text-white/30">{jeep.meetingPoint}</div>

      {/* Spots */}
      <div className="flex items-center gap-1.5 mt-3 pt-2 border-t border-white/[0.04]">
        <div
          className={[
            "w-1.5 h-1.5 rounded-full",
            jeep.spots > 3
              ? "bg-green-500 shadow-[0_0_4px_rgba(34,197,94,0.6)]"
              : "bg-yellow-500 shadow-[0_0_4px_rgba(234,179,8,0.6)]",
          ].join(" ")}
        />
        <span className="text-[9px] text-white/50">{jeep.spots} cupos</span>
      </div>
    </div>
  );
}

export function JeepBento() {
  return (
    <div className="flex flex-col gap-1">
      <span className="block px-1 text-[10px] tracking-widest uppercase text-white/30 mb-1">
        Transporte
      </span>

      <div className="grid grid-cols-4 gap-1">
        {DEPARTURES.map((jeep, i) => (
          <JeepCard key={jeep.id} jeep={jeep} isFirst={i === 0} />
        ))}
      </div>
    </div>
  );
}
