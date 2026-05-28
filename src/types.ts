export interface VitalMetrics {
  bpm: number;
  systolic: number;
  diastolic: number;
  spO2: number;
  heartRateState: "Resting" | "Normal" | "Elevated" | "High Tachycardia";
  score: number;
}

export interface Medicine {
  id: string;
  name: string;
  genericName: string;
  category: string;
  dosage: string;
  schedule: string; // e.g. "Schedule HRx (Prescription Only)"
  purpose: string;
  frequency: string;
  sideEffects: string[];
}

export interface PrescriptionScanResult {
  patientName: string;
  date: string;
  age: string;
  gender: string;
  diagnosedCondition: string;
  medicines: {
    name: string;
    dosage: string;
    frequency: string;
    duration: string;
  }[];
  issuerDoctor: string;
  verified: boolean;
}
