'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export default function ThankYouSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 1]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.8, 1]);

  return (
    <section
      ref={ref}
      className="min-h-[80vh] md:min-h-screen bg-navy flex items-center justify-center relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-navy via-navy-light to-navy" />

      <motion.div
        style={{ opacity, scale }}
        className="relative z-10 text-center px-4 sm:px-6 max-w-4xl mx-auto"
      >
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="text-4xl sm:text-5xl md:text-7xl lg:text-9xl font-bold text-white mb-6 md:mb-8"
        >
          Thank You
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl gold-gradient-text mb-4">
            Mrs. Molly Treasa Mammen
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.6 }}
          className="space-y-3 sm:space-y-4 text-white/80 text-base sm:text-lg md:text-xl"
        >
          <p>For 35 Years</p>
          <p>For Every Student</p>
          <p>For Every Teacher</p>
          <p>For Every Life You Touched</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.9 }}
          className="mt-8 md:mt-12"
        >
          <p className="text-2xl sm:text-3xl md:text-4xl text-white/60">1992 — 2026</p>
        </motion.div>

        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, delay: 1.2 }}
          className="mt-8 md:mt-12 h-1 w-32 sm:w-48 mx-auto bg-gradient-to-r from-transparent via-gold to-transparent"
        />
      </motion.div>

      <div className="absolute bottom-0 left-0 right-0 h-24 sm:h-32 bg-gradient-to-t from-black to-transparent" />
    </section>
  );
}
