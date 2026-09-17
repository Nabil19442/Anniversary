import React, { useRef, useEffect } from 'react';
import { memories } from '../data/memories.js';

interface MonthNavProps {
  activeMonth: string;
  onSelectMonth: (month: string) => void;
}

export const MonthNav: React.FC<MonthNavProps> = ({
  activeMonth,
  onSelectMonth,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll the active pill into view when month changes on mobile
  useEffect(() => {
    if (!containerRef.current) return;
    const activeEl = containerRef.current.querySelector<HTMLElement>(
      `[data-month="${activeMonth}"]`
    );
    if (activeEl) {
      activeEl.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center',
      });
    }
  }, [activeMonth]);

  return (
    <nav
      id="month-navigation"
      aria-label="Month chapters navigation"
      className="sticky top-4 z-40 px-4 mb-8 flex justify-center pointer-events-auto"
    >
      <div className="bg-[#FFFDF9]/90 backdrop-blur-md border border-[#EDE6DC] rounded-full p-1.5 shadow-sm max-w-full overflow-hidden">
        <div
          ref={containerRef}
          className="flex items-center gap-1 overflow-x-auto no-scrollbar scroll-smooth px-1 py-0.5"
          style={{ scrollSnapType: 'x mandatory' }}
        >
          {memories.map((m) => {
            const isActive = activeMonth === m.month;
            return (
              <button
                key={m.month}
                id={`nav-month-${m.month}`}
                data-month={m.month}
                onClick={() => onSelectMonth(m.month)}
                title={`${m.month} — ${m.title} (${m.date})`}
                className={`flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-mono font-medium transition-all duration-300 cursor-pointer ${
                  isActive
                    ? 'bg-[#242124] text-[#FFFDF9] shadow-xs scale-105'
                    : 'text-[#6B6265] hover:text-[#242124] hover:bg-[#F2ECE3]'
                }`}
              >
                {m.month}
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};
