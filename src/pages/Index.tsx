import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Church, Wine, Gift, ShoppingBag, CreditCard, Ticket, X } from "lucide-react";

import { useInvitationData } from "@/hooks/useInvitationData";

import heroImg from "@/assets/_MG_9100.jpg";
import storyImg from "@/assets/story.jpg";
import rsvpImg from "@/assets/rsvp.jpg";
import padresImg from "@/assets/_MG_8868.png";
import dresscodeFormalImg from "@/assets/dresscode_formal.png";
import dresscodeSneakerImg from "@/assets/dresscode_sneaker.png";
import flyerImg from "@/assets/flyer.jpeg";

gsap.registerPlugin(ScrollTrigger);

const numeroAPalabra = (num: number) => {
  const words = ['CERO', 'UN', 'DOS', 'TRES', 'CUATRO', 'CINCO', 'SEIS', 'SIETE', 'OCHO', 'NUEVE', 'DIEZ'];
  return words[num] || num.toString();
};

const Index = () => {
  const root = useRef<HTMLDivElement>(null);
  const { nombre, pases, telefono } = useInvitationData();
  const [isFlyerOpen, setIsFlyerOpen] = useState(false);
  const [isRsvpOpen, setIsRsvpOpen] = useState(false);
  const [asistencia, setAsistencia] = useState<string>('');
  const [rsvpStatus, setRsvpStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleRsvpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!asistencia) return;
    setRsvpStatus('submitting');
    const formUrl = 'https://docs.google.com/forms/d/e/1FAIpQLSdbCoSFcNEpuFsJOZmHn9F5FJ8DSjETjpYG-Cqad93GCv6B3g/formResponse';
    const formData = new URLSearchParams();
    formData.append('entry.1498135098', nombre || 'Invitado sin nombre');
    formData.append('entry.954266149', telefono || 'Sin teléfono');
    formData.append('entry.471299083', (pases || 0).toString());
    formData.append('entry.877086558', asistencia);

    try {
      await fetch(formUrl, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: formData.toString()
      });
      setRsvpStatus('success');
    } catch (error) {
      setRsvpStatus('error');
    }
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animación de entrada Hero
      gsap.from(".hero-nav", { y: -20, opacity: 0, duration: 1.2, ease: "power3.out" });
      gsap.from(".hero-eyebrow", { y: 20, opacity: 0, duration: 1.2, delay: 0.4, ease: "power3.out" });
      gsap.from(".hero-title", { y: 40, opacity: 0, duration: 1.6, delay: 0.6, ease: "power3.out" });
      gsap.from(".hero-date", { y: 20, opacity: 0, duration: 1.2, delay: 1, ease: "power3.out" });

      // Revelación de secciones
      gsap.utils.toArray<HTMLElement>(".reveal").forEach((el) => {
        gsap.from(el, {
          opacity: 0,
          y: 60,
          duration: 1.4,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        });
      });

      // Efecto Parallax en imágenes
      gsap.utils.toArray<HTMLElement>(".frame-img").forEach((el) => {
        gsap.fromTo(
          el,
          { scale: 1.15, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 1.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: el,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    }, root);

    return () => ctx.revert();
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const itinerary = [
    {
      time: "5:00",
      ampm: "P. M.",
      title: "CEREMONIA RELIGIOSA",
      location: "Parroquia Nuestra Señora de Fátima",
      icon: <Church strokeWidth={1} className="w-10 h-10 md:w-12 md:h-12" />,
      mapLink: "https://maps.app.goo.gl/bz5EgJFWQ7QxXiYp7" // Enlace Iglesia
    },
    {
      time: "8:00",
      ampm: "P. M.",
      title: "RECEPCIÓN",
      location: "Salón Marsella",
      icon: <Wine strokeWidth={1} className="w-10 h-10 md:w-12 md:h-12" />,
      mapLink: "https://maps.app.goo.gl/rQeF94DS54QLoJXa6" // Enlace Recepción
    },
  ];

  return (
    <div ref={root} className="bg-cream text-ink overflow-x-hidden">
      {/* HERO */}
      <section id="home" className="relative h-screen w-full">
        <img
          src={heroImg}
          alt="Pareja en el bosque"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-overlay" />

        <nav className="hero-nav absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-6 md:px-12 py-6 text-cream">
          <button
            onClick={() => scrollTo("rsvp")}
            className="bg-cream text-ink px-6 py-2.5 text-xs tracking-widest-extra uppercase hover:bg-gold hover:text-cream transition-colors rounded-full"
          >
            Confirmar
          </button>
        </nav>

        <div className="relative z-10 flex h-full flex-col items-center justify-center text-center text-cream px-6">
          <p
            style={{ textShadow: '2px 2px 8px rgba(0,0,0,0.8)' }}
            className="hero-eyebrow font-sans font-medium text-sm md:text-base tracking-widest-extra uppercase mb-6"
          >
            ¡NOS CASAMOS!
          </p>
          <h1
            style={{
              fontFamily: 'Corinthia, cursive',
              textShadow: '0 0 10px rgba(255, 255, 235, 0.8), 0 0 40px rgba(255, 255, 235, 0.4)'
            }}
            className="hero-title font-serif text-6xl md:text-8xl lg:text-9xl font-light mb-8 leading-none"
          >
            Verónica <span className="italic">&</span> Alejandro
          </h1>
          <p
            style={{ textShadow: '2px 2px 8px rgba(0,0,0,0.8)' }}
            className="hero-date font-sans font-medium text-[14px] sm:text-[18px] md:text-[24px] tracking-widest-extra uppercase"
          >
            24 · OCTUBRE · 2026
          </p>
        </div>
      </section>

      {/* BENDICIÓN DE PADRES */}
      <section className="py-24 md:py-32 px-6 md:px-12 bg-cream reveal">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12 md:gap-20">

          <div className="w-full md:w-1/3 order-2 md:order-1 overflow-hidden shadow-frame aspect-[3/4]">
            <img
              src={padresImg}
              alt="Anillos de boda"
              loading="lazy"
              className="frame-img h-full w-full object-cover"
            />
          </div>

          <div className="w-full md:w-2/3 order-1 md:order-2 flex flex-col items-center text-center">
            <p className="font-serif italic text-2xl md:text-3xl mb-16 text-ink/90 leading-relaxed max-w-xl">
              Con la bendición de Dios, de nuestra santísima Virgen y de nuestros padres
            </p>

            <div className="space-y-4 mb-10">
              <p className="text-sm md:text-base tracking-widest-extra uppercase text-ink font-light">Verónica Patricia Guardado Medina</p>
              <p className="text-sm md:text-base tracking-widest-extra uppercase text-ink font-light">Juan José Medina Ortiz</p>
            </div>

            <p className="font-serif italic text-4xl md:text-5xl mb-10 text-ink/40">&</p>

            <div className="space-y-4">
              <p className="text-sm md:text-base tracking-widest-extra uppercase text-ink font-light">Diana Verónica Sinsel Gómez</p>
              <p className="text-sm md:text-base tracking-widest-extra uppercase text-ink font-light">Arsenio Hernández Mendoza</p>
            </div>
          </div>
        </div>
      </section>

      {/* ITINERARIO */}
      <section id="itinerario" className="py-24 md:py-40 px-6 md:px-12 bg-muted">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-20 reveal">
            <h2 className="font-serif text-5xl md:text-6xl italic text-ink">Itinerario</h2>
          </div>

          <div className="relative flex flex-col items-center">
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-ink/40 -translate-x-1/2"></div>

            {itinerary.map((item, index) => {
              const isEven = index % 2 === 0;
              return (
                <div key={index} className="relative w-full flex justify-between items-center mb-16 md:mb-24 reveal">

                  {/* Lado Izquierdo */}
                  <div className="w-[45%] flex justify-end">
                    {isEven ? (
                      <div className="text-ink/80">{item.icon}</div>
                    ) : (
                      <div className="w-full flex flex-col items-center text-center">
                        <p className="text-xs md:text-sm font-bold tracking-widest-extra uppercase text-ink/80 whitespace-pre-line">
                          {item.title}
                        </p>
                        <p className="text-sm mt-1 text-ink/80">
                          {item.time} <span className="text-xs">{item.ampm}</span>
                        </p>
                        {item.location && (
                          <p className="text-sm italic mt-1 text-ink/80">
                            {item.location}
                          </p>
                        )}
                        {item.mapLink && (
                          <div className="w-full flex justify-center mt-4">
                            <a
                              href={item.mapLink}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-block bg-ink text-cream px-6 py-2.5 rounded-full text-[10px] md:text-xs tracking-widest-extra uppercase hover:bg-gold hover:text-cream transition-colors duration-300 shadow-sm"
                            >
                              ¿Cómo llegar?
                            </a>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-ink z-10"></div>

                  {/* Lado Derecho */}
                  <div className="w-[45%] flex justify-start">
                    {isEven ? (
                      <div className="w-full flex flex-col items-center text-center">
                        <p className="text-xs md:text-sm font-bold tracking-widest-extra uppercase text-ink/80 whitespace-pre-line">
                          {item.title}
                        </p>
                        <p className="text-sm mt-1 text-ink/80">
                          {item.time} <span className="text-xs">{item.ampm}</span>
                        </p>
                        {item.location && (
                          <p className="text-sm italic mt-1 text-ink/80">
                            {item.location}
                          </p>
                        )}
                        {item.mapLink && (
                          <div className="w-full flex justify-center mt-4">
                            <a
                              href={item.mapLink}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-block bg-ink text-cream px-6 py-2.5 rounded-full text-[10px] md:text-xs tracking-widest-extra uppercase hover:bg-gold hover:text-cream transition-colors duration-300 shadow-sm"
                            >
                              ¿Cómo llegar?
                            </a>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="text-ink/80">{item.icon}</div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="text-center mt-24 reveal">
            <p className="text-sm md:text-base tracking-widest-extra uppercase text-ink/80 font-light leading-relaxed">
              <span className="text-[3.5vw] sm:text-[20px] md:text-[24px] font-bold text-ink whitespace-nowrap">24 · Octubre · 2026</span>
              <br />
              <br />
              LOS MOCHIS · SINALOA
            </p>
          </div>
        </div>
      </section>

      {/* CÓDIGO DE VESTIMENTA */}
      <section className="py-24 md:py-32 px-6 md:px-12 bg-cream reveal">
        <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
          <h2 className="font-serif text-5xl md:text-6xl italic text-ink mb-16">
            Código de vestimenta
          </h2>

          <p className="text-sm md:text-base tracking-widest-extra uppercase text-ink font-bold mb-10">
            Etiqueta rigurosa
          </p>

          <div className="mb-16">
            <img src={dresscodeFormalImg} alt="Traje y vestido" className="h-32 md:h-40 object-contain mix-blend-multiply opacity-80" />
          </div>

          <p className="font-serif italic text-2xl md:text-3xl mb-10 text-ink/90 leading-relaxed max-w-2xl">
            La pista nos espera y no aceptamos excusas.<br className="hidden md:block" /> ¡Lleva tus tenis y a bailar!
          </p>

          <div>
            <img src={dresscodeSneakerImg} alt="Tenis" className="h-24 md:h-32 object-contain mix-blend-multiply opacity-80" />
          </div>
        </div>
      </section>

      {/* PASES */}
      <section className="py-24 md:py-32 px-6 md:px-12 bg-muted text-ink reveal">
        <div className="max-w-3xl mx-auto flex flex-col items-center text-center">
          <h2 className="font-serif text-5xl md:text-6xl italic mb-8">
            Pases
          </h2>
          <br></br>

          {nombre ? (
            <>
              <p className="text-sm md:text-base tracking-widest-extra uppercase font-bold text-ink mb-8">
                {nombre}
              </p>
              <p className="text-xs md:text-sm tracking-widest-extra uppercase text-ink/80 mb-8">
                Hemos reservado
              </p>
            </>
          ) : (
            <p className="text-xs md:text-sm tracking-widest-extra uppercase text-ink/80 mb-8">
              Hemos reservado
            </p>
          )}

          <p className="font-serif text-6xl md:text-8xl text-gold mb-8">
            {numeroAPalabra(pases)}
          </p>

          <p className="text-xs md:text-sm tracking-widest-extra uppercase text-ink/80 mb-8">
            {pases === 1 ? 'lugar en su honor' : 'lugares en su honor'}
          </p>

          <p className="text-sm md:text-base tracking-widest-extra uppercase font-bold">
            No niños
          </p>
        </div>
      </section>

      {/* SUGERENCIA DE HOSPEDAJE */}
      <section className="py-24 md:py-32 px-6 md:px-12 bg-cream text-ink reveal">
        <div className="max-w-3xl mx-auto flex flex-col items-center text-center">
          <h2 className="font-serif text-5xl md:text-6xl italic mb-16">
            Sugerencia de hospedaje
          </h2>

          <div className="w-full flex flex-col items-center">
            <h3 className="text-sm md:text-base tracking-widest-extra uppercase font-bold mb-4 text-center">
              Hotel Santa Anita Executive
            </h3>
            <p className="text-[10px] md:text-xs tracking-widest uppercase mb-10 text-ink/80 text-center">
              Av. Gral. Gabriel Leyva s/n, Centro, 81200 Los Mochis, Sin.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 mb-10 w-full justify-center max-w-lg">
              <a href="tel:+526688167046" className="bg-ink text-cream shadow-sm px-8 py-3 rounded-full text-[10px] md:text-xs tracking-widest-extra uppercase hover:bg-gold transition-colors duration-300 w-full sm:w-auto text-center flex-1">
                668 816 7046
              </a>
              <a href="https://maps.google.com/?q=Hotel+Santa+Anita+Executive+Los+Mochis" target="_blank" rel="noreferrer" className="bg-ink text-cream shadow-sm px-8 py-3 rounded-full text-[10px] md:text-xs tracking-widest-extra uppercase hover:bg-gold transition-colors duration-300 w-full sm:w-auto text-center flex-1">
                ¿Cómo llegar?
              </a>
            </div>

            <div className="flex flex-col items-center">
              <p className="text-[9px] md:text-[10px] tracking-widest uppercase text-ink/80 text-center leading-relaxed max-w-xl">
                Al reservar, menciona el <span className="font-bold">"Evento especial Boda Verónica Medina & Alejandro Sinsel"</span> para aprovechar el precio preferencial
              </p>
              <button
                onClick={() => setIsFlyerOpen(true)}
                className="text-[10px] md:text-xs tracking-widest-extra uppercase font-bold text-gold hover:text-ink transition-colors mt-6"
              >
                más información &gt;
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* SUGERENCIA DE REGALOS */}
      <section className="py-24 md:py-32 px-6 md:px-12 bg-muted text-ink reveal">
        <div className="max-w-3xl mx-auto flex flex-col items-center text-center">
          <h2 className="font-serif text-5xl md:text-6xl italic mb-16">
            Sugerencia de regalos
          </h2>

          <p className="font-serif text-xl md:text-2xl mb-16 leading-relaxed max-w-2xl">
            El mejor regalo es tu presencia, pero si deseas tener un detalle con nosotros, te dejamos estas opciones:
          </p>

          <div className="w-full flex flex-col-reverse md:flex-row gap-12 md:gap-16 justify-center items-center mt-4">

            <div className="flex flex-col items-center flex-1">
              <p className="text-sm md:text-base tracking-widest-extra uppercase font-bold mb-6">
                Mesa de regalos
              </p>
              <Gift strokeWidth={1} className="w-12 h-12 md:w-16 md:h-16 mb-8" />
              <div className="space-y-3 font-sans text-center flex flex-col items-center">
                <p className="text-sm md:text-base tracking-widest-extra uppercase">Liverpool</p>
                <p className="text-sm md:text-base tracking-widest-extra uppercase pt-2">Evento: 51833909184</p>
              </div>
            </div>

            {/* Separador */}
            <div className="flex items-center justify-center">
              <div className="w-24 h-px bg-ink/30 block md:hidden"></div>
              <div className="w-px h-40 bg-ink/30 hidden md:block"></div>
            </div>

            <div className="flex flex-col items-center flex-1">
              <p className="text-sm md:text-base tracking-widest-extra uppercase font-bold mb-6">
                Transferencia
              </p>
              <CreditCard strokeWidth={1} className="w-12 h-12 md:w-16 md:h-16 mb-8" />
              <div className="space-y-3 font-sans text-center flex flex-col items-center">
                <p className="text-sm md:text-base tracking-widest-extra uppercase">Citibanamex</p>
                <p className="text-sm md:text-base tracking-widest-extra uppercase pt-2 break-all">002743902888023691</p>
              </div>
            </div>

          </div>

          <div className="mt-16 text-center">
            <a
              href="https://mesaderegalos.liverpool.com.mx/milistaderegalos/51833909184"
              target="_blank"
              rel="noreferrer"
              className="inline-block bg-ink text-cream px-10 py-4 rounded-full text-[10px] md:text-xs tracking-widest-extra uppercase hover:bg-gold hover:text-cream transition-colors duration-300 shadow-sm"
            >
              Ir a Mesa de Regalos
            </a>
          </div>

        </div>
      </section>

      {/* RSVP BOTON */}
      <section id="rsvp" className="relative py-32 md:py-48 px-6 md:px-12 overflow-hidden">
        <img src={rsvpImg} alt="RSVP" loading="lazy" className="absolute inset-0 h-full w-full object-cover opacity-30" />
        <div className="absolute inset-0 bg-cream/70" />
        <div className="relative z-10 max-w-3xl mx-auto text-center reveal">
          <p className="text-xs tracking-widest-extra uppercase text-gold mb-6">¿Nos acompañarás?</p>
          <h2 className="font-serif text-5xl md:text-8xl mb-8 italic font-light">
            ¡Esperamos verte ahí!
          </h2>
          <p className="font-serif text-xl md:text-2xl mb-12 text-ink/80 max-w-xl mx-auto">
            Tu presencia significaría el mundo para nosotros. Por favor confirma antes del 14 de septiembre.
          </p>
          <button
            onClick={() => setIsRsvpOpen(true)}
            className="bg-ink text-cream px-12 py-5 text-xs tracking-widest-extra uppercase hover:bg-gold transition-colors rounded-full"
          >
            Confirmar Asistencia
          </button>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-ink text-cream py-20 px-6 md:px-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h3 className="font-serif text-4xl md:text-5xl mb-4">
              Verónica <span className="italic">&</span> Alejandro
            </h3>
            <p className="text-xs tracking-widest-extra uppercase text-cream/60">24 · 10 · 2026 · Los Mochis, Sinaloa</p>
          </div>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-8 md:gap-16 text-center">
            {[
              { label: "Home", id: "home" },
              { label: "Itinerario", id: "itinerario" },
              { label: "Confirmar", id: "rsvp" },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className="text-xs tracking-widest-extra uppercase text-cream/70 hover:text-gold transition-colors"
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="mt-16 pt-8 border-t border-cream/10 text-center">
            <p className="font-serif italic text-cream/60">
              "Dos almas, un solo corazón." — Con amor, V & A
            </p>
          </div>
        </div>
      </footer>

      {/* RSVP MODAL */}
      {isRsvpOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/90 backdrop-blur-sm transition-opacity" onClick={() => setIsRsvpOpen(false)}>
          <div className="relative max-w-md w-full bg-cream p-8 md:p-12 text-center shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setIsRsvpOpen(false)}
              className="absolute top-4 right-4 text-ink/60 hover:text-ink transition-colors p-2"
            >
              <X size={24} strokeWidth={1} />
            </button>

            <h3 className="font-serif text-3xl md:text-4xl italic mb-8 text-ink">
              Confirmación de asistencia
            </h3>

            {rsvpStatus === 'success' ? (
              <div className="py-8">
                <p className="text-sm md:text-base tracking-widest-extra uppercase text-ink font-bold mb-4">¡Gracias!</p>
                <p className="text-ink/80 text-sm md:text-base">Tu respuesta ha sido registrada correctamente.</p>
              </div>
            ) : (
              <form onSubmit={handleRsvpSubmit} className="flex flex-col items-center">
                <p className="text-xs md:text-sm tracking-widest-extra uppercase mb-8 text-ink/80">¿Podrás asistir?</p>

                <div className="flex flex-col gap-4 w-full mb-10">
                  <label className={`border px-6 py-4 cursor-pointer transition-colors ${asistencia === 'Sí, asistiré' ? 'border-gold bg-gold/10 text-ink font-bold' : 'border-ink/20 text-ink/80 hover:border-gold/50'}`}>
                    <input
                      type="radio"
                      name="asistencia"
                      value="Sí, asistiré"
                      className="hidden"
                      onChange={(e) => setAsistencia(e.target.value)}
                    />
                    <span className="text-xs tracking-widest-extra uppercase">Sí, asistiré</span>
                  </label>

                  <label className={`border px-6 py-4 cursor-pointer transition-colors ${asistencia === 'No podré ir' ? 'border-gold bg-gold/10 text-ink font-bold' : 'border-ink/20 text-ink/80 hover:border-gold/50'}`}>
                    <input
                      type="radio"
                      name="asistencia"
                      value="No podré ir"
                      className="hidden"
                      onChange={(e) => setAsistencia(e.target.value)}
                    />
                    <span className="text-xs tracking-widest-extra uppercase">No podré ir</span>
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={!asistencia || rsvpStatus === 'submitting'}
                  className="bg-ink text-cream px-10 py-4 w-full text-xs tracking-widest-extra uppercase hover:bg-gold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {rsvpStatus === 'submitting' ? 'Enviando...' : 'Enviar Respuesta'}
                </button>

                {rsvpStatus === 'error' && (
                  <p className="mt-4 text-xs text-red-500">Hubo un error al enviar. Por favor intenta de nuevo.</p>
                )}
              </form>
            )}
          </div>
        </div>
      )}

      {/* FLYER MODAL */}
      {isFlyerOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/90 backdrop-blur-sm transition-opacity" onClick={() => setIsFlyerOpen(false)}>
          <div className="relative max-w-2xl w-full max-h-[90vh] flex flex-col items-center justify-center" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setIsFlyerOpen(false)}
              className="absolute -top-12 right-0 text-cream hover:text-gold transition-colors p-2"
            >
              <X size={32} strokeWidth={1} />
            </button>
            <img
              src={flyerImg}
              alt="Más información"
              className="max-w-full max-h-[85vh] object-contain"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;