import React from 'react';
import { motion } from 'motion/react';
import { Calendar, ChevronDown } from 'lucide-react';
import { anniversaryConfig } from '../data/memories.js';

interface HeroProps {
  onBeginClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onBeginClick }) => {
  return (
    <header
      id="hero-section"
      className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 py-20 bg-[#FFFDF9] overflow-hidden"
    >
      {/* Delicate background ambient aura */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center overflow-hidden">
        <div className="w-[42rem] h-[42rem] rounded-full bg-[#B87D87]/5 blur-[120px] -translate-y-12" />
        <div className="w-[32rem] h-[32rem] rounded-full bg-[#C29B38]/5 blur-[100px] translate-y-24" />
      </div>

      {/* Decorative top border line */}
      <motion.div
        initial={{ opacity: 0, scaleX: 0 }}
        animate={{ opacity: 1, scaleX: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="w-16 h-[1px] bg-[#8B4250]/40 mb-10"
      />

      <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center">
        {/* Date badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#EDE6DC] bg-white/70 shadow-xs mb-8 backdrop-blur-xs"
        >
          <Calendar className="w-3.5 h-3.5 text-[#8B4250]" />
          <span className="text-xs uppercase tracking-[0.25em] font-medium text-[#5C4334]">
            {anniversaryConfig.anniversaryDate}
          </span>
        </motion.div>

        {/* Main Hero Title */}
        <motion.h1
          id="hero-title"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.35 }}
          className="font-serif text-5xl sm:text-7xl md:text-8xl text-[#242124] tracking-tight leading-[1.08] font-normal mb-6"
        >
          {anniversaryConfig.heroTitle}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          id="hero-subtitle"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="font-serif italic text-xl sm:text-2xl md:text-3xl text-[#6B6265] max-w-xl mx-auto leading-relaxed mb-12"
        >
          {anniversaryConfig.heroSubtitle}
        </motion.p>

        {/* Call to action button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.7 }}
        >
          <button
            id="begin-story-btn"
            onClick={onBeginClick}
            className="group inline-flex items-center gap-3 px-8 py-3.5 rounded-full bg-[#242124] text-[#FFFDF9] text-sm tracking-[0.15em] uppercase font-medium shadow-md hover:bg-[#8B4250] hover:shadow-lg transition-all duration-300 transform active:scale-95 cursor-pointer"
          >
            <span>{anniversaryConfig.heroButtonText}</span>
            <ChevronDown className="w-4 h-4 transition-transform duration-300 group-hover:translate-y-0.5" />
          </button>
        </motion.div>
      </div>

      {/* Subtle indicator at the bottom */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
      >
        <span className="text-[10px] tracking-[0.3em] uppercase text-[#8C827A]">Scroll to explore</span>
        <div className="w-[1px] h-8 bg-gradient-to-b from-[#8C827A]/40 to-transparent animate-pulse" />
      </motion.div>
    </header>
  );
};
