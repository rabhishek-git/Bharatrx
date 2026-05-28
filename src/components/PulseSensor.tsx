import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Activity, ShieldCheck, RefreshCw, Cpu, Fingerprint } from "lucide-react";

interface PulseSensorProps {
  onScanComplete: (scannedBpm: number, systolic: number, diastolic: number, spO2: number) => void;
  currentBpm: number;
}

export default function PulseSensor({ onScanComplete, currentBpm }: PulseSensorProps) {
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [scanLogs, setScanLogs] = useState<string>("Sensor Idle - Awaiting Contact");
  const [selectedProfile, setSelectedProfile] = useState<"relax" | "normal" | "active">("normal");
  
  const scanIntervalRef = useRef<number | null>(null);

  const startScan = () => {
    if (isScanning) return;
    setIsScanning(true);
    setScanProgress(0);
    setScanLogs("Initializing PPG photodiode...");

    let progress = 0;
    const intervalTime = 40; // 40ms * 100 steps = 4 seconds total
    
    const logs = [
      "Initializing PPG photodiode...",
      "Calibrating optical pulse sensor...",
      "Emitting 525nm green wave light...",
      "Detecting microvascular volume changes...",
      "Measuring systolic pressure peak flow...",
      "Calculating ventricular cardiac interval...",
      "Filtering muscular artifact noise...",
      "Finalizing arterial vitals report..."
    ];

    scanIntervalRef.current = window.setInterval(() => {
      progress += 1;
      setScanProgress(progress);
      
      // Update logs cyclically based on progress percentage
      const logIdx = Math.min(Math.floor((progress / 100) * logs.length), logs.length - 1);
      setScanLogs(logs[logIdx]);

      if (progress >= 100) {
        clearInterval(scanIntervalRef.current!);
        setIsScanning(false);
        setScanLogs("Measurement verified!");

        // Determine raw simulated metrics based on selected state profile
        let scannedBpm = 72;
        let systolic = 120;
        let diastolic = 80;
        let spO2 = 98;

        if (selectedProfile === "relax") {
          scannedBpm = Math.floor(Math.random() * 8) + 57; // 57 - 64
          systolic = Math.floor(Math.random() * 6) + 106; // 106 - 111
          diastolic = Math.floor(Math.random() * 5) + 68; // 68 - 72
          spO2 = Math.floor(Math.random() * 2) + 98; // 98 - 99
        } else if (selectedProfile === "normal") {
          scannedBpm = Math.floor(Math.random() * 10) + 70; // 70 - 79
          systolic = Math.floor(Math.random() * 8) + 116; // 116 - 123
          diastolic = Math.floor(Math.random() * 5) + 76; // 76 - 80
          spO2 = Math.floor(Math.random() * 2) + 97; // 97 - 98
        } else if (selectedProfile === "active") {
          scannedBpm = Math.floor(Math.random() * 25) + 120; // 120 - 144
          systolic = Math.floor(Math.random() * 12) + 130; // 130 - 141
          diastolic = Math.floor(Math.random() * 6) + 82; // 82 - 87
          spO2 = Math.floor(Math.random() * 3) + 95; // 95 - 97
        }

        onScanComplete(scannedBpm, systolic, diastolic, spO2);
      }
    }, intervalTime);
  };

  const cancelScan = () => {
    if (scanIntervalRef.current) {
      clearInterval(scanIntervalRef.current);
    }
    setIsScanning(false);
    setScanProgress(0);
    setScanLogs("Measurement aborted by user.");
  };

  useEffect(() => {
    return () => {
      if (scanIntervalRef.current) clearInterval(scanIntervalRef.current);
    };
  }, []);

  return (
    <div id="pulse-sensor-container" className="bg-white rounded-3xl border border-teal-50/80 p-5 shadow-sm flex flex-col items-center justify-between h-full min-h-[460px]">
      <div className="w-full">
        <div className="flex items-center gap-2 mb-2">
          <div className="p-2 bg-red-50 text-red-600 rounded-xl">
            <Activity className="w-5 h-5 animate-pulse" />
          </div>
          <h2 className="text-lg font-bold text-gray-800 tracking-tight">Capacitive Vitals Scanner</h2>
        </div>
        <p className="text-xs text-gray-400 leading-normal">
          Check real-time PPG diagnostics. Choose a target state profile, then click the sensor to start scanning.
        </p>

        {/* Profile Tabs */}
        <div className="grid grid-cols-3 gap-1 bg-gray-50 p-1 rounded-xl mt-4 border border-gray-100/50">
          {(["relax", "normal", "active"] as const).map((prof) => (
            <button
              key={prof}
              disabled={isScanning}
              onClick={() => setSelectedProfile(prof)}
              className={`py-1.5 text-2xs font-bold rounded-lg transition-all capitalize ${
                selectedProfile === prof
                  ? "bg-teal-700 text-white shadow-xs"
                  : "text-gray-500 hover:text-gray-800 hover:bg-gray-100 disabled:opacity-50"
              }`}
            >
              {prof} {prof === "relax" ? "🧘" : prof === "normal" ? "🚶" : "🏃"}
            </button>
          ))}
        </div>
      </div>

      {/* Main Pulse Scanner Node */}
      <div className="relative my-7 flex items-center justify-center">
        {/* Animated radar rings while scanning */}
        <AnimatePresence>
          {isScanning && (
            <>
              <motion.div
                className="absolute inset-0 bg-teal-500/20 rounded-full w-32 h-32 -m-8"
                initial={{ scale: 0.6, opacity: 1 }}
                animate={{ scale: 1.5, opacity: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut" }}
              />
              <motion.div
                className="absolute inset-0 bg-emerald-400/20 rounded-full w-32 h-32 -m-8"
                initial={{ scale: 0.4, opacity: 1 }}
                animate={{ scale: 1.8, opacity: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.5, delay: 0.5, repeat: Infinity, ease: "easeOut" }}
              />
            </>
          )}
        </AnimatePresence>

        {/* The Fingerprint Interaction Node */}
        <button
          onClick={isScanning ? cancelScan : startScan}
          className={`relative z-10 w-28 h-28 rounded-full flex flex-col items-center justify-center border-4 transition-all focus:outline-none ${
            isScanning
              ? "bg-rose-50 border-rose-300 shadow-lg shadow-rose-100 text-rose-600 scale-95"
              : "bg-teal-50 border-teal-200 hover:scale-105 active:scale-95 shadow-md shadow-gray-100 text-teal-700"
          }`}
        >
          {isScanning ? (
            <div className="flex flex-col items-center">
              <RefreshCw className="w-9 h-9 animate-spin text-rose-500 mb-1" />
              <span className="text-[10px] font-bold uppercase tracking-wider text-rose-650">Cancel</span>
            </div>
          ) : (
            <div className="flex flex-col items-center select-none">
              <div className="relative">
                <Fingerprint className="w-12 h-12 text-teal-600" />
                {/* Simulated Laser sweep */}
                <span className="absolute left-0 right-0 h-0.5 bg-emerald-400 animate-bounce top-5" />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-teal-850 mt-1.5">TAP TO SCAN</span>
            </div>
          )}
        </button>
      </div>

      {/* Progress & Verification Logger */}
      <div className="w-full space-y-2.5">
        <div className="flex items-center justify-between text-2xs font-semibold text-gray-500">
          <span className="flex items-center gap-1">
            <Cpu className="w-3.5 h-3.5 text-teal-600" /> System Logs:
          </span>
          <span>{scanProgress}%</span>
        </div>

        {/* Dynamic Log line */}
        <div className="bg-gray-950/8 flex items-center justify-between p-3 rounded-xl border border-gray-100 font-mono text-[10px] h-[34px] text-gray-600 text-center leading-normal">
          <span className="truncate w-full font-medium">
            {isScanning ? "⚡ " : "● "} {scanLogs}
          </span>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
          <div
            className={`h-full transition-all duration-75 rounded-full ${
              isScanning ? "bg-emerald-500" : "bg-teal-650"
            }`}
            style={{ width: `${scanProgress}%` }}
          />
        </div>
      </div>
    </div>
  );
}
