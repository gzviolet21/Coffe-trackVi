"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { createClient } from "@/lib/supabase/client";

export default function AuthPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    setLoading(false);
    if (error) {
      setError(error.message);
    } else {
      setSent(true);
    }
  };

  return (
    <div className="min-h-screen bg-cream flex flex-col items-center justify-center px-6">
      <AnimatePresence mode="wait">
        {!sent ? (
          <motion.div
            key="form"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            className="w-full max-w-sm"
          >
            <div className="text-center mb-10">
              <div className="text-6xl mb-4">☕</div>
              <h1 className="font-display text-3xl text-espresso leading-tight">
                Your coffee story<br />starts here
              </h1>
              <p className="font-body text-muted text-sm mt-3">
                Track every sip, every café, every vibe.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="w-full bg-white border-2 border-cream-dark rounded-xl px-4 py-3.5 text-espresso font-body placeholder:text-muted focus:border-terracotta/50 focus:outline-none transition-colors"
              />
              {error && (
                <p className="text-sm text-terracotta font-body">{error}</p>
              )}
              <motion.button
                type="submit"
                disabled={loading}
                whileTap={{ scale: 0.97 }}
                className="w-full py-4 rounded-2xl bg-terracotta text-cream font-display text-lg shadow-warm-md disabled:opacity-60"
              >
                {loading ? "Sending…" : "Send magic link"}
              </motion.button>
            </form>

            <p className="text-center text-xs text-muted font-body mt-6">
              No password. Just a link to your inbox.
            </p>
          </motion.div>
        ) : (
          <motion.div
            key="sent"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-sm text-center"
          >
            <div className="text-6xl mb-4">✉️</div>
            <h2 className="font-display text-2xl text-espresso mb-3">
              Check your inbox
            </h2>
            <p className="font-body text-muted text-sm">
              We sent a magic link to <strong className="text-espresso">{email}</strong>.
              Tap it and you&apos;re in.
            </p>
            <button
              onClick={() => setSent(false)}
              className="mt-6 text-xs text-muted font-body underline"
            >
              Wrong email? Go back
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
