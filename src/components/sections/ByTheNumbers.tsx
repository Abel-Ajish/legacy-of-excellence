'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

interface Stat {
  number: number;
  suffix: string;
  label: string;
}

const stats: Stat[] = [
  { number: 50, suffix: '', label: 'Years in Education' },
  { number: 35, suffix: '', label: 'Years at ASB' },
  { number: 12, suffix: '', label: 'Years as Vice Principal' },
  { number: 14, suffix: '', label: 'Years as Principal' },
];

function AnimatedCounter({ number, suffix }: { number: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = number;
      const duration = 2000;
      const increment = end / (duration / 16);

      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);

      return () => clearInterval(timer);
    }
  }, [isInView, number]);

  return (
    <div ref={ref} className="text-3xl sm:text-4xl md:text-5xl lg:text-4xl font-bold gold-gradient-text">
      {count.toLocaleString()}{suffix}
    </div>
  );
}

export default function ByTheNumbers() {
  return (
    <section className="min-h-screen bg-gray-100 py-16 md:py-20">
      <div className="container mx-auto px-4 sm:px-6">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl sm:text-4xl md:text-5xl font-bold text-center text-navy mb-12 md:mb-16"
        >
          By The <span className="gold-gradient-text">Numbers</span>
        </motion.h2>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white p-4 sm:p-6 md:p-8 rounded-2xl shadow-lg text-center hover:shadow-xl transition-shadow duration-300"
            >
              <AnimatedCounter number={stat.number} suffix={stat.suffix} />
              <p className="mt-2 sm:mt-4 text-gray-600 text-xs sm:text-base md:text-lg leading-tight">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
