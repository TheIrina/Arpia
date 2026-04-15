'use client';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function TermsPage() {
    const containerRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from("section", {
                y: 30,
                opacity: 0,
                stagger: 0.1,
                duration: 0.8,
                ease: "power3.out"
            });
        }, containerRef);
        return () => ctx.revert();
    }, []);

    return (
        <article ref={containerRef} className="space-y-8">
            <header className="border-b border-cyan-500/20 pb-8 mb-12">
                <span className="text-cyan-500 font-mono text-xs tracking-widest">[AR-LEG-00]</span>
                <h1 className="text-4xl font-bold tracking-tighter text-white mt-2 uppercase">
                    Términos y Condiciones
                </h1>
                <p className="text-slate-400 mt-4 text-sm max-w-2xl">
                    Última actualización: Abril 2026. Al utilizar el ecosistema técnico de Arpia, aceptas estar sujeto a las siguientes cláusulas operativas y legales.
                </p>
            </header>

            <section className="p-8 rounded-2xl border border-white/5 bg-white/2 backdrop-blur-md transition-all hover:border-cyan-500/20 group">
                <div className="flex items-center gap-3 mb-4">
                    <span className="font-mono text-cyan-400 text-[10px] py-1 px-2 border border-cyan-500/30 rounded bg-cyan-500/5">
                        CL-01
                    </span>
                    <h2 className="text-lg font-semibold text-slate-100 uppercase tracking-tight">
                        Responsabilidad Operativa y Riesgo Inherente
                    </h2>
                </div>
                <div className="text-slate-400 text-sm leading-relaxed space-y-4">
                    <p>El vuelo en parapente es una actividad de alto riesgo. Arpia opera estrictamente como un ecosistema técnico de apoyo, telemetría y visualización espacial.</p>
                    <p>La plataforma <strong className="text-cyan-400 font-medium">no reemplaza</strong> el criterio humano, la instrucción formal ni las fuentes meteorológicas oficiales de aviación. El piloto asume la total responsabilidad de la decisión final de despegue basándose en su nivel de experiencia y las condiciones climáticas del momento.</p>
                </div>
            </section>

            <section className="p-8 rounded-2xl border border-white/5 bg-white/2 backdrop-blur-md transition-all hover:border-cyan-500/20 group">
                <div className="flex items-center gap-3 mb-4">
                    <span className="font-mono text-cyan-400 text-[10px] py-1 px-2 border border-cyan-500/30 rounded bg-cyan-500/5">
                        CL-02
                    </span>
                    <h2 className="text-lg font-semibold text-slate-100 uppercase tracking-tight">
                        Uso de Datos Geoespaciales y Rutas
                    </h2>
                </div>
                <div className="text-slate-400 text-sm leading-relaxed space-y-4">
                    <p>Las rutas de senderismo y las delimitaciones de las zonas de despegue mostradas son estrictamente referenciales. La topografía y la micro-meteorología local pueden variar drásticamente debido a dinámicas naturales o intervenciones humanas.</p>
                    <p>Arpia no se responsabiliza por variaciones en el terreno, bloqueos en los accesos de hiking o condiciones adversas que no se reflejen en tiempo real en la plataforma.</p>
                </div>
            </section>

            <section className="p-8 rounded-2xl border border-white/5 bg-white/2 backdrop-blur-md transition-all hover:border-cyan-500/20 group">
                <div className="flex items-center gap-3 mb-4">
                    <span className="font-mono text-cyan-400 text-[10px] py-1 px-2 border border-cyan-500/30 rounded bg-cyan-500/5">
                        CL-03
                    </span>
                    <h2 className="text-lg font-semibold text-slate-100 uppercase tracking-tight">
                        Regulaciones de Espacio Aéreo
                    </h2>
                </div>
                <p className="text-slate-400 text-sm leading-relaxed">
                    Al utilizar la telemetría, el usuario se compromete a respetar en todo momento las normativas locales aeronáuticas, incluyendo zonas de tránsito aéreo controladas (TMA), techos de vuelo máximos y restricciones temporales (NOTAMs). El uso indebido de nuestra herramienta para violar deliberadamente el espacio aéreo resultará en la baja de su cuenta.
                </p>
            </section>

            <section className="p-8 rounded-2xl border border-white/5 bg-white/2 backdrop-blur-md transition-all hover:border-cyan-500/20 group">
                <div className="flex items-center gap-3 mb-4">
                    <span className="font-mono text-cyan-400 text-[10px] py-1 px-2 border border-cyan-500/30 rounded bg-cyan-500/5">
                        CL-04
                    </span>
                    <h2 className="text-lg font-semibold text-slate-100 uppercase tracking-tight">
                        Disponibilidad del Ecosistema
                    </h2>
                </div>
                <p className="text-slate-400 text-sm leading-relaxed">
                    Nuestro compromiso es garantizar el máximo tiempo de actividad del servicio en la nube. Sin embargo, Arpia se reserva el derecho de modificar o suspender módulos de la aplicación por mantenimiento técnico sin aviso previo. No garantizamos una precisión absoluta frente a interrupciones satelitales o latencias en los datos métricos.
                </p>
            </section>
        </article>
    );
}