'use client';

import { motion } from 'framer-motion';

export default function FarewellLetter() {
  return (
    <section className="min-h-screen bg-cream py-20 flex items-center justify-center">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto"
        >
          {/* Luxury stationery style */}
          <div className="bg-white rounded-lg shadow-2xl overflow-hidden border-8 border-double border-gold/30">
            {/* Header with school logo */}
            <div className="bg-navy p-8 text-center">
              <h3 className="text-white text-xl font-semibold">
                The Asian School Bahrain
              </h3>
            </div>

            {/* Letter content */}
            <div className="p-8 md:p-12 relative">
              {/* Gold border decoration */}
              <div className="absolute top-4 left-4 right-4 bottom-4 border border-gold/20 pointer-events-none" />

              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.3 }}
              >
                <p className="text-gray-700 leading-relaxed mb-6">
                  Dear Students, Colleagues, and Parents,
                </p>

                <p className="text-gray-700 leading-relaxed mb-6">
                  As I pen down this farewell letter, my heart is filled with a
                  profound sense of gratitude and nostalgia. Thirty-five years
                  at The Asian School Bahrain have been the most rewarding years
                  of my professional life.
                </p>

                <p className="text-gray-700 leading-relaxed mb-6">
                  When I joined this institution in 1992, I could never have
                  imagined the incredible journey that lay ahead. Together, we
                  have built something truly special—a community dedicated to
                  excellence, compassion, and the holistic development of every
                  child.
                </p>

                <p className="text-gray-700 leading-relaxed mb-6">
                  The introduction of Senior Secondary education in 2019 stands
                  as a testament to our collective ambition and determination.
                  What began as a vision has become a reality that continues to
                  shape the futures of thousands of young minds.
                </p>

                <p className="text-gray-700 leading-relaxed mb-6">
                  To my beloved students—you are my legacy. Every success you
                  achieve, every kind act you perform, and every dream you
                  pursue carries forward the values we have built together.
                </p>

                <p className="text-gray-700 leading-relaxed mb-6">
                  To my dear colleagues—thank you for your unwavering dedication
                  and partnership. Your passion for education has been the
                  driving force behind our success.
                </p>

                <p className="text-gray-700 leading-relaxed mb-6">
                  To the parents—your trust in us has been our greatest honor.
                  Together, we have given your children the foundation to soar.
                </p>

                <p className="text-gray-700 leading-relaxed mb-8">
                  Though I retire from my official duties, my heart will always
                  remain at The Asian School. The legacy we have built together
                  will continue to inspire for generations to come.
                </p>

                {/* Signature */}
                <div className="border-t border-gold/30 pt-6">
                  <p className="text-gray-600 mb-2">With deepest gratitude,</p>
                  <p className="text-2xl text-gold font-cursive italic">
                    Molly Treasa Mammen
                  </p>
                  <p className="text-gray-500 text-sm mt-2">
                    Principal, The Asian School Bahrain
                  </p>
                  <p className="text-gray-500 text-sm">
                    1992 — 2026
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Footer */}
            <div className="bg-navy p-4 text-center">
              <p className="text-white/60 text-sm">
                A Legacy of Excellence • 35 Years of Service
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
