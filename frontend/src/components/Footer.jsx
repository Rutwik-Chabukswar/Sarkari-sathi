import { useEffect, useRef } from 'react';
import { Landmark, ExternalLink, Heart } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const footerRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(contentRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: footerRef.current, start: 'top 90%' },
        }
      );
    }, footerRef);
    return () => ctx.revert();
  }, []);

  return (
    <footer ref={footerRef} className="w-full bg-slate-950 pt-20 pb-10 text-slate-400">
      <div ref={contentRef} className="w-full max-w-[1400px] mx-auto px-6 lg:px-10 opacity-0">
        {/* Top grid */}
        <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr] gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5 mb-5">
              <span className="flex items-center justify-center w-9 h-9 rounded-lg
                               bg-gradient-to-br from-primary-500 to-primary-600 text-white">
                <Landmark size={18} />
              </span>
              <span className="font-display font-bold text-lg text-white">
                Sarkari<span className="text-primary-400">Saathi</span>
              </span>
            </div>
            <p className="text-sm leading-relaxed max-w-sm">
              Making government information accessible to every Indian citizen
              through the power of AI.
            </p>
          </div>

          {/* Navigation */}
          <div className="flex flex-col gap-2.5">
            <h4 className="font-display text-sm font-semibold text-slate-200 uppercase tracking-wider mb-2">
              Navigation
            </h4>
            {['Home', 'Features', 'How It Works', 'Tech Stack'].map((label) => (
              <a
                key={label}
                href={`#${label.toLowerCase().replace(/\s+/g, '-')}`}
                className="text-sm text-slate-400 hover:text-primary-400 transition-colors"
              >
                {label === 'Home' ? 'Home' : label}
              </a>
            ))}
          </div>

          {/* Built with */}
          <div className="flex flex-col gap-2.5">
            <h4 className="font-display text-sm font-semibold text-slate-200 uppercase tracking-wider mb-2">
              Built With
            </h4>
            {['React + Vite', 'FastAPI + Python', 'Google Gemini AI', 'ChromaDB + GSAP'].map((t) => (
              <span key={t} className="text-sm text-slate-400">{t}</span>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-slate-800 mb-8" />

        {/* Bottom */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="flex items-center gap-1.5 text-sm">
            © {new Date().getFullYear()} SarkariSaathi. Made with
            <Heart size={14} className="text-primary-500 fill-primary-500" />
            in India.
          </p>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full
                       border border-slate-700 text-sm font-medium text-slate-300
                       hover:border-slate-500 hover:text-white transition-all duration-200"
          >
            <ExternalLink size={16} />
            <span>View on GitHub</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
