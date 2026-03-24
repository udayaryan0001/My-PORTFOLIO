import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ThemeProvider, useTheme } from './context/ThemeContext';

import Preloader from './components/Preloader';
import CustomCursor from './components/CustomCursor';
import ScrollProgress from './components/ScrollProgress';
import ThreeBackground from './components/ThreeBackground';
import ParticlesCanvas from './components/ParticlesCanvas';
import ThemeToggle from './components/ThemeToggle';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import FeaturedGallery from './components/FeaturedGallery';
import Startups from './components/Startups';
import Skills from './components/Skills';
import Timeline from './components/Timeline';
import SocialProof from './components/SocialProof';
import Achievements from './components/Achievements';
import Contact from './components/Contact';
import Footer from './components/Footer';

function PortfolioContent({ ready }) {
  const { theme } = useTheme();

  return (
    <div
      className="min-h-screen font-body relative overflow-x-hidden transition-colors duration-500"
      style={{ background: theme.bg, color: theme.text }}
    >
      {/* Noise texture */}
      <div
        className="fixed inset-0 pointer-events-none z-[9993] opacity-[0.025]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />

      <AnimatePresence>
        {ready && (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {/* Fixed UI layers */}
            <CustomCursor />
            <ScrollProgress />
            <ThreeBackground />
            <ParticlesCanvas />
            <ThemeToggle />

            {/* Page */}
            <div className="relative z-10">
              <Navbar />
              <main>
                <Hero />
                <div className="h-px w-full opacity-30"
                  style={{ background: `linear-gradient(90deg, transparent, ${theme.accent}, ${theme.accentBlue}, transparent)` }} />
                <About />
                <div className="h-px w-full opacity-20"
                  style={{ background: `linear-gradient(90deg, transparent, ${theme.accent}, transparent)` }} />
                <FeaturedGallery />
                <div className="h-px w-full opacity-20"
                  style={{ background: `linear-gradient(90deg, transparent, ${theme.accentBlue}, transparent)` }} />
                <Startups />
                <div className="h-px w-full opacity-20"
                  style={{ background: `linear-gradient(90deg, transparent, ${theme.accentBlue}, transparent)` }} />
                <Timeline />
                <div className="h-px w-full opacity-20"
                  style={{ background: `linear-gradient(90deg, transparent, ${theme.accentPurple}, transparent)` }} />
                <Skills />
                <div className="h-px w-full opacity-20"
                  style={{ background: `linear-gradient(90deg, transparent, ${theme.accent}, transparent)` }} />
                <SocialProof />
                <div className="h-px w-full opacity-20"
                  style={{ background: `linear-gradient(90deg, transparent, ${theme.accentBlue}, transparent)` }} />
                <Achievements />
                <div className="h-px w-full opacity-20"
                  style={{ background: `linear-gradient(90deg, transparent, ${theme.accent}, transparent)` }} />
                <Contact />
              </main>
              <Footer />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function App() {
  const [ready, setReady] = useState(false);
  const handleDone = useCallback(() => setReady(true), []);

  return (
    <ThemeProvider>
      <Preloader onDone={handleDone} />
      <PortfolioContent ready={ready} />
    </ThemeProvider>
  );
}
