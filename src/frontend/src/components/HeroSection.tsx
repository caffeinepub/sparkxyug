import { ArrowRight, Sparkles } from "lucide-react";
import { motion } from "motion/react";

interface HeroProps {
  onShopNow: () => void;
  onNewDrops: () => void;
}

const MARQUEE_ITEMS = [
  { id: "sxy-1", text: "SPARKxYUG" },
  { id: "wts-1", text: "WEAR THE SPARK" },
  { id: "nd-1", text: "NEW DROP" },
  { id: "us-1", text: "UNISEX STREETWEAR" },
  { id: "sxy-2", text: "SPARKxYUG" },
  { id: "wts-2", text: "WEAR THE SPARK" },
  { id: "nd-2", text: "NEW DROP" },
  { id: "us-2", text: "UNISEX STREETWEAR" },
  { id: "sxy-3", text: "SPARKxYUG" },
  { id: "wts-3", text: "WEAR THE SPARK" },
];

export default function HeroSection({ onShopNow, onNewDrops }: HeroProps) {
  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('/assets/generated/hero-banner.dim_1400x700.jpg')",
        }}
      />
      {/* Dark gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#080808]/70 via-[#080808]/50 to-[#080808]" />
      {/* Purple glow blobs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-[#a855f7]/10 blur-3xl" />
      <div className="absolute bottom-1/3 right-1/4 w-64 h-64 rounded-full bg-[#f5c518]/8 blur-3xl" />

      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto pt-16">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full border border-[#a855f7]/40 bg-[#a855f7]/10 text-[#a855f7] text-sm font-body tracking-widest uppercase"
        >
          <Sparkles className="w-3 h-3" />
          New Collection — Spring 2026
        </motion.div>

        {/* Main headline */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-display font-800 uppercase leading-none tracking-tighter mb-4"
        >
          <span className="block text-[clamp(3.5rem,12vw,9rem)] text-white">
            WEAR THE
          </span>
          <span
            className="block text-[clamp(3.5rem,12vw,9rem)] animate-text-glow"
            style={{ color: "#f5c518" }}
          >
            SPARK
          </span>
        </motion.h1>

        {/* Brand name */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="font-display text-[clamp(1.2rem,3vw,2rem)] font-800 tracking-[0.4em] text-[#a855f7] uppercase mb-6"
        >
          SPARKxYUG
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="font-body text-[clamp(0.9rem,2vw,1.25rem)] text-white/60 max-w-xl mx-auto mb-10 tracking-wide"
        >
          Unisex streetwear. No rules. Pure vibe.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <button
            type="button"
            data-ocid="hero.primary_button"
            onClick={onShopNow}
            className="btn-primary flex items-center gap-2 px-8 py-4 rounded-sm font-display font-700 text-sm tracking-[0.2em] uppercase text-white animate-glow-pulse"
          >
            SHOP NOW
            <ArrowRight className="w-4 h-4" />
          </button>
          <button
            type="button"
            data-ocid="hero.secondary_button"
            onClick={onNewDrops}
            className="flex items-center gap-2 px-8 py-4 rounded-sm font-display font-700 text-sm tracking-[0.2em] uppercase text-white border border-[#f5c518]/50 hover:border-[#f5c518] hover:text-[#f5c518] transition-all duration-300"
          >
            <Sparkles className="w-4 h-4" />
            NEW DROPS
          </button>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="mt-16 flex flex-col items-center gap-2 text-white/30 text-xs tracking-widest uppercase animate-float"
        >
          <div className="w-px h-12 bg-gradient-to-b from-transparent to-[#a855f7]/50" />
          Scroll
        </motion.div>
      </div>

      {/* Marquee ticker */}
      <div className="absolute bottom-0 left-0 right-0 bg-[#a855f7] py-2 overflow-hidden">
        <div className="animate-marquee flex gap-12 whitespace-nowrap">
          {MARQUEE_ITEMS.map((item) => (
            <span
              key={item.id}
              className="font-display font-700 text-xs tracking-[0.3em] uppercase text-white"
            >
              {item.text} ✦
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
