'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

interface GalleryImage {
  id: number;
  src: string;
  alt: string;
  category: string;
}

const categories = ['All', 'Leadership', 'Students', 'Events', 'Anniversary', 'Academics', 'Teachers'];

const galleryImages: GalleryImage[] = [
  { id: 1, src: '/images/gallery/leadership-1.jpg', alt: 'Leadership moment', category: 'Leadership' },
  { id: 2, src: '/images/gallery/students-1.jpg', alt: 'Students group', category: 'Students' },
  { id: 3, src: '/images/gallery/events-1.jpg', alt: 'School event', category: 'Events' },
  { id: 4, src: '/images/gallery/anniversary-1.jpg', alt: 'Anniversary celebration', category: 'Anniversary' },
  { id: 5, src: '/images/gallery/academics-1.jpg', alt: 'Academic excellence', category: 'Academics' },
  { id: 6, src: '/images/gallery/teachers-1.jpg', alt: 'Teachers team', category: 'Teachers' },
  { id: 7, src: '/images/gallery/leadership-2.jpg', alt: 'Leadership speech', category: 'Leadership' },
  { id: 8, src: '/images/gallery/students-2.jpg', alt: 'Students achievement', category: 'Students' },
  { id: 9, src: '/images/gallery/events-2.jpg', alt: 'Cultural event', category: 'Events' },
  { id: 10, src: '/images/gallery/anniversary-1.jpg', alt: 'Anniversary performance', category: 'Anniversary' },
  { id: 11, src: '/images/gallery/academics-2.jpg', alt: 'Classroom learning', category: 'Academics' },
  { id: 12, src: '/images/gallery/teachers-2.jpg', alt: 'Teachers workshop', category: 'Teachers' },
];

export default function GalleryOfMemories() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [lightboxImage, setLightboxImage] = useState<GalleryImage | null>(null);

  const filteredImages =
    selectedCategory === 'All'
      ? galleryImages
      : galleryImages.filter((img) => img.category === selectedCategory);

  return (
    <section className="min-h-screen bg-white py-16 md:py-20">
      <div className="container mx-auto px-4 sm:px-6">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl sm:text-4xl md:text-5xl font-bold text-center text-navy mb-12 md:mb-16"
        >
          Gallery of <span className="gold-gradient-text">Memories</span>
        </motion.h2>

        {/* Category filters - horizontal scroll on mobile */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10 md:mb-12"
        >
          <div className="flex overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap sm:justify-center gap-2 sm:gap-3 scrollbar-hide">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`flex-shrink-0 px-4 sm:px-5 py-2 rounded-full text-sm sm:text-base transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-gold text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Masonry grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 sm:gap-6 space-y-4 sm:space-y-6">
          <AnimatePresence mode="sync">
            {filteredImages.map((image, index) => (
              <motion.div
                key={image.id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="break-inside-avoid"
              >
                <button
                  onClick={() => setLightboxImage(image)}
                  className="relative group overflow-hidden rounded-xl cursor-pointer w-full"
                  aria-label={`View ${image.alt}`}
                >
                  <div className="aspect-[4/3] bg-gray-200 overflow-hidden">
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      loading="lazy"
                    />
                  </div>
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
                    <div className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <svg className="w-8 h-8 sm:w-12 sm:h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                      </svg>
                    </div>
                  </div>
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4 overflow-y-auto"
            onClick={() => setLightboxImage(null)}
            onKeyDown={(e) => { if (e.key === 'Escape') setLightboxImage(null); }}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="max-w-4xl w-full relative"
              role="dialog"
              aria-modal="true"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setLightboxImage(null)}
                className="absolute top-2 right-2 sm:top-4 sm:right-4 text-white/70 hover:text-white z-10"
                aria-label="Close lightbox"
              >
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <div className="bg-gray-900 rounded-2xl overflow-hidden">
                <div className="aspect-video bg-gray-800 relative overflow-hidden">
                  <img
                    src={lightboxImage.src}
                    alt={lightboxImage.alt}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="p-4 sm:p-6">
                  <h3 className="text-white text-lg sm:text-xl font-semibold">{lightboxImage.alt}</h3>
                  <p className="text-gold text-sm mt-2">{lightboxImage.category}</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
