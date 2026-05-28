import { motion } from "motion/react";

interface BharatRxLogoProps {
  bpm?: number;
  interactive?: boolean;
}

export default function BharatRxLogo({ bpm = 72, interactive = false }: BharatRxLogoProps) {
  // Translate BPM to visual duration: e.g. 72 bpm = 0.833s per beat
  const beatDuration = 60 / bpm;

  // Real "lub-dub" double pulse rhythm keyframes for heart scale
  const heartBeatingScale = [1, 1.15, 1.05, 1.25, 1];
  const heartBeatingTimes = [0, 0.15, 0.3, 0.45, 1];

  return (
    <div id="bharat-rx-logo-container" className="relative flex flex-col items-center justify-center p-4">
      {/* SVG Vector Logo */}
      <svg
        id="bharat-rx-svg"
        viewBox="0 0 400 420"
        className="w-full max-w-[320px] sm:max-w-[380px] h-auto drop-shadow-md select-none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* === SHACKLE / OPEN LOCK (Teal-Green) === */}
        {/* Starts on the left edge of the capsule, goes up, curves right, opens downwards */}
        <path
          d="M 148 215 C 148 110, 230 110, 230 160"
          stroke="#0d6f72"
          strokeWidth="24"
          strokeLinecap="round"
          fill="none"
        />

        {/* === MAIN CAPSULE BODY (Teal-Green) === */}
        {/* A pill shape curved beautifully at the bottom, with a notched connection for the heart */}
        <rect
          x="122"
          y="195"
          width="96"
          height="124"
          rx="48"
          fill="#0d6f72"
        />

        {/* White pill junction cutout accent to separate lock body and heart visually */}
        <path
          d="M 218 205 C 190 205, 190 235, 162 235"
          stroke="#FFFFFF"
          strokeWidth="10"
          strokeLinecap="round"
          fill="none"
          className="opacity-95"
        />

        {/* === RED HEART WITH LOOPING BEAT === */}
        {/* Wrapped in motion.g with standard physiological "lub-dub" heartbeat keyframes */}
        <motion.g
          id="beating-heart-mark"
          style={{
            transformOrigin: "250px 225px", // Center of the red heart mark
          }}
          animate={{
            scale: heartBeatingScale,
          }}
          transition={{
            duration: beatDuration,
            repeat: Infinity,
            ease: "easeInOut",
            times: heartBeatingTimes,
          }}
        >
          {/* Main Heart Shape Path */}
          <path
            d="M 250 205 
               C 230 155, 175 160, 175 210 
               C 175 255, 250 305, 250 305 
               C 250 305, 325 255, 325 210 
               C 325 160, 270 155, 250 205 Z"
            fill="#e11d48" // Rich Medical Red
          />

          {/* Heart white border separation overlay */}
          <path
            d="M 250 205 
               C 230 155, 175 160, 175 210"
            stroke="#FFFFFF"
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
            className="opacity-20"
          />

          {/* Glossy highlight/glow on the upper-right lobe of the heart */}
          <path
            d="M 285 180 A 18 18 0 0 1 310 205"
            stroke="#FFFFFF"
            strokeWidth="6"
            strokeLinecap="round"
            className="opacity-30"
            fill="none"
          />
        </motion.g>

        {/* === MEDICINE PLUS CROSS (White, inside teal capsule) === */}
        <path
          d="M 152 257 H 188 M 170 239 V 275"
          stroke="#FFFFFF"
          strokeWidth="11"
          strokeLinecap="round"
          fill="none"
        />

        {/* === BRAND TEXT LABEL: BHARAT-Rx === */}
        {/* Recreating elegant sans-serif lettering in specific brand teal */}
        <text
          x="200"
          y="355"
          textAnchor="middle"
          fill="#0d6f72"
          className="font-sans font-extrabold tracking-[0.06em]"
          style={{ fontSize: "38px", fontFamily: 'system-ui, -apple-system, sans-serif' }}
        >
          BHARAT-Rx
        </text>

        {/* === ECG / LUB-DUB PULSE WAVE LINE === */}
        {/* Standard flat-line base with small P, high QRS, and sharp T waves */}
        <g id="ecg-line-layer">
          {/* Base Teal ECG Track */}
          <path
            id="ecg-track"
            d="M 50 380 L 165 380 L 171 383 L 176 376 L 180 380 L 186 380 L 191 398 L 198 335 L 206 405 L 211 380 L 219 380 L 225 372 L 232 380 L 350 380"
            stroke="#0d6f72"
            strokeWidth="4.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />

          {/* ECG Line Ends Dots */}
          <circle cx="50" cy="380" r="5" fill="#0d6f72" />
          <circle cx="350" cy="380" r="5" fill="#0d6f72" />

          {/* Glowing Animated Pulse Signal traveling the path in sync with heartbeats */}
          <motion.circle
            r="4.5"
            fill="#34d399" // Emerald glowing core
            className="shadow-lg shadow-emerald-400"
            animate={{
              cx: [
                50, 165, 171, 176, 180, 186, 191, 198, 206, 211, 219, 225, 232, 350
              ],
              cy: [
                380, 380, 383, 376, 380, 380, 398, 335, 405, 380, 380, 372, 380, 380
              ]
            }}
            transition={{
              duration: beatDuration,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        </g>
      </svg>
    </div>
  );
}
