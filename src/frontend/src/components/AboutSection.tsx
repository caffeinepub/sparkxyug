import { Zap } from "lucide-react";
import { motion } from "motion/react";

export default function AboutSection() {
  return (
    <section id="about" className="relative py-32 px-4 overflow-hidden">
      {/* Bg */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0d0820] via-[#080808] to-[#080808]" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#a855f7]/30 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#a855f7]/30 to-transparent" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#a855f7]/5 blur-3xl" />

      <div className="relative z-10 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="flex items-center gap-3 mb-8">
            <Zap className="w-5 h-5 text-[#a855f7]" />
            <span className="font-body text-[#a855f7] text-xs tracking-[0.4em] uppercase">
              About Us
            </span>
          </div>

          <h2 className="font-display font-800 text-[clamp(2.5rem,7vw,5.5rem)] uppercase leading-none tracking-tighter text-white mb-8">
            BUILT FOR
            <br />
            <span className="text-[#f5c518] animate-text-glow">THE BOLD.</span>
          </h2>

          <p className="font-body text-white/60 text-lg md:text-xl leading-relaxed max-w-2xl mb-10">
            <strong className="text-white">SPARKxYUG</strong> is a youth-first
            unisex streetwear brand built for the bold. Every drop is a
            statement. Every piece is a vibe. We don't follow trends — we are
            the trend.
          </p>

          <div className="grid grid-cols-3 gap-6 border-t border-[#1f1f1f] pt-10">
            {[
              { number: "100%", label: "Unisex Cuts" },
              { number: "6+", label: "Sizes Available" },
              { number: "∞", label: "Pure Energy" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="font-display font-800 text-3xl md:text-4xl text-[#a855f7] mb-1">
                  {stat.number}
                </div>
                <div className="font-body text-white/40 text-xs tracking-widest uppercase">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
