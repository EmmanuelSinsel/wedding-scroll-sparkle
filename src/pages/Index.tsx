import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import heroImg from "@/assets/hero-couple.jpg";
import ceremonyImg from "@/assets/ceremony.jpg";
import receptionImg from "@/assets/reception.jpg";
import storyImg from "@/assets/story.jpg";
import rsvpImg from "@/assets/rsvp.jpg";

gsap.registerPlugin(ScrollTrigger);

const Index = () => {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero entrance
      gsap.from(".hero-nav", { y: -20, opacity: 0, duration: 1.2, ease: "power3.out" });
      gsap.from(".hero-eyebrow", { y: 20, opacity: 0, duration: 1.2, delay: 0.4, ease: "power3.out" });
      gsap.from(".hero-title", { y: 40, opacity: 0, duration: 1.6, delay: 0.6, ease: "power3.out" });
      gsap.from(".hero-date", { y: 20, opacity: 0, duration: 1.2, delay: 1, ease: "power3.out" });

      // Section reveals
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

      // Image parallax frames
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

  return (
    <div ref={root} className="bg-cream text-ink overflow-x-hidden">
      {/* HERO */}
      <section id="home" className="relative h-screen w-full">
        <img
          src={heroImg}
          alt="Soria and Antoine on a cliff overlooking the forest"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-overlay" />

        <nav className="hero-nav absolute top-0 left-0 right-0 z-10 flex items-center justify-between px-6 md:px-12 py-6 text-cream">
          <div className="flex gap-6 md:gap-8 text-xs tracking-widest-extra uppercase font-light">
            <button onClick={() => scrollTo("story")} className="hover:text-gold transition-colors">Our Story</button>
            <button onClick={() => scrollTo("ceremony")} className="hover:text-gold transition-colors hidden sm:inline">Ceremony</button>
            <button onClick={() => scrollTo("reception")} className="hover:text-gold transition-colors hidden sm:inline">Reception</button>
          </div>
          <div className="hidden md:block font-serif text-lg tracking-widest">S &amp; A · 10.14.25</div>
          <button
            onClick={() => scrollTo("rsvp")}
            className="bg-cream text-ink px-6 py-2.5 text-xs tracking-widest-extra uppercase hover:bg-gold hover:text-cream transition-colors"
          >
            RSVP
          </button>
        </nav>

        <div className="relative z-10 flex h-full flex-col items-center justify-center text-center text-cream px-6">
          <p className="hero-eyebrow font-serif italic text-lg md:text-xl mb-6">We're Getting Married!</p>
          <h1 className="hero-title font-serif text-6xl md:text-8xl lg:text-9xl font-light mb-8 leading-none">
            Soria <span className="italic">&amp;</span> Antoine
          </h1>
          <p className="hero-date text-sm md:text-base tracking-widest-extra">10 . 14 . 25</p>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-cream/70 text-[10px] tracking-widest-extra uppercase reveal">
          Scroll
        </div>
      </section>

      {/* CEREMONY */}
      <section id="ceremony" className="py-32 md:py-48 px-6 md:px-12 bg-muted">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 md:gap-20 items-center">
          <div className="overflow-hidden shadow-frame aspect-[4/5]">
            <img src={ceremonyImg} alt="Ceremony" loading="lazy" className="frame-img h-full w-full object-cover" />
          </div>
          <div className="reveal text-center md:text-left">
            <p className="text-xs tracking-widest-extra uppercase text-gold mb-6">The Ceremony</p>
            <h2 className="font-serif text-5xl md:text-7xl mb-8">Ceremony</h2>
            <p className="font-serif text-2xl md:text-3xl mb-8 italic">4:00 PM</p>
            <div className="font-serif text-lg md:text-xl space-y-1 mb-8">
              <p>Grace Church</p>
              <p>123 Demo St.</p>
              <p>Flagstaff, AZ 12345</p>
            </div>
            <a
              href="#"
              className="inline-block text-sm tracking-widest-extra uppercase border-b border-ink pb-1 hover:text-gold hover:border-gold transition-colors"
            >
              View Map
            </a>
          </div>
        </div>
      </section>

      {/* RECEPTION */}
      <section id="reception" className="py-32 md:py-48 px-6 md:px-12 bg-cream">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 md:gap-20 items-center">
          <div className="reveal text-center md:text-left md:order-1 order-2">
            <p className="text-xs tracking-widest-extra uppercase text-gold mb-6">The Reception</p>
            <h2 className="font-serif text-5xl md:text-7xl mb-8">Reception</h2>
            <p className="font-serif text-2xl md:text-3xl mb-8 italic">6:30 PM</p>
            <div className="font-serif text-lg md:text-xl space-y-1 mb-8">
              <p>The Pinewood Estate</p>
              <p>456 Meadow Lane</p>
              <p>Flagstaff, AZ 12345</p>
            </div>
            <a
              href="#"
              className="inline-block text-sm tracking-widest-extra uppercase border-b border-ink pb-1 hover:text-gold hover:border-gold transition-colors"
            >
              View Map
            </a>
          </div>
          <div className="overflow-hidden shadow-frame aspect-[4/5] md:order-2 order-1">
            <img src={receptionImg} alt="Reception" loading="lazy" className="frame-img h-full w-full object-cover" />
          </div>
        </div>
      </section>

      {/* STORY CTA */}
      <section id="story" className="relative h-[70vh] flex items-center justify-center text-center text-cream overflow-hidden">
        <img src={storyImg} alt="Couple in the forest" loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-ink/50" />
        <div className="reveal relative z-10 px-6 max-w-2xl">
          <p className="text-xs tracking-widest-extra uppercase mb-6 text-cream/80">Our Journey</p>
          <h2 className="font-serif text-5xl md:text-7xl mb-8 italic font-light">A love, in chapters.</h2>
          <p className="font-serif text-lg md:text-xl mb-10 text-cream/90">
            From a chance encounter to a lifetime promise — every moment led us here.
          </p>
          <a
            href="#"
            className="inline-block border border-cream px-10 py-4 text-xs tracking-widest-extra uppercase hover:bg-cream hover:text-ink transition-colors"
          >
            See How It All Started
          </a>
        </div>
      </section>

      {/* RSVP */}
      <section id="rsvp" className="relative py-32 md:py-48 px-6 md:px-12 overflow-hidden">
        <img src={rsvpImg} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover opacity-30" />
        <div className="absolute inset-0 bg-cream/70" />
        <div className="relative z-10 max-w-3xl mx-auto text-center reveal">
          <p className="text-xs tracking-widest-extra uppercase text-gold mb-6">Will You Join Us?</p>
          <h2 className="font-serif text-5xl md:text-8xl mb-8 italic font-light">
            Hope you can make it!
          </h2>
          <p className="font-serif text-xl md:text-2xl mb-12 text-ink/80 max-w-xl mx-auto">
            Your presence would mean the world to us. Kindly let us know by September 14th, 2025.
          </p>
          <button className="bg-ink text-cream px-12 py-5 text-xs tracking-widest-extra uppercase hover:bg-gold transition-colors">
            Reserve &amp; Confirm
          </button>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-ink text-cream py-20 px-6 md:px-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h3 className="font-serif text-4xl md:text-5xl mb-4">
              Soria <span className="italic">&amp;</span> Antoine
            </h3>
            <p className="text-xs tracking-widest-extra uppercase text-cream/60">10 . 14 . 2025 · Flagstaff, AZ</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 text-center md:text-left">
            {[
              { label: "Home", id: "home" },
              { label: "Ceremony", id: "ceremony" },
              { label: "Reception", id: "reception" },
              { label: "Our Story", id: "story" },
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
              "Two souls, one heart." — with love, S &amp; A
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
