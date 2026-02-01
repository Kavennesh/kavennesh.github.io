import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

type IntroLoaderProps = {
  show: boolean;
  onDone: () => void;
};

const tagLine = `"If you wanna crack a system, first understand the system."`;

export default function IntroLoader({ show, onDone }: IntroLoaderProps) {
  useEffect(() => {
    if (!show) return;
    const t = setTimeout(onDone, 5000); // ✅ total intro duration (8s)
    return () => clearTimeout(t);
  }, [show, onDone]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* animated grid glow */}
          <motion.div
            className="absolute inset-0 opacity-30"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.35 }}
            exit={{ opacity: 0 }}
            style={{
              backgroundImage:
                "radial-gradient(circle at 20% 20%, rgba(168,85,247,0.35) 0, transparent 40%), radial-gradient(circle at 80% 60%, rgba(59,130,246,0.25) 0, transparent 45%), linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
              backgroundSize: "100% 100%, 100% 100%, 60px 60px, 60px 60px",
              backgroundPosition: "center, center, center, center",
            }}
          />

          {/* center content */}
          <div className="relative max-w-3xl mx-auto px-6 text-center">
            {/* avatar + rotating ring */}
            <motion.div
              className="relative mx-auto mb-8 h-28 w-28 rounded-full"
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              {/* rotating ring */}
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-purple-400/60"
                initial={{ rotate: 0 }}
                animate={{ rotate: 360 }}
                transition={{ duration: 1.3, repeat: Infinity, ease: "linear" }}
              />

              {/* glow ring */}
              <div className="absolute -inset-2 rounded-full bg-purple-500/10 blur-xl" />

              {/* avatar */}
              <div className="absolute inset-[6px] rounded-full overflow-hidden border border-white/15 bg-white/5">
                <img
                  src="/favicon.jpeg"
                  alt="Kavennesh"
                  className="h-full w-full object-cover"
                  loading="eager"
                />
              </div>
            </motion.div>

            <motion.h1
              className="text-4xl md:text-6xl font-extrabold text-white tracking-tight"
              initial={{ y: 18, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              Kavennesh<span className="text-purple-400">.</span>
            </motion.h1>

            <motion.p
              className="mt-5 text-base md:text-lg text-gray-300"
              initial={{ y: 18, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
            >
              {tagLine}
            </motion.p>

            {/* boot line */}
            <motion.div
              className="mt-8 mx-auto w-fit rounded-full border border-white/10 bg-white/5 px-5 py-2 text-sm text-gray-200"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.35 }}
            >
              Initializing portfolio<span className="ml-1 animate-pulse">…</span>
            </motion.div>

            {/* Circuit pulse / signal traveling */}
            <div className="mt-7 w-full max-w-md mx-auto">
              {/* status text */}
              <motion.p
                className="mb-3 text-xs md:text-sm text-gray-300 tracking-[0.25em] uppercase text-center"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
              >
                Establishing secure channel…
              </motion.p>

              <div className="relative h-10 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md overflow-hidden">
                {/* faint scanline/glitch overlay */}
                <motion.div
                  className="absolute inset-0 opacity-30"
                  initial={{ opacity: 0.1 }}
                  animate={{ opacity: [0.08, 0.18, 0.1] }}
                  transition={{ duration: 1.2, repeat: Infinity }}
                  style={{
                    backgroundImage:
                      "repeating-linear-gradient(0deg, rgba(255,255,255,0.06) 0px, rgba(255,255,255,0.06) 1px, transparent 1px, transparent 6px)",
                    mixBlendMode: "overlay",
                  }}
                />

                {/* circuit traces (SVG) */}
                <svg
                  className="absolute inset-0 w-full h-full"
                  viewBox="0 0 420 80"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M10 20 H90 V40 H160 V18 H230 V58 H320 V30 H410"
                    stroke="rgba(168,85,247,0.35)"
                    strokeWidth="2"
                    fill="none"
                  />
                  <path
                    d="M10 58 H70 V30 H150 V62 H210 V34 H300 V52 H410"
                    stroke="rgba(59,130,246,0.28)"
                    strokeWidth="2"
                    fill="none"
                  />

                  {[
                    [90, 40],
                    [160, 18],
                    [230, 58],
                    [320, 30],
                    [70, 30],
                    [150, 62],
                    [210, 34],
                    [300, 52],
                  ].map(([x, y], idx) => (
                    <circle
                      key={idx}
                      cx={x}
                      cy={y}
                      r="4"
                      fill="rgba(255,255,255,0.10)"
                      stroke="rgba(255,255,255,0.18)"
                    />
                  ))}
                </svg>

                {/* pulsing signal dot traveling */}
                <motion.div
                  className="absolute top-1/2 -translate-y-1/2 h-3 w-3 rounded-full"
                  style={{
                    background:
                      "radial-gradient(circle, rgba(34,211,238,1) 0%, rgba(34,211,238,0.25) 60%, transparent 70%)",
                    boxShadow: "0 0 18px rgba(34,211,238,0.9)",
                  }}
                  initial={{ x: 10 }}
                  animate={{ x: [10, 380] }}
                  transition={{ duration: 1.1, repeat: Infinity, ease: "linear" }}
                />

                {/* progress fill (match intro duration) */}
                <motion.div
                  className="absolute inset-0"
                  style={{
                    transformOrigin: "left",
                    background:
                      "linear-gradient(90deg, rgba(168,85,247,0.35), rgba(59,130,246,0.35))",
                  }}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 4.0, ease: "easeInOut" }}
                />

                {/* glitch tick (tiny shake) */}
                <motion.div
                  className="absolute inset-0"
                  animate={{ x: [0, -1, 1, 0], opacity: [1, 0.85, 1] }}
                  transition={{ duration: 0.55, repeat: Infinity, repeatDelay: 2.0 }}
                  style={{ pointerEvents: "none" }}
                />
              </div>

              {/* bottom micro text */}
              <motion.div
                className="mt-3 text-[10px] md:text-xs text-gray-400 text-center font-mono"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.150 }}
              >
                handshake → auth → tunnel → sync
              </motion.div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
