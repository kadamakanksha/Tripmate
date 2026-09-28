import React, { useEffect, useState } from 'react';

interface GenerationProgressProps {
  destination: string;
  days: number;
  backendUrl: string;
}

export const GenerationProgress: React.FC<GenerationProgressProps> = ({
  destination,
  days,
  backendUrl,
}) => {
  const [percent, setPercent] = useState(15);
  const [step, setStep] = useState(1);

  useEffect(() => {
    const timer1 = setTimeout(() => {
      setPercent(42);
      setStep(2);
    }, 600);

    const timer2 = setTimeout(() => {
      setPercent(78);
      setStep(3);
    }, 1400);

    const timer3 = setTimeout(() => {
      setPercent(95);
    }, 2400);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  return (
    <div className="w-full max-w-2xl mx-auto bg-[#eaedff] rounded-3xl p-5 md:p-6 shadow-md border border-[#bfc7d2]/30 space-y-4 animate-in fade-in duration-300">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#006194] flex items-center justify-center text-white shadow-xs">
            <span className="material-symbols-outlined text-[20px] animate-pulse">
              psychology
            </span>
          </div>
          <div>
            <h3 className="text-base font-bold text-[#131b2e]">Crafting Your Route</h3>
            <p className="text-xs text-[#3f4850]">
              {destination} {days}-Day Adventure
            </p>
          </div>
        </div>
        <span className="text-base font-extrabold text-[#006194] tabular-nums">{percent}%</span>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-white h-2.5 rounded-full overflow-hidden shadow-inner">
        <div
          className="bg-gradient-to-r from-[#006194] to-[#006a61] h-full rounded-full transition-all duration-500 ease-out"
          style={{ width: `${percent}%` }}
        />
      </div>

      {/* Checklist items */}
      <div className="space-y-2 pt-1 text-xs">
        <div className="flex items-center gap-2 font-semibold text-[#006194]">
          <span className="material-symbols-outlined text-[16px] text-[#006194]">
            {step >= 1 ? 'check_circle' : 'hourglass_empty'}
          </span>
          <span>Analyzing crowd density & scenic pathways</span>
        </div>

        <div
          className={`flex items-center gap-2 font-semibold ${
            step >= 2 ? 'text-[#006a61]' : 'text-[#707881] opacity-70'
          }`}
        >
          <span
            className={`material-symbols-outlined text-[16px] ${
              step === 2 ? 'animate-spin text-[#006a61]' : step > 2 ? 'text-[#006a61]' : ''
            }`}
          >
            {step > 2 ? 'check_circle' : step === 2 ? 'refresh' : 'hourglass_empty'}
          </span>
          <span>Pairing top matcha cafes & regional food spots</span>
        </div>

        <div
          className={`flex items-center gap-2 font-semibold ${
            step >= 3 ? 'text-[#006194]' : 'text-[#707881] opacity-70'
          }`}
        >
          <span
            className={`material-symbols-outlined text-[16px] ${
              step >= 3 ? 'animate-spin text-[#006194]' : ''
            }`}
          >
            {step >= 3 ? 'refresh' : 'hourglass_empty'}
          </span>
          <span>Optimizing daily transit times & scenic schedule</span>
        </div>
      </div>

      <div className="pt-2 border-t border-[#bfc7d2]/20 flex items-center justify-between text-[11px] text-[#3f4850]">
        <span className="flex items-center gap-1 truncate">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping inline-block mr-1" />
          Requesting {backendUrl}/?trip=...
        </span>
        <span className="text-[#006194] font-medium">TripMate Engine</span>
      </div>
    </div>
  );
};
