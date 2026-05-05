import { createContext, useContext, useState } from "react";

interface StepContextType {
  step: number;
  nextStep: () => void;
  prevStep: () => void;
  setStep: (step: number) => void;
}

const StepContext = createContext<StepContextType | null>(null);

export function StepProvider({ children }: { children: React.ReactNode }) {
  const [step, setStep] = useState(1);

  function nextStep() {
    setStep((prev) => prev + 1);
  }

  function prevStep() {
    setStep((prev) => prev - 1);
  }

  return (
    <StepContext.Provider value={{ step, nextStep, prevStep, setStep }}>
      {children}
    </StepContext.Provider>
  );
}

export function useStep() {
  const context = useContext(StepContext);

  if (!context) {
    throw new Error("useStep must be used within StepProvider");
  }

  return context;
}
