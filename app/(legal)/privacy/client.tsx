import { PrivacySections1to4 } from "./sections-1-4";
import { PrivacySections5to9 } from "./sections-5-9";

export default function PrivacyPage() {
  return (
    <article className="space-y-24 font-sans text-black">
      <header className="grid grid-cols-2 md:grid-cols-8 lg:grid-cols-12 gap-x-4">
        <div className="col-span-2 md:col-span-8 lg:col-span-5">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-normal tracking-tighter leading-[1.05] uppercase">
            Política de Privacidad
          </h1>
        </div>
        <div className="col-span-2 md:col-span-8 lg:col-start-7 lg:col-span-6 mt-4 lg:mt-0">
          <p className="text-sm md:text-base text-[#5f666d] leading-relaxed font-medium">
            Fecha de la última revisión: Abril 2026
          </p>
        </div>
      </header>

      <PrivacySections1to4 />
      <PrivacySections5to9 />
    </article>
  );
}
