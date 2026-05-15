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
    <div
      className={
        "col-span-2 rounded-xl p-4 flex flex-col justify-between cursor-pointer transition-colors relative " +
        (isFirst
          ? "bg-green-500/[0.08] hover:bg-green-500/[0.12]"
          : "bg-white/[0.04] hover:bg-white/[0.08]")
      }
    >
      <div className="flex flex-col gap-1">
        <span className="text-[10px] font-medium tracking-[0.2em] text-white/50 uppercase">
          {jeep.destination}
        </span>
        <span className="text-3xl font-light text-white tracking-wide mt-2">
          {jeep.time}
        </span>
      </div>

      <div className="flex flex-col gap-3 mt-4">
        <div className="flex flex-col">
          <span className="text-[10px] font-medium tracking-[0.2em] text-white/30 uppercase">
            Punto de encuentro
          </span>
          <span className="text-sm font-light text-white/80">
            {jeep.meetingPoint}
          </span>
        </div>

        <div className="flex flex-col items-end">
          <div className="flex items-center gap-1.5">
            <span className="text-sm font-light text-white/80">
              {jeep.spots}
            </span>
            <span className="text-[10px] text-white/40 font-medium uppercase tracking-[0.2em]">
              CUPOS
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export function JeepBento() {
  return (
    <div className="flex flex-col gap-3">
      <div className="px-1">
        <span className="text-[10px] font-medium tracking-[0.2em] uppercase text-white/40">
          Transporte
        </span>
      </div>

      <div className="grid grid-cols-4 gap-2">
        {DEPARTURES.map((jeep, i) => (
          <JeepCard key={jeep.id} jeep={jeep} isFirst={i === 0} />
        ))}
      </div>
    </div>
  );
}
