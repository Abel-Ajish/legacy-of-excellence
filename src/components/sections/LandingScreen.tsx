'use client';

import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';

export default function LandingScreen() {
  const scrollRef = useRef(0);
  const bgRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const sy = window.scrollY;
      scrollRef.current = sy;

      const opacity = Math.max(0, 1 - sy / 500);
      const scale = 1 + sy * 0.0005;

      if (bgRef.current) {
        bgRef.current.style.transform = `scale(${scale})`;
      }
      if (contentRef.current) {
        contentRef.current.style.opacity = String(opacity);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="relative h-[100dvh] flex items-center justify-center overflow-hidden">
      <div
        ref={bgRef}
        className="absolute inset-0 bg-cover bg-center"
        style={{
          background: 'linear-gradient(135deg, #0a1628 0%, #1a2d4a 100%)',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
      </div>

      <div
        ref={contentRef}
        className="relative z-10 text-center px-4 sm:px-6"
      >
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
        >
          <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-8xl font-bold gold-gradient-text mb-3 sm:mb-4 leading-tight">
            A Legacy of Excellence
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.5 }}
          className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/80 mb-4 sm:mb-6"
        >
          Celebrating years of exceptional leadership and dedication in education at The Asian School Bahrain.
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.8, ease: 'easeOut' }}
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold italic gold-gradient-text mb-6 sm:mb-8 tracking-wide"
        >
          Mrs. Molly Treasa Mammen
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
        >
          <p className="text-2xl sm:text-3xl md:text-5xl lg:text-7xl font-light text-white mb-2">
            1992 — 2026
          </p>
          <p className="text-lg sm:text-xl md:text-2xl text-gold">
            35 Years of Service
          </p>
        </motion.div>
      </div>

      {/* Scroll arrow - bounces then fades out on scroll */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 pointer-events-none"
      >
        <div
          className="animate-float"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-white/40" aria-hidden="true">
            <path d="M12 4L12 20M12 20L6 14M12 20L18 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
    </section>
  );
}
