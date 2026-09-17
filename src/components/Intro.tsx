import React from 'react';
import { motion } from 'motion/react';
import { introText } from '../data/memories.js';

export const Intro: React.FC = () => {
  return (
    <section
      id="intro"
      className="relative py-24 sm:py-32 px-6 max-w-3xl mx-auto text-center"
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.9, ease: "easeOut" }}
        className="relative"
      >
        {/* Subtle decorative chapter marker */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="w-12 h-[1px] bg-[#EDE6DC]" />
          <span className="text-[11px] uppercase tracking-[0.3em] text-[#8B4250] font-medium">
            Prologue
          </span>
          <div className="w-12 h-[1px] bg-[#EDE6DC]" />
        </div>

        {/* Primary intro quote/paragraphs */}
        <div className="space-y-6">
          {introText.paragraphs.map((paragraph, index) => (
            <p
              key={index}
              className={
                index === 0
                  ? "font-serif text-3xl sm:text-4xl md:text-5xl text-[#242124] leading-snug font-normal tracking-tight"
                  : "font-serif italic text-lg sm:text-xl md:text-2xl text-[#6B6265] leading-relaxed max-w-2xl mx-auto"
              }
            >
              {paragraph}
            </p>
          ))}
        </div>

        {/* Delicate divider */}
        <div className="mt-12 flex justify-center items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#8B4250]/40" />
          <span className="w-1.5 h-1.5 rounded-full bg-[#8B4250]" />
          <span className="w-1.5 h-1.5 rounded-full bg-[#8B4250]/40" />
        </div>
      </motion.div>
    </section>
  );
};
