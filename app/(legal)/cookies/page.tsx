'use client';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function CookiesPage() {
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
        <article ref={containerRef} className="space-y-12 font-['Helvetica_Neue',Helvetica,Arial,sans-serif] text-black">
            <header className="border-b border-gray-800 pb-8 mb-12">
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-black mb-4 uppercase">
                    Política de Uso de Cookies
                </h1>
                <p className="text-black text-sm max-w-2xl leading-relaxed">
                    Fecha de la última revisión: Abril 2026
                </p>
            </header>

            <section className="group">
                <div className="flex items-center gap-3 mb-4">
                    <span className="text-black text-xs font-medium">01</span>
                    <h2 className="text-xl font-semibold text-black tracking-tight uppercase">
                        Definición y Función de las Cookies
                    </h2>
                </div>
                <div className="text-black text-sm leading-relaxed space-y-4">
                    <p>Una cookie es un fichero o dispositivo que se descarga en el equipo terminal de un Usuario (ordenador, teléfono móvil, tableta, etc.) al acceder a determinadas páginas web, con la finalidad de almacenar y recuperar información sobre la navegación que se efectúa desde dicho equipo.</p>
                </div>
            </section>

            <section className="group">
                <div className="flex items-center gap-3 mb-4">
                    <span className="text-black text-xs font-medium">02</span>
                    <h2 className="text-xl font-semibold text-black tracking-tight uppercase">
                        Tipología de Cookies Utilizadas
                    </h2>
                </div>
                <div className="text-black text-sm leading-relaxed space-y-4">
                    <p>ARPÍA emplea las siguientes categorías de cookies:</p>
                    <ul className="space-y-4">
                        <li><strong className="text-black font-medium">Cookies Estrictamente Necesarias (Técnicas):</strong> Son esenciales para el correcto funcionamiento de la Plataforma y permiten al Usuario la navegación a través de la misma y la utilización de las diferentes opciones o servicios que en ella existen. Por ejemplo, se usan para controlar el tráfico y la comunicación de datos, identificar la sesión o recordar los elementos que integran una solicitud de información.</li>
                        <li><strong className="text-black font-medium">Cookies de Personalización:</strong> Permiten al Usuario acceder al servicio con algunas características de carácter general predefinidas en función de una serie de criterios en el terminal del Usuario, como por ejemplo, el idioma o la configuración regional desde donde accede al servicio.</li>
                        <li><strong className="text-black font-medium">Cookies de Análisis:</strong> Permiten al responsable de las mismas el seguimiento y análisis del comportamiento de los Usuarios de los sitios web a los que están vinculadas. La información recogida se utiliza en la medición de la actividad de los sitios web, aplicación o plataforma y para la elaboración de perfiles de navegación de los Usuarios de dichos sitios, con el fin de introducir mejoras en función del análisis de los datos de uso que hacen los Usuarios del servicio.</li>
                        <li><strong className="text-black font-medium">Cookies de Terceros:</strong> ARPÍA puede utilizar servicios de terceros que recopilarán información con fines estadísticos, de uso de la Plataforma por parte del Usuario y para la prestación de otros servicios relacionados con la actividad del sitio web.</li>
                    </ul>
                </div>
            </section>

            <section className="group">
                <div className="flex items-center gap-3 mb-4">
                    <span className="text-black text-xs font-medium">03</span>
                    <h2 className="text-xl font-semibold text-black tracking-tight uppercase">
                        Consentimiento y Gestión de Cookies
                    </h2>
                </div>
                <div className="text-black text-sm leading-relaxed space-y-4">
                    <p>Al acceder a la Plataforma por primera vez, el Usuario es informado sobre el uso de cookies y otorga su consentimiento expreso e inequívoco para el uso de las mismas, de conformidad con los términos de esta Política de Cookies.</p>
                    <p>El Usuario tiene la posibilidad de configurar su navegador para ser alertado de la recepción de cookies e impedir su instalación en su equipo. La mayoría de los navegadores ofrecen la posibilidad de permitir, bloquear o eliminar las cookies instaladas en el equipo. Sin embargo, la desactivación de ciertas cookies puede implicar que algunos servicios o funcionalidades de la Plataforma no estén disponibles o no funcionen correctamente.</p>
                </div>
            </section>

            <section className="group">
                <div className="flex items-center gap-3 mb-4">
                    <span className="text-black text-xs font-medium">04</span>
                    <h2 className="text-xl font-semibold text-black tracking-tight uppercase">
                        Conservación de Datos
                    </h2>
                </div>
                <div className="text-black text-sm leading-relaxed space-y-4">
                    <p>Las cookies mantendrán un periodo de conservación específico que se determinará en función de su finalidad. En cualquier circunstancia, el Usuario conserva el derecho de revocar su consentimiento o de ejercer sus derechos conforme a lo establecido en la sección 5 (Protección de Datos Personales) de los Términos y Condiciones.</p>
                </div>
            </section>
        </article>
    );
}
