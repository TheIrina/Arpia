"use client";

interface Report {
  author: string;
  message: string;
  timeAgo: string;
  site: string;
}

const reports: Report[] = [
  {
    author: "Carlos M.",
    message: "+3.5 m/s en Aguaclara, base a 2400m, viento SE 15. Rumbo a Zarzal.",
    timeAgo: "45min",
    site: "Aguaclara",
  },
  {
    author: "Ana P.",
    message: "Recien aterrice en la Pista. Buenas termicas pero empezo a cerrar a las 14:30.",
    timeAgo: "2h",
    site: "La Pista",
  },
  {
    author: "Diego R.",
    message: "Los Tanques con viento cruzado. Mejor opcion Aguaclara hoy.",
    timeAgo: "3h",
    site: "Los Tanques",
  },
];

export function PilotReports() {
  return (
    <div className="rounded-3xl bg-white/5 p-5">
      <div className="flex items-center justify-between mb-4">
        <span className="text-[10px] text-white/40 uppercase tracking-widest">
          Reportes
        </span>
        <span className="text-[9px] text-white/20">
          {reports.length} hoy
        </span>
      </div>

      <div className="flex flex-col gap-2">
        {reports.slice(0, 2).map((report, i) => (
          <div
            key={i}
            className="p-2.5 rounded-xl hover:bg-white/[0.03] transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] text-white/20 flex-shrink-0 w-3 text-center">
                &ldquo;
              </span>
              <span className="text-[11px] text-white/80 font-medium">
                {report.author}
              </span>
              <span className="text-[9px] text-white/20 ml-auto">
                {report.timeAgo}
              </span>
            </div>
            <p className="text-[10px] text-white/50 leading-relaxed pl-5">
              {report.message}
            </p>
          </div>
        ))}
      </div>

      {reports.length > 2 && (
        <div className="mt-2 pt-2 border-t border-white/[0.04]">
          <button className="w-full text-[10px] text-white/30 hover:text-white/50 transition-colors py-1">
            +{reports.length - 2} reportes mas
          </button>
        </div>
      )}
    </div>
  );
}
