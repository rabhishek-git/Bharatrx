import { useState, useMemo } from "react";
import { Search, Pill, ShieldAlert, BookOpen, ChevronRight, Activity, Info } from "lucide-react";
import { Medicine } from "../types";

const POPULAR_MEDICINES: Medicine[] = [
  {
    id: "med-1",
    name: "Crocin Advance",
    genericName: "Paracetamol (500mg)",
    category: "Analgesic & Antipyretic",
    dosage: "500–650 mg orally",
    schedule: "Over The Counter (OTC)",
    purpose: "Provides rapid relief from pain, fever, headaches, and minor body aches.",
    frequency: "Every 4–6 hours as needed (Max 4g/day)",
    sideEffects: ["Nausea in rare cases", "Liver strain with excessive usage", "Skin rashes if allergic"]
  },
  {
    id: "med-2",
    name: "Metformin Glycomet",
    genericName: "Metformin Hydrochloride (500mg)",
    category: "Anti-Diabetic Agent",
    dosage: "500 mg once or twice daily with meals",
    schedule: "Schedule G / prescription only",
    purpose: "Improves insulin sensitivity and assists in managing plasma glucose levels in Type 2 Diabetes.",
    frequency: "With breakfast and/or evening meals",
    sideEffects: ["Mild bloating/gas", "Lactic acidosis (extremely rare)", "Metallic taste in mouth"]
  },
  {
    id: "med-3",
    name: "Pantocid-40",
    genericName: "Pantoprazole Sodium (40mg)",
    category: "Proton Pump Inhibitor (Gastric Antacid)",
    dosage: "40 mg once daily",
    schedule: "Schedule H prescription drug",
    purpose: "Reduces stomach acid production. Used for treating acidity, GERD, and gastric ulcers.",
    frequency: "Take 30–60 minutes before breakfast (Empty stomach)",
    sideEffects: ["Headache", "Abdominal pain", "Mild vertigo", "Vitamin B12 absorption decrease in long-term use"]
  },
  {
    id: "med-4",
    name: "Okacet (Cetirizine)",
    genericName: "Cetirizine Dihydrochloride (10mg)",
    category: "Second-Generation Antihistamine",
    dosage: "5 mg to 10 mg daily",
    schedule: "Schedule H prescription drug",
    purpose: "Relieves allergic rhinitis, watery eyes, sneezing, runny nose, and hives.",
    frequency: "Once daily, preferably before bedtime due to mild sedative properties",
    sideEffects: ["Drowsiness/Somnolence", "Dry mouth", "Fatigue"]
  },
  {
    id: "med-5",
    name: "Telma-40 (Telmisartan)",
    genericName: "Telmisartan (40mg)",
    category: "Angiotensin II Receptor Blocker (Antihypertensive)",
    dosage: "40 mg once daily",
    schedule: "Schedule H prescription drug",
    purpose: "Saves cardiac function and dilates blood vessels to treat high blood pressure.",
    frequency: "Once daily, at the exact same time each day (Morning preferred)",
    sideEffects: ["Dizziness", "Lower blood pressure upon standing", "Sinus muscle fatigue"]
  },
  {
    id: "med-6",
    name: "Amoxyclav 625",
    genericName: "Amoxicillin Trihydrate (500mg) + Clavulanic Acid (125mg)",
    category: "Broad Spectrum Antibiotic",
    dosage: "625 mg twice or thrice daily",
    schedule: "Schedule H1 prescription drug (restricted use)",
    purpose: "Combats a wide array of bacterial infections including respiratory tract, dental, and urinary tract infections.",
    frequency: "Take after food on regular intervals to prevent bacterial resistance",
    sideEffects: ["Diarrhea/Stomach upset", "Oral thrush", "Skin hypersensitivity"]
  },
  {
    id: "med-7",
    name: "Montair-LC",
    genericName: "Montelukast (10mg) + Levocetirizine (5mg)",
    category: "Combination Bronchodilator & Antihistamine",
    dosage: "One tablet daily",
    schedule: "Schedule H prescription drug",
    purpose: "Used to manage allergic asthma, seasonal allergies, allergic rhinitis, and breathing issues.",
    frequency: "Once daily in the evening",
    sideEffects: ["Somnolence", "Headache", "Dry throat", "Mood fluctuations in rare cases"]
  }
];

export default function MedicineFinder() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedId, setSelectedId] = useState<string>("med-1");

  const filteredMedicines = useMemo(() => {
    if (!searchTerm.trim()) return POPULAR_MEDICINES;
    return POPULAR_MEDICINES.filter(
      (m) =>
        m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        m.genericName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        m.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  const selectedMed = useMemo(() => {
    return POPULAR_MEDICINES.find((m) => m.id === selectedId) || POPULAR_MEDICINES[0];
  }, [selectedId]);

  return (
    <div id="medicine-finder-root" className="bg-white rounded-3xl border border-teal-50/80 p-5 shadow-sm flex flex-col h-full min-h-[480px]">
      <div id="finder-header" className="mb-4">
        <div className="flex items-center gap-2 mb-2">
          <div className="p-2 bg-teal-50 text-teal-700 rounded-xl">
            <Pill className="w-5 h-5" id="pill-logo-svg" />
          </div>
          <h2 className="text-lg font-bold text-gray-800 tracking-tight">Bharat-Rx Pharmacopoeia</h2>
        </div>
        <p className="text-xs text-gray-500 leading-normal">
          Lookup genuine composition records, classification info, and dosage guidelines.
        </p>
      </div>

      {/* Search Input */}
      <div id="search-box" className="relative mb-4">
        <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
        <input
          type="text"
          placeholder="Search e.g. Crocin, Metformin, Acidity..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-9 pr-4 py-2 text-sm bg-gray-55/60 border border-gray-100 rounded-xl focus:outline-none focus:border-teal-400 focus:bg-white text-gray-700 transition-colors"
        />
      </div>

      {/* Main Split Layout */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 overflow-hidden flex-1">
        
        {/* Left column list */}
        <div id="medicine-list-col" className="md:col-span-2 overflow-y-auto space-y-1.5 max-h-[220px] md:max-h-[320px] pr-1 scrollbar-thin">
          {filteredMedicines.length === 0 ? (
            <div className="py-8 text-center text-xs text-gray-400">
              No medical formulations found match query.
            </div>
          ) : (
            filteredMedicines.map((med) => (
              <button
                key={med.id}
                onClick={() => setSelectedId(med.id)}
                className={`w-full text-left p-3 rounded-xl transition-all border flex items-center justify-between ${
                  selectedId === med.id
                    ? "bg-teal-50/50 border-teal-100 text-teal-950 focus:ring-0"
                    : "bg-gray-50/30 border-transparent hover:bg-gray-50 hover:border-gray-100 text-gray-700"
                }`}
              >
                <div className="overflow-hidden pr-2">
                  <div className="text-sm font-semibold truncate leading-tight">{med.name}</div>
                  <div className="text-[10px] text-gray-500 truncate mt-0.5">{med.category}</div>
                </div>
                <ChevronRight className={`w-4 h-4 shrink-0 transition-transform ${selectedId === med.id ? "text-teal-600 translate-x-0.5" : "text-gray-300"}`} />
              </button>
            ))
          )}
        </div>

        {/* Right column detailed information card */}
        <div id="medicine-detail-col" className="md:col-span-3 bg-gray-50/40 border border-gray-50 rounded-2xl p-4 flex flex-col justify-between overflow-y-auto max-h-[320px] md:max-h-[320px] scrollbar-thin">
          {selectedMed && (
            <div className="space-y-3.5">
              <div>
                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-sm font-bold text-gray-900">{selectedMed.name}</h3>
                  <span className="text-[9px] font-semibold bg-amber-50 text-amber-700 border border-amber-100 px-1.5 py-0.5 rounded-full uppercase tracking-wider shrink-0">
                    {selectedMed.schedule.split(" ")[0]}
                  </span>
                </div>
                <p className="text-[11px] font-mono text-teal-700 mt-1">{selectedMed.genericName}</p>
              </div>

              {/* Classification & Purpose */}
              <div className="bg-white rounded-xl p-3 border border-gray-100/50 space-y-1.5">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-gray-800">
                  <BookOpen className="w-3.5 h-3.5 text-teal-600" />
                  <span>Clinical Indication</span>
                </div>
                <p className="text-xs text-gray-650 leading-relaxed font-sans">{selectedMed.purpose}</p>
              </div>

              {/* Dosage information */}
              <div className="grid grid-cols-2 gap-2 text-[11px]">
                <div className="bg-white p-2.5 rounded-xl border border-gray-100/50">
                  <span className="text-gray-400 block font-medium">Usual Dosage</span>
                  <span className="text-gray-700 font-semibold">{selectedMed.dosage}</span>
                </div>
                <div className="bg-white p-2.5 rounded-xl border border-gray-100/50">
                  <span className="text-gray-400 block font-medium">Frequency</span>
                  <span className="text-teal-900 font-semibold">{selectedMed.frequency}</span>
                </div>
              </div>

              {/* Safety & Precautions */}
              <div className="space-y-1.5">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-amber-900">
                  <ShieldAlert className="w-3.5 h-3.5 text-amber-600" />
                  <span>Potential Side-Effects</span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {selectedMed.sideEffects.map((effect, idx) => (
                    <span key={idx} className="bg-rose-50 text-rose-700 border border-rose-100/40 px-2 py-0.5 rounded text-[10px] font-medium leading-tight">
                      • {effect}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}
          <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-[9px] text-gray-400 italic">
            <span className="flex items-center gap-1">
              <Info className="w-3 h-3" /> Note: This is simulated guidance.
            </span>
            <span>Ref: BHARAT-Rx DB</span>
          </div>
        </div>

      </div>
    </div>
  );
}
