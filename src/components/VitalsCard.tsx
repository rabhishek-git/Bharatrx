import { Activity, ShieldAlert, Heart, RefreshCw } from "lucide-react";
import { VitalMetrics } from "../types";

interface VitalsCardProps {
  vitals: VitalMetrics;
  onReset: () => void;
}

export default function VitalsCard({ vitals, onReset }: VitalsCardProps) {
  // Determine heart rate classification colors and text
  const getBpmClassification = (bpm: number) => {
    if (bpm < 60) return { label: "Mild Bradycardia (Resting/Atheletic)", color: "text-blue-605 bg-blue-50 border-blue-105" };
    if (bpm <= 90) return { label: "Normal Sinus Rhythm", color: "text-emerald-700 bg-emerald-50 border-emerald-100" };
    if (bpm <= 120) return { label: "Elevated Heart Rate (Mild Stress/Light Activity)", color: "text-amber-700 bg-amber-50/80 border-amber-100" };
    return { label: "Sinus Tachycardia (Active Workout)", color: "text-rose-700 bg-rose-50 border-rose-100" };
  };

  const bpmClass = getBpmClassification(vitals.bpm);

  return (
    <div id="vitals-card-root" className="bg-white rounded-3xl border border-teal-50/80 p-5 shadow-sm flex flex-col justify-between h-full min-h-[460px]">
      
      {/* Header section with diagnostic header */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-teal-50 text-teal-700 rounded-xl">
              <Heart className="w-5 h-5 text-teal-700" />
            </div>
            <h2 className="text-lg font-bold text-gray-800 tracking-tight">Active Cardio Diagnostics</h2>
          </div>
          <button
            onClick={onReset}
            title="Reset metrics to baseline"
            className="p-1 px-2 text-xs font-semibold bg-gray-55/60 text-gray-500 rounded-lg hover:bg-gray-100 border border-gray-100/50 flex items-center gap-1.5 transition-colors focus:ring-0"
          >
            <RefreshCw className="w-3.5 h-3.5" /> Reset
          </button>
        </div>
        <p className="text-xs text-gray-400 leading-normal">
          Optical PPG and pressure metrics streams. Synced and updated on-demand.
        </p>

        {/* Dynamic HR Classification Alert */}
        <div className={`mt-4 border p-3 rounded-2xl flex items-center gap-2.5 transition-all ${bpmClass.color}`}>
          <ShieldAlert className="w-4 h-4 shrink-0" />
          <span className="text-2xs font-bold uppercase tracking-wider leading-normal">
            Status: {bpmClass.label}
          </span>
        </div>
      </div>

      {/* Main Grid Metrics Block */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-4">
        
        {/* Metric 1: BPM */}
        <div className="bg-rose-50/30 border border-rose-100/30 rounded-2xl p-4 flex flex-col justify-between items-center text-center relative overflow-hidden">
          <span className="text-[10px] uppercase font-bold text-rose-700/80 tracking-wider">Heart Rate</span>
          <div className="my-2.5">
            <span className="text-4xl font-extrabold text-rose-600 tracking-tight block">
              {vitals.bpm}
            </span>
            <span className="text-[9px] font-semibold text-rose-500 uppercase block tracking-widest mt-0.5">Beats / Min</span>
          </div>
          <div className="flex gap-0.5 h-3 items-end justify-center w-full mt-1">
            <span className="w-0.5 bg-rose-200/40 rounded-full h-1 animate-pulse" />
            <span className="w-0.5 bg-rose-450 rounded-full h-2.5 animate-pulse" style={{ animationDelay: "0.2s" }} />
            <span className="w-0.5 bg-rose-300 rounded-full h-1.5 animate-pulse" style={{ animationDelay: "0.4s" }} />
            <span className="w-0.5 bg-rose-500 rounded-full h-2 animate-pulse" style={{ animationDelay: "0.1s" }} />
            <span className="w-0.5 bg-rose-200 rounded-full h-1 animate-pulse" style={{ animationDelay: "0.5s" }} />
          </div>
        </div>

        {/* Metric 2: Blood Pressure */}
        <div className="bg-teal-50/20 border border-teal-100/30 rounded-2xl p-4 flex flex-col justify-between items-center text-center">
          <span className="text-[10px] uppercase font-bold text-teal-850 tracking-wider">Blood Pressure</span>
          <div className="my-2.5">
            <span className="text-4xl font-extrabold text-teal-800 tracking-tight block leading-none">
              {vitals.systolic}<span className="text-lg text-teal-600/60 font-medium">/</span>{vitals.diastolic}
            </span>
            <span className="text-[9px] font-semibold text-teal-600 uppercase block tracking-widest mt-2">mmHg (Arterial)</span>
          </div>
          <span className="text-[10px] font-bold text-teal-805/70 bg-teal-50 px-1.5 py-0.5 rounded-full border border-teal-100/30">
            {vitals.systolic <= 120 ? "Perfect" : vitals.systolic <= 139 ? "Prehypertension" : "Attentive"}
          </span>
        </div>

        {/* Metric 3: Oxygen SpO2 */}
        <div className="bg-emerald-50/20 border border-emerald-100/30 rounded-2xl p-4 flex flex-col justify-between items-center text-center">
          <span className="text-[10px] uppercase font-bold text-emerald-800 tracking-wider">Oxygen (SpO2)</span>
          <div className="my-2.5">
            <span className="text-4xl font-extrabold text-emerald-700 tracking-tight block">
              {vitals.spO2}%
            </span>
            <span className="text-[9px] font-semibold text-emerald-500 uppercase block tracking-widest mt-0.5">Capillary Sat</span>
          </div>
          <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-1.5 py-0.5 rounded-full border border-emerald-100/30">
            Optimal Range
          </span>
        </div>

      </div>

      {/* Wellness Index and dynamic diagnostic message */}
      <div className="bg-gray-50 border border-gray-100 rounded-2xl p-3.5 space-y-1">
        <div className="flex items-center justify-between text-2xs mb-1">
          <span className="text-gray-400 font-bold uppercase tracking-wider">Arterial Wellness Index:</span>
          <span className="text-teal-800 font-extrabold uppercase bg-teal-50 border border-teal-100 px-2 py-0.5 rounded-full">
            Score: {vitals.score}/100
          </span>
        </div>
        <p className="text-[11px] text-gray-550 leading-relaxed font-sans">
          {vitals.bpm < 60 ? (
            "Excellent heart efficiency observed. Slow, deep beats reflect robust cardiac stroke volume, commonly seen in athletic states or calm meditation."
          ) : vitals.bpm <= 90 ? (
            "Physiological metrics are exceptionally steady. Pulse wave distribution is well-aligned with standard medical baselines, showing resting homeostatic balance."
          ) : vitals.bpm <= 120 ? (
            "Elevated state. Mild active stress pattern detected. Ensure adequate hydration, deep breathing exercises, and follow up with a relaxing pulse scan."
          ) : (
            "Dynamic active cardio workout zone. Your system is pumping oxygenated flow actively. Excellent for endurance training, keep monitored."
          )}
        </p>
      </div>
    </div>
  );
}
