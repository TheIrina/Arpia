import Link from "next/link";

export function PrivacySections1to4() {
  return (
    <>
      <section className="group">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-black text-xs font-medium">01</span>
          <h2 className="text-xl font-semibold text-black tracking-tight uppercase">
            Identificación del Responsable del Tratamiento
          </h2>
        </div>
        <div className="text-black text-sm leading-relaxed space-y-4">
          <p>
            El responsable del tratamiento de los datos personales es [Insertar
            Nombre o Razón Social del Responsable Legal de ARPÍA] con domicilio
            en [Insertar Domicilio Legal].
          </p>
        </div>
      </section>

      <section className="group">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-black text-xs font-medium">02</span>
          <h2 className="text-xl font-semibold text-black tracking-tight uppercase">
            Datos Personales Objeto de Tratamiento
          </h2>
        </div>
        <div className="text-black text-sm leading-relaxed space-y-4">
          <p>
            ARPÍA recopila información en diferentes momentos de la interacción
            del Usuario con la Plataforma, incluyendo:
          </p>
          <ul className="space-y-4">
            <li>
              <strong className="text-black font-medium">
                Datos de Identificación y Contacto:
              </strong>{" "}
              Nombre completo, dirección de correo electrónico, número de
              teléfono y, si aplica, dirección postal.
            </li>
            <li>
              <strong className="text-black font-medium">
                Datos de Registro y Cuenta:
              </strong>{" "}
              Nombre de usuario, contraseña (cifrada), fecha de alta y datos
              asociados a la gestión de la cuenta.
            </li>
            <li>
              <strong className="text-black font-medium">
                Datos Transaccionales/Comerciales:
              </strong>{" "}
              Información relativa a los pagos, compras o servicios contratados
              a través de la Plataforma (sin incluir detalles sensibles de
              tarjetas de crédito, que son procesados por terceros).
            </li>
            <li>
              <strong className="text-black font-medium">
                Datos de Navegación y Uso (Cookies):
              </strong>{" "}
              Información sobre la actividad en la Plataforma, la dirección IP,
              el tipo de dispositivo y datos de geolocalización (ver la{" "}
              <Link
                href="/cookies"
                className="text-cyan-400 hover:text-cyan-300 underline transition-colors"
              >
                Política de Uso de Cookies
              </Link>{" "}
              para detalles).
            </li>
          </ul>
        </div>
      </section>

      <section className="group">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-black text-xs font-medium">03</span>
          <h2 className="text-xl font-semibold text-black tracking-tight uppercase">
            Finalidades del Tratamiento de Datos
          </h2>
        </div>
        <div className="text-black text-sm leading-relaxed space-y-4">
          <p>
            Los datos personales de los Usuarios son tratados con las siguientes
            finalidades:
          </p>
          <ul className="space-y-4">
            <li>
              <strong className="text-black font-medium">
                3.1. Prestación del Servicio Principal:
              </strong>{" "}
              Gestionar el registro del Usuario, permitir el acceso a los
              servicios y funcionalidades de la Plataforma, procesar
              transacciones y facilitar la comunicación de servicio.
            </li>
            <li>
              <strong className="text-black font-medium">
                3.2. Mejora y Personalización:
              </strong>{" "}
              Analizar el uso de la Plataforma para optimizar su funcionamiento,
              personalizar la experiencia del Usuario y desarrollar nuevas
              funcionalidades y servicios.
            </li>
            <li>
              <strong className="text-black font-medium">
                3.3. Comunicaciones Comerciales y Promocionales:
              </strong>{" "}
              Enviar comunicaciones informativas y promocionales sobre
              productos, servicios, ofertas y novedades de ARPÍA (el Usuario
              podrá oponerse a estas comunicaciones en cualquier momento).
            </li>
            <li>
              <strong className="text-black font-medium">
                3.4. Cumplimiento Legal y Seguridad:
              </strong>{" "}
              Cumplir con obligaciones legales y regulatorias, atender
              requerimientos de autoridades competentes, y prevenir el fraude y
              usos indebidos de la Plataforma.
            </li>
          </ul>
        </div>
      </section>

      <section className="group">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-black text-xs font-medium">04</span>
          <h2 className="text-xl font-semibold text-black tracking-tight uppercase">
            Base Legal para el Tratamiento
          </h2>
        </div>
        <div className="text-black text-sm leading-relaxed space-y-4">
          <p>
            ARPÍA trata los datos personales basándose en las siguientes
            legitimaciones:
          </p>
          <ul className="space-y-4">
            <li>
              <strong className="text-black font-medium">
                Ejecución de un Contrato:
              </strong>{" "}
              El tratamiento es necesario para ejecutar los Términos y
              Condiciones que el Usuario acepta al registrarse y utilizar los
              servicios de ARPÍA.
            </li>
            <li>
              <strong className="text-black font-medium">
                Consentimiento del Interesado:
              </strong>{" "}
              Para el envío de comunicaciones comerciales y el uso de ciertas
              categorías de cookies, el tratamiento se basa en el consentimiento
              explícito del Usuario.
            </li>
            <li>
              <strong className="text-black font-medium">
                Interés Legítimo:
              </strong>{" "}
              Para la mejora de la Plataforma, la prevención del fraude y la
              seguridad de la red.
            </li>
            <li>
              <strong className="text-black font-medium">
                Obligación Legal:
              </strong>{" "}
              Cuando el tratamiento es requerido para cumplir con una obligación
              legal aplicable al Responsable.
            </li>
          </ul>
        </div>
      </section>
    </>
  );
}

