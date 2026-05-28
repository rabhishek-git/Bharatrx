import React from "react";
import { motion } from "motion/react";

export default function App() {
  // Classic physiological double-pulse heartbeat rhythm: "lub-dub"
  const heartBeatingScale = [1, 1.25, 1.1, 1.4, 1];
  const heartBeatingTimes = [0, 0.15, 0.28, 0.45, 1];

  return (
    <div
      id="app-viewport"
      className="fixed inset-0 bg-black flex flex-col items-center justify-center overflow-hidden select-none"
    >
      <div className="relative flex flex-col items-center justify-center gap-6">
        {/* Soft, synchronous ambient glow behind the heart */}
        <motion.div
          id="heart-glow"
          className="absolute w-64 h-64 bg-red-650/20 rounded-full blur-[65px] pointer-events-none"
          animate={{
            scale: heartBeatingScale,
            opacity: [0.15, 0.45, 0.25, 0.55, 0.15],
          }}
          transition={{
            duration: 1.1,
            repeat: Infinity,
            ease: "easeInOut",
            times: heartBeatingTimes,
          }}
        />

        {/* The high-precision beating heart SVG */}
        <motion.div
          id="beating-heart-element"
          animate={{
            scale: heartBeatingScale,
          }}
          transition={{
            duration: 1.1,
            repeat: Infinity,
            ease: "easeInOut",
            times: heartBeatingTimes,
          }}
        >
          <svg
            viewBox="0 0 100 100"
            className="w-48 h-48 sm:w-64 sm:h-64 drop-shadow-[0_0_35px_rgba(239,68,68,0.45)]"
            fill="url(#heart-gradient)"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <radialGradient id="heart-gradient" cx="30%" cy="30%" r="70%">
                <stop offset="0%" stopColor="#fca5a5" /> {/* Highlight point */}
                <stop offset="35%" stopColor="#ef4444" /> {/* Standard vibrant red */}
                <stop offset="100%" stopColor="#7f1d1d" /> {/* Deep medical blood red shadow */}
              </radialGradient>
            </defs>
            <path
              d="M 50 15 
                 C 35 -5, 0 0, 0 35 
                 C 0 65, 35 80, 50 95 
                 C 65 80, 100 65, 100 35 
                 C 100 0, 65 -5, 50 15 Z"
            />
          </svg>
        </motion.div>

        {/* Elegant Bharat-Rx Display Text */}
        <div className="flex flex-col items-center gap-2 mt-2">
          <motion.h1
            id="brand-name-display"
            className="font-display text-4xl sm:text-5xl font-light tracking-[0.12em] text-white/95 text-center drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          >
            BHARAT-<span className="font-semibold text-red-500">Rx</span>
          </motion.h1>

          {/* Understated 'Coming Soon' teaser tagline */}
          <motion.p
            id="coming-soon-label"
            className="font-display text-xs sm:text-sm font-light tracking-[0.3em] uppercase text-gray-500/80 text-center"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            vertical-align="middle"
            transition={{ duration: 1.0, ease: "easeOut", delay: 0.5 }}
          >
            Coming Soon
          </motion.p>
        </div>
      </div>
    </div>
  );
}
