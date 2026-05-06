import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Church, Wine } from "lucide-react";

import heroImg from "@/assets/_MG_9100.jpg";
import storyImg from "@/assets/story.jpg";
import rsvpImg from "@/assets/rsvp.jpg";
import padresImg from "@/assets/_MG_8868.png";
import dresscodeFormalImg from "@/assets/dresscode_formal.png";
import dresscodeSneakerImg from "@/assets/dresscode_sneaker.png";

gsap.registerPlugin(ScrollTrigger);

const Index = () => {
  const root = useRef<HTMLDivElement>(null);

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

        <nav className="hero-nav absolute top-0 left-0 right-0 z-10 flex items-center justify-between px-6 md:px-12 py-6 text-cream">
          <button
            onClick={() => scrollTo("rsvp")}
            className="bg-cream text-ink px-6 py-2.5 text-xs tracking-widest-extra uppercase hover:bg-gold hover:text-cream transition-colors rounded-full"
          >
            RSVP
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
            style={{ textShadow: '2px 2px 8px rgba(0,0,0,0.8)', fontSize: 24 }}
            className="hero-date font-sans font-medium text-sm md:text-base tracking-widest-extra uppercase"
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
                  <div className={`w-[45%] flex ${isEven ? 'justify-end' : 'justify-end text-right'}`}>
                    {isEven ? (
                      <div className="text-ink/80">{item.icon}</div>
                    ) : (
                      <div>
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
                          <a
                            href={item.mapLink}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-block mt-4 bg-ink text-cream px-6 py-2.5 rounded-full text-[10px] md:text-xs tracking-widest-extra uppercase hover:bg-gold hover:text-cream transition-colors duration-300 shadow-sm"
                          >
                            ¿Cómo llegar?
                          </a>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-ink z-10"></div>

                  {/* Lado Derecho */}
                  <div className={`w-[45%] flex ${isEven ? 'justify-start text-left' : 'justify-start'}`}>
                    {isEven ? (
                      <div>
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
                          <a
                            href={item.mapLink}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-block mt-4 bg-ink text-cream px-6 py-2.5 rounded-full text-[10px] md:text-xs tracking-widest-extra uppercase hover:bg-gold hover:text-cream transition-colors duration-300 shadow-sm"
                          >
                            ¿Cómo llegar?
                          </a>
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
              <span style={{ fontSize: 24 }} className="text-base md:text-lg font-bold text-ink">24 · Octubre · 2026</span>
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
            La pista nos espera y no aceptamos excusas.<br className="hidden md:block"/> ¡Lleva tus tenis y a bailar!
          </p>

          <div>
            <img src={dresscodeSneakerImg} alt="Tenis" className="h-24 md:h-32 object-contain mix-blend-multiply opacity-80" />
          </div>
        </div>
      </section>

      {/* STORY CTA */}
      <section id="story" className="relative h-[70vh] flex items-center justify-center text-center text-cream overflow-hidden">
        <img src={storyImg} alt="Historia" loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-ink/50" />
        <div className="reveal relative z-10 px-6 max-w-2xl">
          <p className="text-xs tracking-widest-extra uppercase mb-6 text-cream/80">Nuestra Historia</p>
          <h2 className="font-serif text-5xl md:text-7xl mb-8 italic font-light">Un amor en capítulos.</h2>
          <p className="font-serif text-lg md:text-xl mb-10 text-cream/90">
            Desde un encuentro casual hasta una promesa de por vida.
          </p>
          <a
            href="#"
            className="inline-block border border-cream px-10 py-4 text-xs tracking-widest-extra uppercase hover:bg-cream hover:text-ink transition-colors rounded-full"
          >
            Ver nuestra historia
          </a>
        </div>
      </section>

      {/* RSVP */}
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
          <button className="bg-ink text-cream px-12 py-5 text-xs tracking-widest-extra uppercase hover:bg-gold transition-colors rounded-full">
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
            <p className="text-xs tracking-widest-extra uppercase text-cream/60">24 . 10 . 2026 · Los Mochis, Sinaloa</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center md:text-left justify-items-center">
            {[
              { label: "Home", id: "home" },
              { label: "Itinerario", id: "itinerario" },
              { label: "Historia", id: "story" },
              { label: "RSVP", id: "rsvp" },
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
    </div>
  );
};

export default Index;