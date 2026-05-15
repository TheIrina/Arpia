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
    message:
      "+3.5 m/s en Aguaclara, base a 2400m, viento SE 15. Rumbo a Zarzal.",
    timeAgo: "45min",
    site: "Aguaclara",
  },
  {
    author: "Ana P.",
    message:
      "Recien aterrice en la Pista. Buenas termicas pero empezo a cerrar a las 14:30.",
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
    <div className="rounded-2xl bg-white/[0.04] p-5">
      <div className="flex items-center justify-between mb-6">
        <span className="text-[10px] font-medium tracking-[0.2em] text-white/40 uppercase">
          Reportes
        </span>
        <span className="text-[10px] font-light text-white/20">
          {reports.length} hoy
        </span>
      </div>

      <div className="flex flex-col gap-6">
        {reports.slice(0, 2).map((report, i) => (
          <div key={i} className="group cursor-pointer">
            <div className="flex items-start gap-3">
              <span className="text-sm text-white/20 font-serif leading-none mt-1">
                &ldquo;
              </span>
              <div className="flex flex-col gap-1.5 flex-1">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-light text-white tracking-wide">
                    {report.author}
                  </span>
                  <span className="text-[10px] text-white/20 font-light">
                    {report.timeAgo}
                  </span>
                </div>
                <p className="text-xs font-light text-white/50 leading-relaxed pr-2">
                  {report.message}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {reports.length > 2 && (
        <div className="mt-5 pt-4 border-t border-white/[0.04]">
          <button className="w-full text-[10px] font-light text-white/30 hover:text-white/50 transition-colors py-1">
            +{reports.length - 2} reportes mas
          </button>
        </div>
      )}
    </div>
  );
}
