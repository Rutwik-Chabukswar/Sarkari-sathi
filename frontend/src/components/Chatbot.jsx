import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Landmark, Bot, User, Loader2 } from 'lucide-react';
import gsap from 'gsap';

const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000';

const SUGGESTIONS = [
  'Who is eligible for PM Kisan?',
  'How much money is given under the scheme?',
  'Can a government employee apply?',
  'What documents are required?',
];

export default function Chatbot({ isOpen, onToggle }) {
  const [messages, setMessages] = useState([
    {
      role: 'bot',
      text: "Namaste! 🙏 I'm **SarkariSaathi**, your AI assistant for government schemes. Ask me anything about PM Kisan and I'll find the answer from the official document.",
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const windowRef = useRef(null);
  const fabRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (isOpen) setTimeout(() => inputRef.current?.focus(), 350);
  }, [isOpen]);

  // GSAP — animate chat window open/close
  useEffect(() => {
    if (!windowRef.current) return;
    if (isOpen) {
      gsap.fromTo(windowRef.current,
        { y: 30, scale: 0.92, opacity: 0 },
        { y: 0, scale: 1, opacity: 1, duration: 0.45, ease: 'back.out(1.6)' }
      );
    }
  }, [isOpen]);

  // GSAP — FAB entrance
  useEffect(() => {
    gsap.fromTo(fabRef.current,
      { scale: 0, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.6, ease: 'back.out(2)', delay: 1.2 }
    );
  }, []);

  const sendMessage = async (text) => {
    if (!text.trim() || loading) return;
    setMessages((prev) => [...prev, { role: 'user', text: text.trim() }]);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch(`${API_URL}/ask`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: text.trim() }),
      });
      if (!res.ok) throw new Error(`Server error: ${res.status}`);
      const data = await res.json();
      setMessages((prev) => [...prev, { role: 'bot', text: data.answer }]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          role: 'bot',
          text: `⚠️ Sorry, I couldn't connect to the server. Make sure the FastAPI backend is running.\n\nError: ${err.message}`,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage(input);
  };

  const formatText = (text) =>
    text.split(/(\*\*.*?\*\*)/g).map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**'))
        return <strong key={i}>{part.slice(2, -2)}</strong>;
      return part.split(/(`.*?`)/g).map((sub, j) => {
        if (sub.startsWith('`') && sub.endsWith('`'))
          return (
            <code key={`${i}-${j}`} className="px-1.5 py-0.5 rounded bg-slate-100 text-accent-600 text-xs font-mono">
              {sub.slice(1, -1)}
            </code>
          );
        return sub;
      });
    });

  return (
    <>
      {/* FAB */}
      <button
        ref={fabRef}
        className={`fixed bottom-8 right-8 z-[200] w-[60px] h-[60px] rounded-full
                    bg-gradient-to-br from-primary-500 to-primary-600 text-white
                    flex items-center justify-center
                    shadow-xl transition-all duration-300 opacity-0
                    hover:scale-110`}
        onClick={onToggle}
        aria-label={isOpen ? 'Close chat' : 'Open chat'}
        id="chatbot-trigger"
        style={{ boxShadow: '0 8px 30px rgba(249,115,22,0.35)' }}
      >
        <span className={`absolute transition-all duration-300 ${isOpen ? 'rotate-90 opacity-0' : 'rotate-0 opacity-100'}`}>
          <MessageCircle size={26} />
        </span>
        <span className={`absolute transition-all duration-300 ${isOpen ? 'rotate-0 opacity-100' : '-rotate-90 opacity-0'}`}>
          <X size={26} />
        </span>
        {!isOpen && (
          <span className="absolute inset-[-4px] rounded-full border-2 border-primary-400 animate-pulse-ring pointer-events-none" />
        )}
      </button>

      {/* Chat window */}
      {isOpen && (
        <div
          ref={windowRef}
          className="fixed bottom-[108px] right-8 z-[250] w-[420px] max-h-[620px]
                     rounded-2xl bg-white border border-slate-100
                     flex flex-col overflow-hidden opacity-0
                     max-sm:bottom-0 max-sm:right-0 max-sm:left-0 max-sm:w-full
                     max-sm:max-h-screen max-sm:rounded-t-2xl max-sm:rounded-b-none"
          style={{ boxShadow: '0 12px 48px rgba(0,0,0,0.18), 0 0 0 1px rgba(0,0,0,0.04)' }}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-4
                          bg-gradient-to-r from-slate-900 to-accent-900 text-white">
            <div className="flex items-center gap-3">
              <span className="flex items-center justify-center w-10 h-10 rounded-xl
                              bg-gradient-to-br from-primary-500 to-primary-600">
                <Landmark size={18} />
              </span>
              <div>
                <h3 className="font-display font-bold text-base">SarkariSaathi</h3>
                <span className="flex items-center gap-1.5 text-xs text-white/70">
                  <span className="w-2 h-2 rounded-full bg-green-400 shadow-[0_0_6px_#4ade80]" />
                  Online — Ask about govt schemes
                </span>
              </div>
            </div>
            <button
              className="p-2 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-colors"
              onClick={onToggle}
            >
              <X size={20} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-5 flex flex-col gap-4 min-h-[260px] max-h-[360px] bg-slate-50">
            {messages.map((m, i) => (
              <div key={i} className={`flex gap-2 ${m.role === 'user' ? 'flex-row-reverse' : ''}`}>
                <div className={`flex items-end justify-center w-8 h-8 rounded-full flex-shrink-0
                  ${m.role === 'bot'
                    ? 'bg-gradient-to-br from-accent-100 to-accent-200 text-accent-700'
                    : 'bg-gradient-to-br from-primary-100 to-primary-200 text-primary-700'
                  }`}>
                  {m.role === 'bot' ? <Bot size={15} /> : <User size={15} />}
                </div>
                <div className={`max-w-[80%] px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap break-words
                  ${m.role === 'bot'
                    ? 'bg-white text-slate-700 border border-slate-100 rounded-2xl rounded-bl-sm'
                    : 'bg-gradient-to-br from-primary-500 to-primary-600 text-white rounded-2xl rounded-br-sm'
                  }`}>
                  {formatText(m.text)}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex gap-2">
                <div className="flex items-end justify-center w-8 h-8 rounded-full flex-shrink-0
                                bg-gradient-to-br from-accent-100 to-accent-200 text-accent-700">
                  <Bot size={15} />
                </div>
                <div className="bg-white border border-slate-100 rounded-2xl rounded-bl-sm px-5 py-3
                                flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-slate-400 animate-typing-1" />
                  <span className="w-2 h-2 rounded-full bg-slate-400 animate-typing-2" />
                  <span className="w-2 h-2 rounded-full bg-slate-400 animate-typing-3" />
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Suggestion chips */}
          {messages.length <= 1 && !loading && (
            <div className="flex flex-wrap gap-2 px-5 pb-3 bg-slate-50">
              {SUGGESTIONS.map((s, i) => (
                <button
                  key={i}
                  className="px-3 py-1.5 rounded-full bg-white border border-slate-200 text-xs text-slate-600
                             hover:border-primary-300 hover:text-primary-600 hover:bg-primary-50
                             transition-all duration-200 whitespace-nowrap"
                  onClick={() => sendMessage(s)}
                >
                  {s}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <form className="flex items-center gap-2 px-4 py-3 border-t border-slate-100 bg-white" onSubmit={handleSubmit}>
            <input
              ref={inputRef}
              type="text"
              className="flex-1 px-4 py-3 rounded-full border border-slate-200 bg-slate-50
                         text-sm text-slate-800 outline-none
                         focus:border-primary-400 focus:ring-2 focus:ring-primary-500/10
                         transition-all duration-200 placeholder:text-slate-400"
              placeholder="Type your question..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={loading}
            />
            <button
              type="submit"
              className="flex items-center justify-center w-10 h-10 rounded-full
                         bg-gradient-to-br from-primary-500 to-primary-600 text-white flex-shrink-0
                         hover:scale-110 hover:shadow-lg transition-all duration-200
                         disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100"
              disabled={!input.trim() || loading}
            >
              {loading ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
            </button>
          </form>
        </div>
      )}
    </>
  );
}
