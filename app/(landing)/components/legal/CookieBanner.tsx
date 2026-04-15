'use client';
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { useConsentStore } from '@/store/useConsentStore';

export default function ArpiaCookieBanner() {
    const bannerRef = useRef(null);
    const { hasInteracted, setConsent } = useConsentStore();
    const [isMounted, setIsMounted] = useState(false);

    // Evitamos problemas de hidratación con Zustand persist
    useEffect(() => {
        setIsMounted(true);
    }, []);

    useEffect(() => {
        if (isMounted && !hasInteracted && bannerRef.current) {
            const ctx = gsap.context(() => {
                gsap.fromTo(bannerRef.current,
                    { y: 100, opacity: 0 },
                    { y: 0, opacity: 1, duration: 1.2, ease: 'power4.out', delay: 1 }
                );
            });
            return () => ctx.revert();
        }
    }, [isMounted, hasInteracted]);

    if (!isMounted || hasInteracted) return null;

    return (
        <div ref={bannerRef} className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] w-[90vw] max-w-xl">
            <div className="bg-white/10 backdrop-blur-2xl border border-white/20 p-6 rounded-2xl shadow-2xl tracking-wide">
                <h4 className="text-cyan-300 font-mono text-[10px] uppercase tracking-widest mb-2 italic">Personaliza tu experiencia</h4>
                <p className="text-white text-sm mb-6 leading-relaxed font-medium text-shadow-sm">
                    En nuestra plataforma queremos que encuentres todo en un solo lugar: desde el estado del viento hasta la mesa de ese restaurante que te encanta. Usamos cookies para personalizar tu búsqueda de competencias, hoteles y rutas. Al aceptar, nos permites mejorar tu experiencia de usuario y ofrecerte contenido relevante para tu próxima aventura.
                </p>
                <div className="flex gap-4 font-mono">
                    <button
                        onClick={() => setConsent(true)}
                        className="flex-1 bg-cyan-600/90 hover:bg-cyan-500 text-white text-[11px] font-bold py-3 rounded-lg uppercase tracking-tighter transition-all shadow-md">
                        Aceptar cookies
                    </button>
                    <button
                        onClick={() => setConsent(false)}
                        className="flex-1 bg-white/5 border border-white/20 text-white text-[11px] py-3 rounded-lg hover:bg-white/10 transition-all uppercase text-center shadow-md">
                        Solo Esenciales
                    </button>
                </div>
            </div>
        </div>
    );
}