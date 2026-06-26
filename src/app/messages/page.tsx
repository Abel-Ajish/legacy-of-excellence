'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import MessageForm from '@/components/MessageForm';
import SmoothScrollProvider from '@/components/SmoothScrollProvider';

interface Message {
  name: string;
  role: string;
  message: string;
}

const MESSAGES_PER_PAGE = 12;

export default function MessagesPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [visibleCount, setVisibleCount] = useState(MESSAGES_PER_PAGE);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/messages?status=accepted')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setMessages(data.map((m: Message) => ({
            name: m.name,
            role: m.role || '',
            message: m.message,
          })));
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const visibleMessages = messages.slice(0, visibleCount);
  const hasMore = visibleCount < messages.length;

  return (
    <SmoothScrollProvider>
    <div className="bg-cream min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 py-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-gold hover:text-gold-light transition-colors mb-8"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Home
        </Link>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl sm:text-4xl md:text-5xl font-bold text-center text-navy mb-12"
        >
          All <span className="gold-gradient-text">Messages</span>
        </motion.h1>

        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">Loading messages...</p>
          </div>
        ) : messages.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-gray-500 text-lg mb-4">No messages yet. Be the first to share your memories!</p>
            <a
              href="#message-form"
              className="inline-block bg-gold text-white px-6 py-3 rounded-full font-semibold hover:bg-gold-light transition-colors duration-300"
            >
              Leave a Message
            </a>
          </motion.div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {visibleMessages.map((msg, index) => (
                <motion.div
                  key={msg.name + index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: (index % 3) * 0.1 }}
                  className="bg-white p-5 sm:p-6 md:p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 relative"
                >
                  <div className="absolute top-3 right-4 sm:top-4 sm:right-6 text-4xl sm:text-6xl text-gold/20 font-serif">
                    &ldquo;
                  </div>

                  <p className="text-gray-700 leading-relaxed mb-4 sm:mb-6 relative z-10 italic text-sm sm:text-base">
                    &ldquo;{msg.message}&rdquo;
                  </p>

                  <div className="flex items-center gap-3 sm:gap-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gold/10 flex-shrink-0 flex items-center justify-center">
                      <span className="text-gold font-bold text-sm">
                        {msg.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                      </span>
                    </div>
                    <div className="min-w-0">
                      <p className="font-semibold text-navy text-sm sm:text-base truncate">{msg.name}</p>
                      {msg.role && (
                        <p className="text-xs sm:text-sm text-gray-500 truncate">{msg.role}</p>
                      )}
                    </div>
                  </div>

                  <div className="absolute bottom-2 left-5 right-5 sm:left-6 sm:right-6 md:left-8 md:right-8 h-1 bg-gradient-to-r from-gold/0 via-gold to-gold/0" />
                </motion.div>
              ))}
            </div>

            {hasMore && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mt-12"
              >
                <button
                  onClick={() => setVisibleCount((prev) => prev + MESSAGES_PER_PAGE)}
                  className="bg-gold text-white px-8 py-3 rounded-full font-semibold hover:bg-gold-light transition-colors duration-300"
                >
                  Load More ({messages.length - visibleCount} remaining)
                </button>
              </motion.div>
            )}
          </>
        )}
      </div>

      <div id="message-form">
        <MessageForm />
      </div>
    </div>
    </SmoothScrollProvider>
  );
}
