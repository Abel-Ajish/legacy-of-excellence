'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import GoldParticles from '../GoldParticles';

export default function TheWomanBehindTheLegacy() {
  return (
    <section className="relative min-h-screen bg-white py-16 md:py-20 overflow-hidden">
      <GoldParticles />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-8 md:gap-12">
          {/* Left: Portrait */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:w-1/2 w-full max-w-sm lg:max-w-none"
          >
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-gold/20 to-transparent rounded-lg blur-lg" />
              <div className="relative rounded-lg overflow-hidden aspect-[3/4] shadow-2xl">
                <Image
                  src="/images/retirement/portrait.jpg"
                  alt="Mrs. Molly Treasa Mammen"
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </div>
          </motion.div>

          {/* Right: Biography */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:w-1/2 w-full"
          >
            <div className="bg-white p-5 sm:p-6 md:p-8 rounded-xl shadow-2xl border border-gray-100">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-navy mb-4 sm:mb-6">
                The Woman Behind the Legacy
              </h2>

              <div className="space-y-3 sm:space-y-4 text-gray-700 leading-relaxed text-sm sm:text-base">
                <p>
                  Born and educated in Mumbai, Mrs. Molly Treasa Mammen
                  embarked on her educational journey with a passion for
                  nurturing young minds.
                </p>
                <p>
                  A graduate of the University of Bombay, she majored in
                  English and Education, laying the foundation for a
                  remarkable career spanning over five decades.
                </p>
                <p>
                  Before joining The Asian School in 1992, she served as
                  Headmistress at St. Lawrence School, where she honed her
                  leadership skills and developed her visionary approach to
                  education.
                </p>
                <p>
                  Her dedication to academic excellence and holistic
                  development has transformed countless lives, making her
                  one of the most respected educators in Bahrain.
                </p>
              </div>

              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.5 }}
                className="mt-6 sm:mt-8 h-1 bg-gradient-to-r from-gold to-transparent origin-left"
              />

              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 1 }}
                className="mt-3 sm:mt-4 text-gold text-lg sm:text-xl italic"
              >
                Molly Treasa Mammen
              </motion.p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
