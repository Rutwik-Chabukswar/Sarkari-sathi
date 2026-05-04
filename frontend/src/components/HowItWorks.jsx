import { useEffect, useRef } from 'react';
import { FileUp, Scissors, SearchCode, MessageSquareText } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    num: '01',
    icon: <FileUp size={28} />,
    title: 'PDF Extraction',
    desc: 'The official government PDF is loaded and all text is extracted page-by-page using PyPDF2.',
  },
  {
    num: '02',
    icon: <Scissors size={28} />,
    title: 'Smart Chunking',
    desc: 'Extracted text is split into 100-word chunks with 20-word overlap to prevent information loss at boundaries.',
  },
  {
    num: '03',
    icon: <SearchCode size={28} />,
    title: 'Semantic Retrieval',
    desc: 'Your question is converted to a vector embedding and matched against all chunks via ChromaDB to find the top 3 relevant passages.',
  },
  {
    num: '04',
    icon: <MessageSquareText size={28} />,
    title: 'AI Answer Generation',
    desc: 'The retrieved context + your question are sent to Gemini AI with a strict system prompt that prevents hallucination.',
  },
];

export default function HowItWorks() {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const stepsRef = useRef([]);
  const linesRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header
      gsap.fromTo(headerRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: headerRef.current, start: 'top 85%' },
        }
      );

      // Steps — sequential reveal
      stepsRef.current.forEach((step, i) => {
        gsap.fromTo(step,
          { x: -40, opacity: 0 },
          {
            x: 0, opacity: 1, duration: 0.7, ease: 'power3.out',
            scrollTrigger: {
              trigger: step,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      });

      // Connector lines — grow downward
      linesRef.current.forEach((line) => {
        if (line) {
          gsap.fromTo(line,
            { scaleY: 0 },
            {
              scaleY: 1, duration: 0.5, ease: 'power2.out',
              scrollTrigger: {
                trigger: line,
                start: 'top 85%',
                toggleActions: 'play none none none',
              },
            }
          );
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="how-it-works" className="w-full py-24 lg:py-32 bg-slate-50">
      <div className="w-full max-w-[1400px] mx-auto px-6 lg:px-10">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-16 lg:mb-20 opacity-0">
          <span className="font-display text-sm font-semibold uppercase tracking-widest text-primary-500 mb-3 block">
            How It Works
          </span>
          <h2 className="font-display text-4xl lg:text-5xl font-extrabold text-slate-900 mb-5">
            The RAG Pipeline
          </h2>
          <p className="text-lg text-slate-500 max-w-xl mx-auto leading-relaxed">
            Retrieval-Augmented Generation in 4 simple steps — from PDF to accurate answer.
          </p>
        </div>

        {/* Timeline */}
        <div className="max-w-3xl mx-auto flex flex-col">
          {steps.map((s, i) => (
            <div
              key={i}
              ref={(el) => (stepsRef.current[i] = el)}
              className="flex gap-6 lg:gap-8 opacity-0"
            >
              {/* Left connector */}
              <div className="flex flex-col items-center flex-shrink-0">
                <span className="flex items-center justify-center w-12 h-12 rounded-full
                                 bg-gradient-to-br from-primary-500 to-accent-500
                                 text-white font-display font-bold text-sm
                                 shadow-lg shadow-primary-500/20 flex-shrink-0">
                  {s.num}
                </span>
                {i < steps.length - 1 && (
                  <div
                    ref={(el) => (linesRef.current[i] = el)}
                    className="w-0.5 flex-1 min-h-[48px] origin-top
                               bg-gradient-to-b from-primary-300 to-accent-200 rounded-full"
                  />
                )}
              </div>

              {/* Right body */}
              <div className="pb-12">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl
                                bg-white border border-slate-100 text-primary-600
                                shadow-sm mb-4
                                hover:scale-110 hover:shadow-lg hover:shadow-primary-500/10
                                transition-all duration-300">
                  {s.icon}
                </div>
                <h3 className="font-display text-xl font-bold text-slate-900 mb-2">{s.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed max-w-md">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
