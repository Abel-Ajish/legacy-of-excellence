'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

interface TimelineEvent {
  year: string;
  title: string;
  description: string;
  photo: string;
}

const timelineEvents: TimelineEvent[] = [
  { year: '1987', title: 'Headmistress', description: 'Began her leadership journey as Headmistress at St. Lawrence School, Mumbai.', photo: '/images/timeline/1987.jpg' },
  { year: '1992', title: 'Academic Supervisor', description: 'Joined The Asian School Bahrain as Academic Supervisor, marking the beginning of a new chapter.', photo: '/images/timeline/1992.jpg' },
  { year: '1994', title: 'Head Teacher', description: 'Promoted to Head Teacher, overseeing academic programs and curriculum development.', photo: '/images/timeline/1994.jpg' },
  { year: '2000', title: 'Vice Principal', description: 'Elevated to Vice Principal, playing a crucial role in school administration and growth.', photo: '/images/timeline/2000.jpg' },
  { year: '2012', title: 'Principal', description: 'Appointed as Principal, leading the school to new heights of academic excellence.', photo: '/images/timeline/2012.jpg' },
  { year: '2016', title: 'Senior Secondary Expansion', description: 'Introduced Senior Secondary section, expanding educational offerings for students.', photo: '/images/timeline/2016.jpg' },
  { year: '2026', title: 'Retirement', description: 'Concluding 35 years of dedicated service, leaving behind an indelible legacy.', photo: '/images/timeline/2026.jpg' },
];

export default function JourneyThroughTime() {
  const [selectedEvent, setSelectedEvent] = useState<TimelineEvent | null>(null);

  return (
    <section className="min-h-screen bg-navy py-16 md:py-20 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl sm:text-4xl md:text-5xl font-bold text-center text-white mb-12 md:mb-16"
        >
          A Journey Through{' '}
          <span className="gold-gradient-text">Time</span>
        </motion.h2>

        <div className="relative">
          {/* Center line - hidden on mobile, visible on md+ */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-gold/0 via-gold to-gold/0" />

          {/* Mobile center line */}
          <div className="md:hidden absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-gold/0 via-gold to-gold/0" />

          <div className="space-y-8 md:space-y-12">
            {timelineEvents.map((event, index) => (
              <motion.div
                key={event.year}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                {/* Mobile layout */}
                <div className="md:hidden flex items-start gap-4">
                  <div className="flex-shrink-0 flex flex-col items-center">
                    <motion.button
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setSelectedEvent(event)}
                      className="w-4 h-4 bg-gold rounded-full border-2 border-navy animate-glow cursor-pointer z-10 p-2.5"
                    />
                  </div>
                  <button
                    onClick={() => setSelectedEvent(event)}
                    className="flex-1 text-left bg-navy-light p-4 sm:p-5 rounded-xl border border-gold/30 hover:border-gold transition-all duration-300 active:scale-[0.98]"
                  >
                    <p className="text-gold text-xl sm:text-2xl font-bold mb-1">{event.year}</p>
                    <h3 className="text-white text-base sm:text-lg font-semibold mb-1">{event.title}</h3>
                    <p className="text-white/70 text-xs sm:text-sm leading-relaxed">{event.description}</p>
                  </button>
                </div>

                {/* Desktop layout */}
                <div className={`hidden md:flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                  <div className={`w-5/12 ${index % 2 === 0 ? 'pr-8' : 'pl-8'}`}>
                    <button
                      onClick={() => setSelectedEvent(event)}
                      className="text-left bg-navy-light p-6 rounded-xl border border-gold/30 hover:border-gold transition-all duration-300 hover:shadow-lg hover:shadow-gold/20 w-full"
                    >
                      <p className="text-gold text-2xl font-bold mb-2">{event.year}</p>
                      <h3 className="text-white text-xl font-semibold mb-2">{event.title}</h3>
                      <p className="text-white/70 text-sm">{event.description}</p>
                    </button>
                  </div>
                  <div className="w-2/12 flex justify-center">
                    <motion.button
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setSelectedEvent(event)}
                      className="w-6 h-6 bg-gold rounded-full border-4 border-navy animate-glow cursor-pointer p-2.5"
                    />
                  </div>
                  <div className="w-5/12" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedEvent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedEvent(null)}
            onKeyDown={(e) => { if (e.key === 'Escape') setSelectedEvent(null); }}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-navy-light rounded-2xl max-w-2xl w-full overflow-hidden max-h-[90vh] overflow-y-auto"
              role="dialog"
              aria-modal="true"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative h-48 sm:h-64 bg-gray-800 image-placeholder">
                <div className="absolute inset-0 flex items-center justify-center text-white/50">
                  <span>{selectedEvent.year} Photo</span>
                </div>
              </div>
              <div className="p-6 sm:p-8">
                <p className="text-gold text-2xl sm:text-3xl font-bold mb-2">{selectedEvent.year}</p>
                <h3 className="text-white text-xl sm:text-2xl font-bold mb-4">{selectedEvent.title}</h3>
                <p className="text-white/80 leading-relaxed mb-6 text-sm sm:text-base">{selectedEvent.description}</p>
                <div className="border-t border-gold/30 pt-4">
                  <p className="text-white/60 italic text-sm sm:text-base">
                    &quot;Education is not just about learning; it&apos;s about transforming lives.&quot;
                  </p>
                </div>
                <button
                  onClick={() => setSelectedEvent(null)}
                  className="mt-6 px-6 py-2 bg-gold text-navy font-semibold rounded-lg hover:bg-gold-light transition-colors"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
