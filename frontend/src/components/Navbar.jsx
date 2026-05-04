import { useState, useEffect, useRef } from 'react';
import { Menu, X, Landmark } from 'lucide-react';
import gsap from 'gsap';

const links = [
  { label: 'Home', href: '#hero' },
  { label: 'Features', href: '#features' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Tech Stack', href: '#tech-stack' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // GSAP — slide navbar in from top on mount
  useEffect(() => {
    gsap.fromTo(navRef.current, { y: -80, opacity: 0 }, {
      y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 0.2,
    });
  }, []);

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 opacity-0
        ${scrolled
          ? 'bg-white/90 backdrop-blur-xl shadow-md py-3'
          : 'py-5'
        }`}
    >
      <div className="w-full max-w-[1400px] mx-auto px-6 lg:px-10 flex items-center justify-between">
        {/* Logo */}
        <a href="#hero" className="flex items-center gap-2.5 group">
          <span className="flex items-center justify-center w-9 h-9 rounded-lg
                           bg-gradient-to-br from-primary-500 to-primary-600 text-white
                           transition-transform duration-200 group-hover:scale-110">
            <Landmark size={20} />
          </span>
          <span className="font-display font-bold text-xl text-slate-900">
            Sarkari<span className="text-primary-500">Saathi</span>
          </span>
        </a>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-1">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="px-4 py-2 rounded-lg text-sm font-medium text-slate-500
                           hover:text-slate-900 hover:bg-slate-100 transition-all duration-200"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <a
          href="#chatbot-trigger"
          className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 rounded-full
                     text-sm font-semibold text-white
                     bg-gradient-to-br from-primary-500 to-primary-600
                     shadow-md hover:shadow-xl hover:-translate-y-0.5
                     transition-all duration-200"
        >
          Ask a Question
        </a>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-slate-700"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile drawer */}
      {menuOpen && (
        <div className="md:hidden flex flex-col gap-1 px-6 pb-6 pt-4 bg-white/95 backdrop-blur-xl
                        animate-[fadeInDown_0.25s_ease-out]">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="px-4 py-3 rounded-lg font-medium text-slate-600
                         hover:bg-slate-100 transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              {l.label}
            </a>
          ))}
          <a
            href="#chatbot-trigger"
            className="mt-2 text-center px-5 py-3 rounded-full text-sm font-semibold text-white
                       bg-gradient-to-br from-primary-500 to-primary-600"
            onClick={() => setMenuOpen(false)}
          >
            Ask a Question
          </a>
        </div>
      )}
    </nav>
  );
}
