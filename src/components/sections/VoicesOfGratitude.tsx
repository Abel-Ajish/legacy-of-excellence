'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Testimonial {
  name: string;
  role: string;
  message: string;
}

export default function VoicesOfGratitude() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

  useEffect(() => {
    fetch('/api/messages?status=accepted')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          const shuffled = [...data].sort(() => Math.random() - 0.5);
          setTestimonials(shuffled.slice(0, 6).map((m: any) => ({
            name: m.name,
            role: m.role || '',
            message: m.message,
          })));
        }
      })
      .catch(() => {});
  }, []);

  return (
    <section className="bg-cream py-16 md:py-20">
      <div className="container mx-auto px-4 sm:px-6">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl sm:text-4xl md:text-5xl font-bold text-center text-navy mb-12 md:mb-16"
        >
          Voices of <span className="gold-gradient-text">Gratitude</span>
        </motion.h2>

        {testimonials.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center py-12"
          >
            <p className="text-gray-500 text-lg mb-4">No messages yet. Be the first to share your memories!</p>
            <Link
              href="#message-form"
              className="inline-block bg-gold text-white px-6 py-3 rounded-full font-semibold hover:bg-gold-light transition-colors duration-300"
            >
              Leave a Message
            </Link>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name + index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: (index % 6) * 0.1 }}
                className="bg-white p-5 sm:p-6 md:p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 relative"
              >
                <div className="absolute top-3 right-4 sm:top-4 sm:right-6 text-4xl sm:text-6xl text-gold/20 font-serif">
                  &ldquo;
                </div>

                <p className="text-gray-700 leading-relaxed mb-4 sm:mb-6 relative z-10 italic text-sm sm:text-base">
                  &ldquo;{testimonial.message}&rdquo;
                </p>

                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gold/10 flex-shrink-0 flex items-center justify-center">
                    <span className="text-gold font-bold text-sm">
                      {testimonial.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                    </span>
                  </div>
                  <div className="min-w-0">
                    <p className="font-semibold text-navy text-sm sm:text-base truncate">{testimonial.name}</p>
                    {testimonial.role && (
                      <p className="text-xs sm:text-sm text-gray-500 truncate">{testimonial.role}</p>
                    )}
                  </div>
                </div>

                <div className="absolute bottom-2 left-5 right-5 sm:left-6 sm:right-6 md:left-8 md:right-8 h-1 bg-gradient-to-r from-gold/0 via-gold to-gold/0" />
              </motion.div>
            ))}
          </div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link
            href="/messages"
            className="inline-block bg-gold text-white px-8 py-3 rounded-full font-semibold hover:bg-gold-light transition-colors duration-300"
          >
            View All Messages
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
