'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
  id: string;
  name: string;
  message: string;
  role: string;
  status: 'pending' | 'accepted' | 'rejected';
  createdAt: string;
}

export default function AdminPage() {
  const [password, setPassword] = useState('');
  const [authenticated, setAuthenticated] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [filter, setFilter] = useState<'all' | 'pending' | 'accepted' | 'rejected'>('all');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchMessages = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/messages');
      const data = await res.json();
      setMessages(data);
    } catch {
      setError('Failed to load messages');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (authenticated) fetchMessages();
  }, [authenticated]);

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    if (password.trim()) {
      setAuthenticated(true);
    }
  };

  const handleStatus = async (id: string, status: 'accepted' | 'rejected') => {
    try {
      const res = await fetch('/api/messages', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status, password }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || 'Failed to update');
        return;
      }

      setMessages((prev) =>
        prev.map((m) => (m.id === id ? { ...m, status } : m))
      );
    } catch {
      setError('Failed to update message');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this message permanently?')) return;

    try {
      const res = await fetch('/api/messages', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, password }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || 'Failed to delete');
        return;
      }

      setMessages((prev) => prev.filter((m) => m.id !== id));
    } catch {
      setError('Failed to delete message');
    }
  };

  const filtered = filter === 'all' ? messages : messages.filter((m) => m.status === filter);
  const pendingCount = messages.filter((m) => m.status === 'pending').length;

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-navy flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-navy-light rounded-2xl p-8 w-full max-w-sm border border-gold/20"
        >
          <h1 className="text-2xl font-bold text-white text-center mb-6">Admin Access</h1>
          <form onSubmit={handleAuth}>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className="w-full px-4 py-3 rounded-xl bg-navy border border-gold/30 text-white placeholder-white/40 focus:border-gold focus:ring-2 focus:ring-gold/20 outline-none mb-4"
              autoFocus
            />
            <button
              type="submit"
              className="w-full py-3 bg-gold text-navy font-semibold rounded-xl hover:bg-gold-light transition-colors"
            >
              Enter
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-navy py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-white">
            Messages <span className="text-gold">({messages.length})</span>
          </h1>
          <button
            onClick={fetchMessages}
            className="px-4 py-2 text-sm border border-gold/30 text-gold rounded-lg hover:bg-gold/10 transition-colors"
          >
            Refresh
          </button>
        </div>

        {/* Filter tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {(['all', 'pending', 'accepted', 'rejected'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-lg text-sm font-medium capitalize whitespace-nowrap transition-colors ${
                filter === f
                  ? 'bg-gold text-navy'
                  : 'bg-navy-light text-white/60 hover:text-white'
              }`}
            >
              {f}
              {f === 'pending' && pendingCount > 0 && (
                <span className="ml-1.5 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                  {pendingCount}
                </span>
              )}
            </button>
          ))}
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 mb-6 text-red-400 text-sm">
            {error}
            <button onClick={() => setError('')} className="ml-2 underline">dismiss</button>
          </div>
        )}

        {loading ? (
          <p className="text-white/50 text-center py-12">Loading...</p>
        ) : filtered.length === 0 ? (
          <p className="text-white/50 text-center py-12">No messages found.</p>
        ) : (
          <div className="space-y-4">
            <AnimatePresence>
              {filtered.map((msg) => (
                <motion.div
                  key={msg.id}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className={`bg-navy-light rounded-xl p-5 border ${
                    msg.status === 'pending'
                      ? 'border-yellow-500/30'
                      : msg.status === 'accepted'
                      ? 'border-green-500/30'
                      : 'border-red-500/30'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="text-white font-semibold truncate">{msg.name}</p>
                        {msg.role && (
                          <span className="text-xs text-gold/70 bg-gold/10 px-2 py-0.5 rounded-full whitespace-nowrap">
                            {msg.role}
                          </span>
                        )}
                        <span className={`text-xs px-2 py-0.5 rounded-full capitalize ${
                          msg.status === 'pending'
                            ? 'bg-yellow-500/20 text-yellow-400'
                            : msg.status === 'accepted'
                            ? 'bg-green-500/20 text-green-400'
                            : 'bg-red-500/20 text-red-400'
                        }`}>
                          {msg.status}
                        </span>
                      </div>
                      <p className="text-white/70 text-sm leading-relaxed">{msg.message}</p>
                      <p className="text-white/30 text-xs mt-2">
                        {new Date(msg.createdAt).toLocaleDateString('en-US', {
                          year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit',
                        })}
                      </p>
                    </div>

                    {msg.status === 'pending' && (
                      <div className="flex gap-2 sm:flex-shrink-0">
                        <button
                          onClick={() => handleStatus(msg.id, 'accepted')}
                          className="px-4 py-2 bg-green-600 text-white text-sm rounded-lg hover:bg-green-500 transition-colors"
                        >
                          Accept
                        </button>
                        <button
                          onClick={() => handleStatus(msg.id, 'rejected')}
                          className="px-4 py-2 bg-red-600/80 text-white text-sm rounded-lg hover:bg-red-500 transition-colors"
                        >
                          Reject
                        </button>
                      </div>
                    )}

                    {msg.status !== 'pending' && (
                      <button
                        onClick={() => handleDelete(msg.id)}
                        className="px-3 py-1.5 bg-red-600/20 text-red-400 text-xs rounded-lg hover:bg-red-600/40 transition-colors sm:flex-shrink-0"
                      >
                        Delete
                      </button>
                    )}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
}
