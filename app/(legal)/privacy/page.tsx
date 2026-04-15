'use client';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function PrivacyPage() {
    const containerRef = useRef(null);

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
        <article ref={containerRef} className="space-y-12">
            <header className="border-b border-cyan-500/20 pb-8">
                <span className="text-cyan-500 font-mono text-xs tracking-widest">[AR-PRIV-00]</span>
                <h1 className="text-4xl font-bold tracking-tighter text-white mt-2 uppercase">
                    Protocolo de Privacidad
                </h1>
            </header>

            <section className="p-8 rounded-2xl border border-white/5 bg-white/2 backdrop-blur-md transition-all hover:border-cyan-500/20">
                <div className="flex items-center gap-3 mb-4">
                    <span className="font-mono text-cyan-400 text-[10px] py-1 px-2 border border-cyan-500/30 rounded bg-cyan-500/5">
                        DP-01
                    </span>
                    <h2 className="text-lg font-semibold text-slate-100 uppercase tracking-tight">
                        Telemetría y Tracking
                    </h2>
                </div>
                <p className="text-slate-400 text-sm leading-relaxed">
                    Recopilamos datos de ubicación en tiempo real únicamente durante misiones de vuelo activas para garantizar la seguridad y logística de recogida (retrieval).
                </p>
            </section>

            <section className="p-8 rounded-2xl border border-white/5 bg-white/2 backdrop-blur-md transition-all hover:border-cyan-500/20">
                <div className="flex items-center gap-3 mb-4">
                    <span className="font-mono text-cyan-400 text-[10px] py-1 px-2 border border-cyan-500/30 rounded bg-cyan-500/5">
                        DP-02
                    </span>
                    <h2 className="text-lg font-semibold text-slate-100 uppercase tracking-tight">
                        Consentimiento de Cookies
                    </h2>
                </div>
                <p className="text-slate-400 text-sm leading-relaxed">
                    El usuario puede gestionar sus permisos de análisis y marketing a través de nuestro banner de telemetría persistente.
                </p>
            </section>
        </article>
    );
}