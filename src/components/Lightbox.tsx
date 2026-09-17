import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ChevronLeft, ChevronRight, Camera } from 'lucide-react';
import { LightboxState } from '../types.ts';

interface LightboxProps {
  state: LightboxState;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

export const Lightbox: React.FC<LightboxProps> = ({
  state,
  onClose,
  onPrev,
  onNext,
}) => {
  const { isOpen, images, currentIndex, monthTitle, monthDate, captions } = state;
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    setImageError(false);
  }, [currentIndex, images]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    // Lock body scroll
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose, onPrev, onNext]);

  if (!isOpen || images.length === 0) return null;

  const currentSrc = images[currentIndex];

  return (
    <AnimatePresence>
      <motion.div
        id="image-lightbox-modal"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 sm:p-8"
        onClick={onClose}
      >
        {/* Top bar controls */}
        <div
          className="absolute top-4 left-0 right-0 px-6 flex items-center justify-between z-20 text-[#FFFDF9]"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex flex-col">
            <span className="font-serif italic text-lg sm:text-xl text-white">
              {captions?.[currentIndex] || monthTitle}
            </span>
            <span className="font-mono text-xs text-white/60">
              {monthDate} • Photo {currentIndex + 1} of {images.length}
            </span>
          </div>

          <button
            id="lightbox-close-btn"
            onClick={onClose}
            aria-label="Close lightbox"
            className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Previous Button */}
        {images.length > 1 && (
          <button
            id="lightbox-prev-btn"
            onClick={(e) => {
              e.stopPropagation();
              onPrev();
            }}
            aria-label="Previous photo"
            className="absolute left-4 sm:left-6 z-20 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all transform hover:scale-110 cursor-pointer"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
        )}

        {/* Next Button */}
        {images.length > 1 && (
          <button
            id="lightbox-next-btn"
            onClick={(e) => {
              e.stopPropagation();
              onNext();
            }}
            aria-label="Next photo"
            className="absolute right-4 sm:right-6 z-20 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all transform hover:scale-110 cursor-pointer"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        )}

        {/* Central Image Container */}
        <div
          className="relative max-w-5xl max-h-[82vh] w-full flex items-center justify-center"
          onClick={(e) => e.stopPropagation()}
        >
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.3 }}
            className="relative flex items-center justify-center max-w-full max-h-[80vh] overflow-hidden rounded-lg shadow-2xl bg-[#1A181A] border border-white/10"
          >
            {!imageError ? (
              <img
                src={currentSrc}
                alt={`${monthTitle} photo ${currentIndex + 1}`}
                onError={() => setImageError(true)}
                className="max-w-full max-h-[80vh] object-contain select-none"
              />
            ) : (
              <div className="w-[320px] sm:w-[480px] h-[360px] flex flex-col items-center justify-center p-8 text-center bg-[#242124] text-white">
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mb-4 text-[#B87D87]">
                  <Camera className="w-6 h-6" />
                </div>
                <h4 className="font-serif text-2xl mb-2">{monthTitle}</h4>
                <p className="font-sans text-xs text-white/60 uppercase tracking-widest mb-4">
                  Memory Photo #{currentIndex + 1}
                </p>
                <p className="font-serif italic text-sm text-white/70 max-w-xs">
                  Place your image file in public{currentSrc} to see your personal photograph here.
                </p>
              </div>
            )}
          </motion.div>
        </div>

        {/* Bottom thumbnail dots / counter */}
        {images.length > 1 && (
          <div
            className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/50 backdrop-blur-xs border border-white/10"
            onClick={(e) => e.stopPropagation()}
          >
            {images.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  if (idx !== currentIndex) {
                    if (idx > currentIndex) onNext();
                    else onPrev();
                  }
                }}
                className={`transition-all duration-300 rounded-full ${
                  idx === currentIndex
                    ? 'w-6 h-2 bg-[#B87D87]'
                    : 'w-2 h-2 bg-white/40 hover:bg-white/70'
                }`}
                aria-label={`Go to photo ${idx + 1}`}
              />
            ))}
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
};
