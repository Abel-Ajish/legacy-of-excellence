'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';

interface LegacyWord {
  word: string;
  quote: string;
}

const legacyWords: LegacyWord[] = [
  { word: 'Leadership', quote: 'True leadership is not about being in charge. It is about taking care of those in your charge.' },
  { word: 'Kindness', quote: 'Kindness is the language which the deaf can hear and the blind can see.' },
  { word: 'Integrity', quote: 'Integrity is doing the right thing, even when no one is watching.' },
  { word: 'Wisdom', quote: 'The only true wisdom is in knowing you know nothing.' },
  { word: 'Dedication', quote: 'Dedication is not a weakness; it is the hallmark of a true professional.' },
  { word: 'Mentorship', quote: 'A mentor is someone who allows you to see the hope inside yourself.' },
  { word: 'Excellence', quote: 'Excellence is not a destination but a continuous journey.' },
  { word: 'Compassion', quote: 'Compassion is the bridge between teacher and student.' },
  { word: 'Vision', quote: 'Vision without action is merely a dream.' },
  { word: 'Inspiration', quote: 'Inspiration is everywhere if you know where to look.' },
  { word: 'Patience', quote: 'Patience is not the ability to wait, but the ability to keep a good attitude while working.' },
  { word: 'Grace', quote: 'Grace is the beauty of form under the influence of freedom.' },
  { word: 'Service', quote: 'The best way to find yourself is to lose yourself in the service of others.' },
  { word: 'Legacy', quote: 'A legacy is not what is left in people\'s bank accounts, but in their hearts.' },
  { word: 'Hope', quote: 'Hope is the thing with feathers that perches in the soul.' },
  { word: 'Courage', quote: 'Courage is not the absence of fear, but the triumph over it.' },
  { word: 'Respect', quote: 'Respect is not given; it is earned through actions and character.' },
  { word: 'Growth', quote: 'Growth begins at the end of your comfort zone.' },
  { word: 'Passion', quote: 'Passion is energy. Feel the power that comes from focusing on what excites you.' },
  { word: 'Community', quote: 'Alone we can do so little; together we can do so much.' },
  { word: 'Purpose', quote: 'The purpose of life is not to be happy. It is to be useful, to be honorable.' },
  { word: 'Resilience', quote: 'Fall seven times, stand up eight.' },
  { word: 'Empathy', quote: 'Empathy is seeing with the eyes of another, listening with the ears of another.' },
  { word: 'Discipline', quote: 'Discipline is the bridge between goals and accomplishment.' },
  { word: 'Knowledge', quote: 'Knowledge is power. Information is liberating.' },
  { word: 'Unity', quote: 'Unity is strength... when there is teamwork and collaboration, wonderful things can be achieved.' },
  { word: 'Heart', quote: 'Education is not the filling of a pail, but the lighting of a fire.' },
  { word: 'Strength', quote: 'Strength does not come from physical capacity. It comes from an indomitable will.' },
];

// Pre-computed positions to avoid hydration mismatch
const positions = [
  { x: 15, y: 10 },
  { x: 60, y: 8 },
  { x: 35, y: 20 },
  { x: 75, y: 15 },
  { x: 10, y: 35 },
  { x: 50, y: 30 },
  { x: 80, y: 40 },
  { x: 25, y: 50 },
  { x: 65, y: 45 },
  { x: 40, y: 55 },
  { x: 5, y: 65 },
  { x: 55, y: 60 },
  { x: 85, y: 70 },
  { x: 20, y: 75 },
  { x: 70, y: 80 },
  { x: 45, y: 85 },
  { x: 30, y: 90 },
  { x: 90, y: 25 },
  { x: 50, y: 15 },
  { x: 75, y: 55 },
  { x: 12, y: 45 },
  { x: 88, y: 60 },
  { x: 42, y: 72 },
  { x: 68, y: 30 },
  { x: 28, y: 18 },
  { x: 78, y: 88 },
  { x: 55, y: 42 },
  { x: 18, y: 82 },
];

function FloatingWord({ item, index, onSelect, isMobile }: { item: LegacyWord; index: number; onSelect: (w: LegacyWord) => void; isMobile: boolean }) {
  const ref = useRef<HTMLButtonElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 200 + index * 60);
    return () => clearTimeout(timer);
  }, [index]);

  useEffect(() => {
    if (!visible || !ref.current) return;
    const el = ref.current;
    let animId: number;
    let observer: IntersectionObserver;
    let timer: ReturnType<typeof setTimeout>;
    let isAnimating = false;
    let isVisible = false;
    let startTime: number;

    const speedX = (0.15 + (index % 5) * 0.08) * (index % 2 === 0 ? 1 : -1);
    const speedY = (0.12 + (index % 4) * 0.06) * (index % 3 === 0 ? -1 : 1);
    const rangeX = isMobile ? 5 + (index % 4) * 3 : 15 + (index % 6) * 5;
    const rangeY = isMobile ? 4 + (index % 3) * 2 : 10 + (index % 5) * 4;

    function animate() {
      const t = (Date.now() - startTime) / 1000;
      const x = Math.sin(t * speedX) * rangeX;
      const y = Math.cos(t * speedY) * rangeY;
      const rotate = Math.sin(t * 0.3) * 3;
      el.style.transform = `translate(${x}px, ${y}px) rotate(${rotate}deg)`;
      animId = requestAnimationFrame(animate);
    }

    function startLoop() {
      if (isAnimating) return;
      isAnimating = true;
      startTime = Date.now() + index * 400;
      animId = requestAnimationFrame(animate);
    }

    observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible) {
          startLoop();
        } else if (isAnimating) {
          cancelAnimationFrame(animId);
          isAnimating = false;
        }
      },
      { threshold: 0 }
    );
    observer.observe(el);

    timer = setTimeout(() => {
      if (isVisible) startLoop();
    }, 1200);

    return () => {
      clearTimeout(timer);
      cancelAnimationFrame(animId);
      observer.disconnect();
    };
  }, [visible, index, isMobile]);

  const pos = positions[index % positions.length];
  const size = isMobile ? 0.7 + (index % 6) * 0.15 : 0.75 + (index % 8) * 0.2;
  const opacity = 0.3 + (index % 5) * 0.12;

  return (
    <motion.button
      ref={ref}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: visible ? opacity : 0, scale: visible ? 1 : 0 }}
      transition={{ duration: 0.8, type: 'spring', stiffness: 80 }}
      whileHover={{
        opacity: 1,
        scale: 1.3,
        textShadow: '0 0 30px rgba(201, 162, 39, 0.9), 0 0 60px rgba(201, 162, 39, 0.4)',
        transition: { duration: 0.3 },
      }}
      onClick={() => onSelect(item)}
      className="absolute cursor-pointer font-semibold text-white hover:text-gold transition-colors duration-300 whitespace-nowrap"
      style={{
        fontSize: `${size}rem`,
        left: `${pos.x}%`,
        top: `${pos.y}%`,
        filter: `blur(${index % 5 === 0 ? 0.5 : 0}px)`,
        textShadow: '0 0 10px rgba(201, 162, 39, 0.2)',
      }}
    >
      {item.word}
    </motion.button>
  );
}

export default function LegacyWall() {
  const [selectedWord, setSelectedWord] = useState<LegacyWord | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [particles, setParticles] = useState<Array<{ x: number; size: number; delay: number; duration: number }>>([]);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  useEffect(() => {
    const count = isMobile ? 20 : 40;
    const p = Array.from({ length: count }, (_, i) => ({
      x: (i * 31) % 100,
      size: 1 + (i % 4),
      delay: (i * 0.3) % 5,
      duration: 8 + (i % 6) * 2,
    }));
    setParticles(p);
  }, [isMobile]);

  const wordsToShow = isMobile ? legacyWords.slice(0, 15) : legacyWords;

  return (
    <section className="min-h-[70vh] md:min-h-screen bg-navy py-12 md:py-20 overflow-hidden relative">
      {/* Background glow effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-48 md:w-96 h-48 md:h-96 bg-gold/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-40 md:w-80 h-40 md:h-80 bg-gold/5 rounded-full blur-3xl" />
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {particles.map((p, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-gold/20"
            style={{
              left: `${p.x}%`,
              bottom: '-10%',
              width: `${p.size}px`,
              height: `${p.size}px`,
              animation: `floatUp ${p.duration}s linear ${p.delay}s infinite`,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl sm:text-4xl md:text-5xl font-bold text-center text-white mb-4 md:mb-6"
        >
          Legacy <span className="gold-gradient-text">Wall</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-center text-white/50 mb-10 md:mb-16 text-sm md:text-lg"
        >
          {isMobile ? 'Tap to read' : 'Hover to illuminate. Click to read.'}
        </motion.p>

        {/* Floating words */}
        <div className="relative min-h-[50vh] md:min-h-[70vh]">
          {wordsToShow.map((item, index) => (
            <FloatingWord
              key={item.word + index}
              item={item}
              index={index}
              onSelect={setSelectedWord}
              isMobile={isMobile}
            />
          ))}
        </div>
      </div>

      {/* Quote modal */}
      <AnimatePresence>
        {selectedWord && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/85 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedWord(null)}
          >
            <motion.div
              initial={{ scale: 0.7, opacity: 0, y: 40 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.7, opacity: 0, y: 40 }}
              transition={{ type: 'spring', stiffness: 100, damping: 15 }}
              className="relative bg-gradient-to-b from-navy-light to-navy rounded-3xl max-w-md sm:max-w-lg w-full p-6 sm:p-10 text-center border border-gold/20 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-gold/20 via-gold/10 to-gold/20 rounded-3xl blur-xl opacity-50" />

              <div className="relative">
                <motion.h3
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-3xl sm:text-4xl md:text-5xl font-bold gold-gradient-text mb-4 sm:mb-6"
                >
                  {selectedWord.word}
                </motion.h3>

                <div className="w-16 h-0.5 bg-gold/40 mx-auto mb-4 sm:mb-6" />

                <motion.p
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="text-white/70 text-sm sm:text-base md:text-lg italic leading-relaxed"
                >
                  &ldquo;{selectedWord.quote}&rdquo;
                </motion.p>

                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  onClick={() => setSelectedWord(null)}
                  className="mt-6 sm:mt-8 px-6 sm:px-8 py-2 sm:py-3 border border-gold/50 text-gold rounded-full hover:bg-gold hover:text-navy transition-all duration-300 font-medium text-sm sm:text-base"
                >
                  Close
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
