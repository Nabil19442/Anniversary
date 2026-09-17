import React from 'react';
import { motion } from 'motion/react';
import { RotateCcw } from 'lucide-react';
import { anniversaryConfig } from '../data/memories.js';

interface FinalSectionProps {
  onReplayClick: () => void;
}

export const FinalSection: React.FC<FinalSectionProps> = ({ onReplayClick }) => {
  return (
    <footer
      id="final-section"
      className="relative min-h-[85vh] flex flex-col items-center justify-center text-center px-6 py-24 bg-[#FFFDF9] overflow-hidden"
    >
      {/* Soft warm romantic background glow */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        <div className="w-[36rem] h-[36rem] rounded-full bg-[#B87D87]/8 blur-[120px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="relative z-10 max-w-2xl mx-auto flex flex-col items-center"
      >
        {/* Decorative floral/line divider */}
        <div className="w-16 h-[1px] bg-[#8B4250]/40 mb-10" />

        {/* Cinematic Anniversary Greeting */}
        <h2 className="font-serif text-4xl sm:text-6xl md:text-7xl text-[#242124] tracking-tight leading-tight font-normal mb-6">
          Happy 1st Anniversary <span className="text-[#8B4250]">❤️</span>
        </h2>

        {/* Date */}
        <p className="font-mono text-sm sm:text-base uppercase tracking-[0.3em] text-[#8B4250] font-medium mb-6">
          {anniversaryConfig.anniversaryDateFormatted}
        </p>

        {/* Emotional closing subtitle */}
        <p className="font-serif italic text-xl sm:text-2xl md:text-3xl text-[#6B6265] max-w-lg leading-relaxed mb-12">
          One year down. A lifetime of memories to go.
        </p>

        {/* Replay Our Story Button */}
        <button
          id="replay-story-btn"
          onClick={onReplayClick}
          className="group inline-flex items-center gap-2.5 px-7 py-3 rounded-full border border-[#EDE6DC] bg-white hover:bg-[#242124] text-[#242124] hover:text-[#FFFDF9] text-xs font-mono uppercase tracking-[0.2em] font-medium shadow-xs hover:shadow-md transition-all duration-300 transform active:scale-95 cursor-pointer"
        >
          <span>Replay Our Story</span>
          <RotateCcw className="w-3.5 h-3.5 transition-transform duration-500 group-hover:-rotate-180" />
        </button>

        {/* Small subtle footer credit */}
        <p className="mt-16 text-[11px] font-mono tracking-widest text-[#8C827A] uppercase">
          Crafted with love • 365 Days
        </p>
      </motion.div>
    </footer>
  );
};
