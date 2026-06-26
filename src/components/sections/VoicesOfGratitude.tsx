'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

interface Testimonial {
  name: string;
  role: string;
  message: string;
  photo?: string;
}

const staticTestimonials: Testimonial[] = [
  {
    name: 'Dr. Rajesh Patel',
    role: 'Former Student, Class of 2005',
    message: 'Mrs. Mammen was more than a principal; she was a mentor who believed in every student\'s potential. Her guidance shaped my career in medicine.',
  },
  {
    name: 'Sarah Johnson',
    role: 'Parent',
    message: 'The values and discipline my children learned under Mrs. Mammen\'s leadership have been invaluable. She created a nurturing environment for growth.',
  },
  {
    name: 'Ahmed Al-Hassan',
    role: 'Teacher, 15 years',
    message: 'Working with Mrs. Mammen was an honor. Her vision for education and genuine care for staff made every day meaningful.',
  },
  {
    name: 'Priya Sharma',
    role: 'Alumni, Class of 2010',
    message: 'I still remember Mrs. Mammen\'s encouraging words during my board exams. She taught us that excellence is a habit, not an act.',
  },
  {
    name: 'Michael D\'Souza',
    role: 'Parent & Former Student',
    message: 'Both I and my children studied under Mrs. Mammen\'s leadership. Her legacy of excellence spans generations.',
  },
  {
    name: 'Fatima Al-Rashid',
    role: 'Vice Principal',
    message: 'Mrs. Mammen\'s dedication to holistic education transformed our school. She led by example and inspired us all to be better.',
  },
];

export default function VoicesOfGratitude() {
  const [userMessages, setUserMessages] = useState<Testimonial[]>([]);

  useEffect(() => {
    fetch('/api/messages?status=accepted')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setUserMessages(data.map((m: any) => ({
            name: m.name,
            role: m.role || '',
            message: m.message,
          })));
        }
      })
      .catch(() => {});
  }, []);

  const allTestimonials = [...staticTestimonials, ...userMessages];

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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {allTestimonials.map((testimonial, index) => (
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
      </div>
    </section>
  );
}
