import { useEffect, useRef } from 'react';
import { FileText, Brain, Search, Zap, Shield, Globe } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    icon: <FileText size={24} />,
    title: 'Official PDF Parsing',
    desc: 'Reads and extracts text directly from government scheme PDFs with PyPDF2 — no web scraping, no third-party data.',
    gradient: 'from-primary-500 to-primary-600',
    bg: 'bg-primary-50',
    text: 'text-primary-600',
  },
  {
    icon: <Search size={24} />,
    title: 'Semantic Vector Search',
    desc: 'ChromaDB + Google Embeddings find the most relevant document chunks by meaning, not just keywords.',
    gradient: 'from-accent-500 to-accent-600',
    bg: 'bg-accent-50',
    text: 'text-accent-600',
  },
  {
    icon: <Brain size={24} />,
    title: 'Gemini AI Answers',
    desc: 'Google Gemini 2.5 Flash generates accurate, context-grounded answers with temperature 0 for deterministic output.',
    gradient: 'from-emerald-500 to-emerald-600',
    bg: 'bg-emerald-50',
    text: 'text-emerald-600',
  },
  {
    icon: <Shield size={24} />,
    title: 'Anti-Hallucination Guard',
    desc: "System prompt enforces strict grounding — the AI says \"I don't know\" rather than fabricating information.",
    gradient: 'from-rose-500 to-rose-600',
    bg: 'bg-rose-50',
    text: 'text-rose-600',
  },
  {
    icon: <Zap size={24} />,
    title: 'Fast REST API',
    desc: 'FastAPI backend with Pydantic validation, async endpoints, and auto-generated Swagger documentation.',
    gradient: 'from-amber-500 to-amber-600',
    bg: 'bg-amber-50',
    text: 'text-amber-600',
  },
  {
    icon: <Globe size={24} />,
    title: 'Plain English Interface',
    desc: 'No technical knowledge needed. Citizens simply type their question and get a clear, cited answer instantly.',
    gradient: 'from-cyan-500 to-cyan-600',
    bg: 'bg-cyan-50',
    text: 'text-cyan-600',
  },
];

export default function Features() {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header reveal
      gsap.fromTo(headerRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
          scrollTrigger: {
            trigger: headerRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );

      // Staggered card reveal
      gsap.fromTo(cardsRef.current,
        { y: 60, opacity: 0, scale: 0.95 },
        {
          y: 0, opacity: 1, scale: 1, duration: 0.6, ease: 'power3.out',
          stagger: 0.12,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="features" className="w-full py-24 lg:py-32 bg-white">
      <div className="w-full max-w-[1400px] mx-auto px-6 lg:px-10">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-16 lg:mb-20 opacity-0">
          <span className="font-display text-sm font-semibold uppercase tracking-widest text-primary-500 mb-3 block">
            Features
          </span>
          <h2 className="font-display text-4xl lg:text-5xl font-extrabold text-slate-900 mb-5">
            Built for Accuracy & Accessibility
          </h2>
          <p className="text-lg text-slate-500 max-w-xl mx-auto leading-relaxed">
            Every component is designed to deliver reliable, source-cited answers from official government documents.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {features.map((f, i) => (
            <div
              key={i}
              ref={(el) => (cardsRef.current[i] = el)}
              className="group p-8 lg:p-10 rounded-2xl bg-slate-50 border border-slate-100
                         hover:border-slate-200 hover:shadow-xl hover:-translate-y-2
                         transition-all duration-300 opacity-0 cursor-default"
            >
              <div className={`inline-flex items-center justify-center w-14 h-14 rounded-xl
                              ${f.bg} ${f.text} mb-6
                              group-hover:scale-110 transition-transform duration-300`}>
                {f.icon}
              </div>
              <h3 className="font-display text-xl font-bold text-slate-900 mb-3">
                {f.title}
              </h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
