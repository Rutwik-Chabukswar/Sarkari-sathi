import { useEffect, useRef } from 'react';
import { ArrowRight, Sparkles, ShieldCheck, BookOpen } from 'lucide-react';
import gsap from 'gsap';

export default function Hero({ onOpenChat }) {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const actionsRef = useRef(null);
  const badgeRef = useRef(null);
  const trustRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(badgeRef.current,
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 }
      )
      .fromTo(titleRef.current,
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9 },
        '-=0.3'
      )
      .fromTo(subtitleRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7 },
        '-=0.5'
      )
      .fromTo(actionsRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 },
        '-=0.4'
      )
      .fromTo(trustRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5 },
        '-=0.3'
      );

      // Floating blob animations
      gsap.to('.hero-blob-1', {
        y: -30, x: 15, duration: 4, ease: 'sine.inOut', yoyo: true, repeat: -1,
      });
      gsap.to('.hero-blob-2', {
        y: 25, x: -20, duration: 5, ease: 'sine.inOut', yoyo: true, repeat: -1, delay: 1,
      });
      gsap.to('.hero-blob-3', {
        y: -20, x: 10, duration: 6, ease: 'sine.inOut', yoyo: true, repeat: -1, delay: 2,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden
                 pt-28 pb-20 lg:pt-32 lg:pb-24"
    >
      {/* Background blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="hero-blob-1 absolute -top-20 -right-20 w-[500px] h-[500px] rounded-full
                        bg-gradient-to-br from-primary-200/60 to-primary-300/40 blur-[100px]" />
        <div className="hero-blob-2 absolute -bottom-16 -left-24 w-[450px] h-[450px] rounded-full
                        bg-gradient-to-br from-accent-200/50 to-accent-300/30 blur-[100px]" />
        <div className="hero-blob-3 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                        w-[350px] h-[350px] rounded-full
                        bg-gradient-to-br from-success-400/20 to-primary-200/20 blur-[100px]" />
        {/* Grid overlay */}
        <div className="absolute inset-0"
             style={{
               backgroundImage: 'linear-gradient(rgba(0,0,0,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.03) 1px, transparent 1px)',
               backgroundSize: '60px 60px',
             }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 lg:px-10
                      text-center flex flex-col items-center">
        {/* Badge */}
        <div
          ref={badgeRef}
          className="inline-flex items-center gap-2 px-5 py-2 rounded-full
                     bg-white/70 backdrop-blur-xl border border-slate-200
                     text-sm font-medium text-primary-600 mb-10 opacity-0"
        >
          <Sparkles size={14} />
          <span>Powered by Google Gemini AI</span>
        </div>

        {/* Title */}
        <h1
          ref={titleRef}
          className="font-display font-black text-[clamp(2.5rem,6vw,5rem)]
                     leading-[1.08] text-slate-900 max-w-5xl mb-7 opacity-0"
        >
          Your AI Assistant for
          <span className="text-gradient"> Government Schemes</span>
        </h1>

        {/* Subtitle */}
        <p
          ref={subtitleRef}
          className="text-lg lg:text-xl text-slate-500 max-w-2xl leading-relaxed mb-12 opacity-0"
        >
          Ask questions about PM Kisan, PMAY, Ayushman Bharat and hundreds of other
          welfare schemes in plain English. Get accurate, source-cited answers directly
          from official documents — no jargon, no middlemen.
        </p>

        {/* Actions */}
        <div ref={actionsRef} className="flex items-center gap-4 flex-wrap justify-center mb-12 opacity-0">
          <button className="btn-primary text-base" onClick={onOpenChat}>
            <span>Start Asking</span>
            <ArrowRight size={18} />
          </button>
          <a href="#how-it-works" className="btn-ghost text-base">
            See How It Works
          </a>
        </div>

        {/* Trust pills */}
        <div ref={trustRef} className="flex items-center gap-6 flex-wrap justify-center opacity-0">
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <ShieldCheck size={16} className="text-success-500" />
            <span>Official PDF Sources Only</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <BookOpen size={16} className="text-success-500" />
            <span>No Hallucinations</span>
          </div>
        </div>
      </div>
    </section>
  );
}
