'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

interface Slide {
  photo: string;
  text: string;
}

const slides: Slide[] = [
  {
    photo: '/images/campus/school-opening.jpg',
    text: 'The Asian School opened in 1983.',
  },
  {
    photo: '/images/campus/classrooms.jpg',
    text: 'Joined ASB in 1992.',
  },
  {
    photo: '/images/campus/students.jpg',
    text: "Growth into one of Bahrain's largest CBSE schools.",
  },
  {
    photo: '/images/campus/senior.jpg',
    text: 'Senior Secondary introduced in 2016.',
  },
  {
    photo: '/images/campus/graduation.jpg',
    text: 'A legacy continuing into future generations.',
  },
];

function ParallaxSlide({ slide, index }: { slide: Slide; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 1, 0.3]);

  return (
    <div
      ref={ref}
      className="relative h-[100dvh] flex items-center justify-center overflow-hidden"
    >
      {/* Background image with parallax */}
      <motion.div
        style={{ y }}
        className="absolute inset-0 bg-cover bg-center image-placeholder"
      >
        <div className="absolute inset-0 bg-black/50" />
      </motion.div>

      {/* Content */}
      <motion.div
        style={{ opacity }}
        className="relative z-10 text-center px-4 max-w-4xl mx-auto"
      >
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-gold text-lg mb-4"
        >
          {`0${index + 1}`}
        </motion.p>
        <motion.h3
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-3xl md:text-5xl lg:text-6xl font-bold text-white leading-tight"
        >
          {slide.text}
        </motion.h3>
      </motion.div>
    </div>
  );
}

export default function TheSchoolSheHelpedShape() {
  return (
    <section className="relative">
      {slides.map((slide, index) => (
        <ParallaxSlide key={index} slide={slide} index={index} />
      ))}
    </section>
  );
}
