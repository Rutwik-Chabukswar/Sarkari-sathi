import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const stack = [
  { name: 'Python 3.11', category: 'Backend', color: '#3776AB' },
  { name: 'FastAPI', category: 'Backend', color: '#009688' },
  { name: 'Uvicorn', category: 'Backend', color: '#4B32C3' },
  { name: 'Pydantic', category: 'Backend', color: '#E92063' },
  { name: 'React', category: 'Frontend', color: '#61DAFB' },
  { name: 'Vite', category: 'Frontend', color: '#646CFF' },
  { name: 'Tailwind CSS', category: 'Frontend', color: '#06B6D4' },
  { name: 'GSAP', category: 'Animation', color: '#88CE02' },
  { name: 'Google Gemini', category: 'AI / LLM', color: '#4285F4' },
  { name: 'ChromaDB', category: 'Database', color: '#FF6F00' },
  { name: 'PyPDF2', category: 'Processing', color: '#D63384' },
  { name: 'Git & GitHub', category: 'DevOps', color: '#F05032' },
];

export default function TechStack() {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const pillsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(headerRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: headerRef.current, start: 'top 85%' },
        }
      );

      gsap.fromTo(pillsRef.current,
        { y: 30, opacity: 0, scale: 0.9 },
        {
          y: 0, opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(1.4)',
          stagger: 0.06,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="tech-stack" className="w-full py-24 lg:py-32 bg-white">
      <div className="w-full max-w-[1400px] mx-auto px-6 lg:px-10">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-14 lg:mb-16 opacity-0">
          <span className="font-display text-sm font-semibold uppercase tracking-widest text-primary-500 mb-3 block">
            Tech Stack
          </span>
          <h2 className="font-display text-4xl lg:text-5xl font-extrabold text-slate-900 mb-5">
            Technologies Used
          </h2>
          <p className="text-lg text-slate-500 max-w-xl mx-auto leading-relaxed">
            A modern, production-grade stack chosen for performance, reliability, and developer experience.
          </p>
        </div>

        {/* Pill grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
          {stack.map((t, i) => (
            <div
              key={i}
              ref={(el) => (pillsRef.current[i] = el)}
              className="group flex items-center gap-3 p-4 lg:p-5 rounded-xl
                         bg-slate-50 border border-slate-100
                         hover:-translate-y-1 hover:shadow-lg
                         transition-all duration-300 cursor-default opacity-0"
              style={{ '--pill-color': t.color }}
            >
              <span
                className="w-3 h-3 rounded-full flex-shrink-0 group-hover:scale-125 transition-transform duration-300"
                style={{ background: t.color, boxShadow: `0 0 10px ${t.color}40` }}
              />
              <div className="flex flex-col">
                <span className="font-semibold text-sm text-slate-800">{t.name}</span>
                <span className="text-xs text-slate-400">{t.category}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
