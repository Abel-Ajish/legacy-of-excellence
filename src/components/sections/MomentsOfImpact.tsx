'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

interface Moment {
  title: string;
  description: string;
  photo: string;
}

const moments: Moment[] = [
  {
    title: '40th Anniversary',
    description: 'A spectacular celebration of talent and creativity, showcasing the diverse abilities of students under Mrs. Mammen\'s guidance.',
    photo: '/images/awards/2025.jpg',
  },
  {
    title: 'Academic Excellence Awards',
    description: 'Recognizing outstanding academic achievements and fostering a culture of excellence in education.',
    photo: '/images/awards/academic.jpg',
  },
  {
    title: 'Leadership Milestones',
    description: 'Celebrating key moments in Mrs. Mammen\'s leadership journey that shaped the school\'s trajectory.',
    photo: '/images/awards/leadership.jpg',
  },
];

export default function MomentsOfImpact() {
  return (
    <section className="min-h-screen bg-navy py-16 md:py-20 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl sm:text-4xl md:text-5xl font-bold text-center text-white mb-12 md:mb-16"
        >
          Moments of <span className="gold-gradient-text">Impact</span>
        </motion.h2>

        <div className="space-y-12 md:space-y-16">
          {moments.map((moment, index) => (
            <motion.div
              key={moment.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.8 }}
              className="flex flex-col lg:flex-row gap-6 md:gap-8 items-center"
            >
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full lg:w-1/2"
              >
                <div className="relative group overflow-hidden rounded-2xl">
                  <div className="aspect-video bg-gray-800 overflow-hidden relative">
                    <Image
                      src={moment.photo}
                      alt={moment.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </motion.div>

              <div className="w-full lg:w-1/2 p-4 sm:p-6 md:p-8">
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <p className="text-gold text-xs sm:text-sm font-semibold mb-2 tracking-wider">
                    MOMENT {String(index + 1).padStart(2, '0')}
                  </p>
                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-4">
                    {moment.title}
                  </h3>
                  <p className="text-white/70 text-sm sm:text-base md:text-lg leading-relaxed">
                    {moment.description}
                  </p>
                  <div className="mt-4 sm:mt-6 h-1 w-16 sm:w-20 bg-gold" />
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
