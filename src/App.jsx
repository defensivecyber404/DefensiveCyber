import React, { useEffect } from 'react';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { AnimatedBackground } from './components/ui/AnimatedBackground';
import { CustomCursor } from './components/ui/CustomCursor';
import { Hero } from './components/sections/Hero';
import { Services } from './components/sections/Services';
import { WhyUs } from './components/sections/WhyUs';
import { Process } from './components/sections/Process';
import { Dashboard } from './components/sections/Dashboard';
import { Portfolio } from './components/sections/Portfolio';
import { Testimonials } from './components/sections/Testimonials';
import { FAQ } from './components/sections/FAQ';
import { Contact } from './components/sections/Contact';

function App() {
  // Smooth scroll behavior
  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  return (
    <div className="relative min-h-screen text-gray-200 font-sans selection:bg-primary/30 selection:text-white">
      <CustomCursor />
      <AnimatedBackground />
      <Navbar />
      
      <main>
        <Hero />
        <Services />
        <WhyUs />
        <Process />
        <Dashboard />
        <Portfolio />
        <Testimonials />
        <FAQ />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}

export default App;
