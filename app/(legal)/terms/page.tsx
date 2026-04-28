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
        <article ref={containerRef} className="space-y-12 font-['Helvetica_Neue',Helvetica,Arial,sans-serif] text-black">
            <header className="border-b border-gray-800 pb-8 mb-12">
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-black mb-4 uppercase">
                    Términos y Condiciones de Uso
                </h1>
                <p className="text-black text-sm max-w-2xl leading-relaxed">
                    Última actualización: Abril 2026
                </p>
            </header>

            <section className="group">
                <div className="flex items-center gap-3 mb-4">
                    <span className="text-black text-xs font-medium">01</span>
                    <h2 className="text-xl font-semibold text-black tracking-tight uppercase">
                        Información General y Aceptación
                    </h2>
                </div>
                <div className="text-black text-sm leading-relaxed space-y-4">
                    <p>Los presentes Términos y Condiciones regulan el acceso y la utilización de la plataforma digital, cuyo propósito es proporcionar información meteorológica, horarios y directorios de servicios turísticos (alojamiento y gastronomía) dirigidos a la comunidad de parapentistas.</p>
                    <p>El acceso, la navegación o el uso de la Plataforma por parte del usuario implicará la aceptación plena e incondicional de la totalidad de los términos aquí contenidos. En caso de no estar de acuerdo con estos Términos, el Usuario deberá abstenerse de utilizar el servicio.</p>
                </div>
            </section>

            <section className="group">
                <div className="flex items-center gap-3 mb-4">
                    <span className="text-black text-xs font-medium">02</span>
                    <h2 className="text-xl font-semibold text-black tracking-tight uppercase">
                        Objeto del Servicio
                    </h2>
                </div>
                <div className="text-black text-sm leading-relaxed space-y-4">
                    <p>La Plataforma opera exclusivamente como un agregador de contenido informativo y una herramienta de consulta. Su finalidad es proporcionar datos de soporte para la actividad del parapentismo, incluyendo:</p>
                    <ul className="list-disc pl-6 space-y-2">
                        <li>Reportes climáticos y predicciones meteorológicas.</li>
                        <li>Directorios de establecimientos de terceros (alojamiento, gastronomía).</li>
                        <li>Horarios de competencias.</li>
                    </ul>
                    <p>Se precisa que la Plataforma no constituye una empresa de turismo de aventura, una escuela de vuelo, ni un proveedor directo de servicios de alojamiento o alimentación.</p>
                </div>
            </section>

            <section className="group">
                <div className="flex items-center gap-3 mb-4">
                    <span className="text-black text-xs font-medium">03</span>
                    <h2 className="text-xl font-semibold text-black tracking-tight uppercase">
                        Exención y Limitación de Responsabilidad
                    </h2>
                </div>
                <div className="text-black text-sm leading-relaxed space-y-4">
                    <p>Dada la naturaleza inherente de riesgo asociada al parapentismo, se establecen las siguientes limitaciones:</p>
                    <ul className="space-y-4">
                        <li><strong className="text-white font-medium">Precisión de Datos Climáticos:</strong> La información meteorológica se obtiene de fuentes externas y modelos predictivos. La Plataforma no garantiza la exactitud ni la fiabilidad absoluta de dichos datos. El Usuario reconoce y acepta que las condiciones ambientales y climáticas en entornos de montaña son inherentemente variables y susceptibles a cambios repentinos.</li>
                        <li><strong className="text-white font-medium">Decisión de Vuelo:</strong> La determinación de ejecutar una actividad de vuelo es responsabilidad exclusiva e indelegable del piloto o Usuario. La Plataforma se exonera de toda responsabilidad por cualquier accidente, lesión corporal, daño material o pérdida resultante de decisiones adoptadas por el Usuario basadas en la información provista.</li>
                        <li><strong className="text-white font-medium">Servicios de Terceros:</strong> La Plataforma no garantiza la calidad, seguridad o disponibilidad de los servicios ofrecidos por terceros referenciados (tales como hoteles o restaurantes). Cualquier controversia o reclamación relacionada con dichos servicios deberá tramitarse directamente ante el prestador final correspondiente.</li>
                    </ul>
                </div>
            </section>

            <section className="group">
                <div className="flex items-center gap-3 mb-4">
                    <span className="text-black text-xs font-medium">04</span>
                    <h2 className="text-xl font-semibold text-black tracking-tight uppercase">
                        Propiedad Intelectual
                    </h2>
                </div>
                <div className="text-black text-sm leading-relaxed space-y-4">
                    <p>Todo el contenido disponible en la Plataforma, incluyendo, sin limitación, el diseño gráfico, el código fuente, los logotipos, las interfaces y las bases de datos, es propiedad intelectual de Arpia y de sus licenciantes.</p>
                    <p>Se prohíbe de manera expresa y taxativa:</p>
                    <ul className="list-disc pl-6 space-y-2">
                        <li>La utilización de técnicas de rastreo web (scraping), minería de datos o cualquier método automatizado para la extracción de información de la base de datos.</li>
                        <li>La reproducción, distribución o comunicación pública, total o parcial, del contenido con propósitos comerciales sin la previa y expresa autorización por escrito.</li>
                    </ul>
                </div>
            </section>

            <section className="group">
                <div className="flex items-center gap-3 mb-4">
                    <span className="text-black text-xs font-medium">05</span>
                    <h2 className="text-xl font-semibold text-black tracking-tight uppercase">
                        Protección de Datos Personales (Habeas Data)
                    </h2>
                </div>
                <div className="text-black text-sm leading-relaxed space-y-4">
                    <p>En cumplimiento de la Ley 1581 de 2012 (Colombia), el Usuario otorga su autorización para el tratamiento de sus datos personales con las siguientes finalidades:</p>
                    <ul className="list-disc pl-6 space-y-2">
                        <li>Gestión de la cuenta de usuario.</li>
                        <li>Envío de alertas climáticas y notificaciones inherentes a la prestación del servicio.</li>
                        <li>Personalización de la experiencia de usuario.</li>
                    </ul>
                    <p>El Usuario podrá ejercer sus derechos de Habeas Data, incluyendo los derechos de conocimiento, acceso, rectificación, actualización y supresión de sus datos personales, a través de los mecanismos de contacto dispuestos por la Plataforma.</p>
                </div>
            </section>

            <section className="group">
                <div className="flex items-center gap-3 mb-4">
                    <span className="text-black text-xs font-medium">06</span>
                    <h2 className="text-xl font-semibold text-black tracking-tight uppercase">
                        Reglas de Conducta
                    </h2>
                </div>
                <div className="text-black text-sm leading-relaxed space-y-4">
                    <p>El Usuario se obliga formalmente a:</p>
                    <ul className="list-disc pl-6 space-y-2">
                        <li>Suministrar información exacta y veraz durante el proceso de registro.</li>
                        <li>Abstenerse de utilizar la Plataforma para la ejecución de actividades ilícitas o que contravengan los derechos de terceros.</li>
                        <li>No ejecutar acciones que comprometan la integridad o seguridad del sistema, incluyendo intentos de acceso no autorizado o ataques informáticos.</li>
                    </ul>
                </div>
            </section>

            <section className="group">
                <div className="flex items-center gap-3 mb-4">
                    <span className="text-black text-xs font-medium">07</span>
                    <h2 className="text-xl font-semibold text-black tracking-tight uppercase">
                        Ley Aplicable y Jurisdicción
                    </h2>
                </div>
                <div className="text-black text-sm leading-relaxed space-y-4">
                    <p>Los presentes Términos se rigen e interpretan conforme a las leyes de la República de Colombia. Cualquier controversia se someterá a la jurisdicción de los tribunales competentes en Colombia.</p>
                </div>
            </section>

            <section className="group">
                <div className="flex items-center gap-3 mb-4">
                    <span className="text-black text-xs font-medium">08</span>
                    <h2 className="text-xl font-semibold text-black tracking-tight uppercase">
                        Modificaciones
                    </h2>
                </div>
                <div className="text-black text-sm leading-relaxed space-y-4">
                    <p>Arpía se reserva el derecho unilateral de modificar o actualizar los presentes Términos y Condiciones en cualquier momento. Dichas modificaciones entrarán en vigencia a partir de su inmediata publicación en la Plataforma.</p>
                </div>
            </section>
        </article>
    );
}