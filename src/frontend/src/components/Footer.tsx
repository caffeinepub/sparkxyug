import { SiInstagram, SiX } from "react-icons/si";

export default function Footer() {
  const year = new Date().getFullYear();
  const utmLink = `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`;

  return (
    <footer className="bg-[#080808] border-t border-[#1f1f1f] py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-10">
          {/* Logo + tagline */}
          <div className="text-center md:text-left">
            <div className="font-display font-800 text-2xl tracking-[0.3em] uppercase text-white mb-1">
              SPARK<span className="text-[#a855f7]">x</span>YUG
            </div>
            <p className="font-body text-white/30 text-xs tracking-widest uppercase">
              No rules. Pure vibe.
            </p>
          </div>

          {/* Nav links */}
          <div className="flex items-center gap-6">
            {["Home", "Tees", "Hoodies", "About"].map((item) => (
              <span
                key={item}
                className="font-body text-white/30 hover:text-white/70 text-sm tracking-wider uppercase cursor-pointer transition-colors"
              >
                {item}
              </span>
            ))}
          </div>

          {/* Socials */}
          <div className="flex items-center gap-4">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="w-10 h-10 rounded-sm border border-[#1f1f1f] flex items-center justify-center text-white/40 hover:text-[#a855f7] hover:border-[#a855f7]/40 transition-all"
            >
              <SiInstagram className="w-4 h-4" />
            </a>
            <a
              href="https://x.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="X / Twitter"
              className="w-10 h-10 rounded-sm border border-[#1f1f1f] flex items-center justify-center text-white/40 hover:text-[#a855f7] hover:border-[#a855f7]/40 transition-all"
            >
              <SiX className="w-4 h-4" />
            </a>
          </div>
        </div>

        <div className="border-t border-[#1f1f1f] pt-8 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="font-body text-white/20 text-xs tracking-wider">
            © {year} SPARKxYUG. All rights reserved.
          </p>
          <p className="font-body text-white/20 text-xs">
            Built with ❤️ using{" "}
            <a
              href={utmLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#a855f7]/50 hover:text-[#a855f7] transition-colors"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
