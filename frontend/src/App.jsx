import { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import HowItWorks from './components/HowItWorks';
import TechStack from './components/TechStack';
import Footer from './components/Footer';
import Chatbot from './components/Chatbot';

export default function App() {
  const [chatOpen, setChatOpen] = useState(false);

  return (
    <>
      <Navbar />
      <main>
        <Hero onOpenChat={() => setChatOpen(true)} />
        <Features />
        <HowItWorks />
        <TechStack />
      </main>
      <Footer />
      <Chatbot isOpen={chatOpen} onToggle={() => setChatOpen((o) => !o)} />
    </>
  );
}
