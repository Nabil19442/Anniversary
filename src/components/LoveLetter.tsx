import React from 'react';
import { motion } from 'motion/react';
import { Heart } from 'lucide-react';
import { loveLetter } from '../data/memories.js';
import { LoveLetterData } from '../types.ts';

export const LoveLetter: React.FC = () => {
  const letter = loveLetter as LoveLetterData;

  return (
    <section id="love-letter" className="py-24 sm:py-32 px-4 sm:px-6 relative">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-10"
        >
          <span className="text-xs uppercase tracking-[0.3em] text-[#8B4250] font-mono font-medium">
            From My Heart
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#242124] mt-2 font-normal">
            A Letter For You
          </h2>
          <div className="w-10 h-[1px] bg-[#EDE6DC] mx-auto mt-4" />
        </motion.div>

        {/* Paper / Card Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98, y: 30 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="relative bg-white/90 backdrop-blur-xs p-6 sm:p-12 md:p-14 rounded-2xl shadow-lg border border-[#EDE6DC] overflow-hidden"
        >
          {/* Subtle paper watermark texture accent */}
          <div className="absolute -top-12 -right-12 w-48 h-48 bg-[#F5EFEB]/50 rounded-full blur-2xl pointer-events-none" />

          {/* Delicate wax seal / heart motif */}
          <div className="flex justify-center mb-8">
            <div className="w-10 h-10 rounded-full bg-[#FAF4ED] border border-[#8B4250]/30 flex items-center justify-center text-[#8B4250] shadow-xs">
              <Heart className="w-4 h-4 fill-[#8B4250]/20 stroke-[#8B4250]" />
            </div>
          </div>

          {/* Optional Letter Salutation */}
          {letter.salutation && (
            <p className="font-serif text-xl sm:text-2xl text-[#242124] font-medium mb-6">
              {letter.salutation}
            </p>
          )}

          {/* Letter Body in Bengali typography */}
          <div className="space-y-5 sm:space-y-6 text-[#2B2627] font-bengali text-[15px] sm:text-[17px] md:text-lg leading-[1.85] sm:leading-[1.95] break-words">
            {letter.paragraphs.map((paragraph, idx) => (
              <p key={idx} className="tracking-normal font-normal">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Highlighted Final Line / Sign-off */}
          {letter.finalLine ? (
            <div className="mt-8 sm:mt-10 pt-6 border-t border-[#EDE6DC] flex flex-col items-end">
              <p className="font-serif italic text-base sm:text-lg md:text-xl text-[#8B4250] font-medium tracking-wide">
                {letter.finalLine}
              </p>
            </div>
          ) : (
            (letter.closing || letter.signature) && (
              <div className="mt-10 pt-6 border-t border-[#F0EAE1] flex flex-col items-end">
                {letter.closing && (
                  <span className="font-serif italic text-base text-[#6B6265]">
                    {letter.closing}
                  </span>
                )}
                {letter.signature && (
                  <span className="font-serif text-lg sm:text-xl text-[#242124] font-medium mt-1">
                    {letter.signature}
                  </span>
                )}
              </div>
            )
          )}
        </motion.div>
      </div>
    </section>
  );
};
