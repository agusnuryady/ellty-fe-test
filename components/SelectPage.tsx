'use client';

import { useState, useMemo } from 'react';
import confetti from 'canvas-confetti';
import { CustomCheckbox } from './CustomCheckBox';

interface SelectPagesProps {
  pages: string[];
}

export function SelectPages({ pages }: SelectPagesProps) {
  const initialState = useMemo(
    () => Object.fromEntries(pages.map((p) => [p, false])),
    [pages],
  );

  const [checked, setChecked] = useState<Record<string, boolean>>(initialState);
  const [isAnimating, setIsAnimating] = useState(false);

  const allChecked = pages.every((p) => checked[p]);
  const anyChecked = pages.some((p) => checked[p]);

  const toggleAll = () => {
    const updated = Object.fromEntries(pages.map((p) => [p, !allChecked]));
    setChecked(updated);
  };

  const toggleOne = (page: string) => {
    setChecked((prev) => ({ ...prev, [page]: !prev[page] }));
  };

  const triggerDoneAnimation = () => {
    if (!anyChecked) return;

    setIsAnimating(true);

    setTimeout(() => {
      setIsAnimating(false);
    }, 500); // matches burst animation duration

    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
    });
  };

  return (
    <div className="w-full max-w-[370px] bg-white border border-[#EEEEEE] rounded-md py-2.5 mx-auto [box-shadow:0px_8px_15px_0px_#1414141F,0px_0px_4px_0px_#1414141A]">
      {/* All Pages */}
      <div className="flex items-center justify-between py-2 pl-[22px] pr-[15px]">
        <span className="font-normal text-sm text-[#281f1f]">All pages</span>
        <CustomCheckbox value={allChecked} onChange={toggleAll} />
      </div>

      {/* Divider */}
      <div className="w-full px-[15px] py-2.5">
        <div className="border-b border-[#CDCDCD] w-full"></div>
      </div>

      {/* Page Items */}
      <div>
        {pages.map((p) => (
          <div
            key={p}
            className="flex items-center justify-between py-2 pl-[22px] pr-[15px]"
          >
            <span className="text-gray-700">{p}</span>
            <CustomCheckbox value={checked[p]} onChange={() => toggleOne(p)} />
          </div>
        ))}
      </div>

      {/* Divider */}
      <div className="w-full px-[15px] py-2.5">
        <div className="border-b border-[#CDCDCD] w-full"></div>
      </div>

      {/* Done Button */}
      <div className="relative w-full px-[15px] py-2.5 flex justify-center">
        {/* Burst animation */}
        {isAnimating && (
          <div
            className="absolute w-20 h-20 rounded-full bg-[#FFD84D] opacity-40"
            style={{
              animation: 'burst 0.5s ease-out forwards',
            }}
          />
        )}

        <button
          disabled={!anyChecked}
          onClick={triggerDoneAnimation}
          className={`w-full font-normal text-sm py-2 rounded-sm transition relative z-10
            ${
              anyChecked
                ? 'bg-[#FFCE22] hover:bg-[#FFD84D] text-gray-800 cursor-pointer'
                : 'bg-gray-300 text-gray-400 cursor-not-allowed'
            }
            ${isAnimating ? 'animate-[btn-pop_0.25s_ease]' : ''}
          `}
        >
          Done
        </button>
      </div>
    </div>
  );
}
