import React, { useState, useEffect } from 'react';
import { memories } from './data/memories.js';
import { Hero } from './components/Hero.tsx';
import { Intro } from './components/Intro.tsx';
import { MonthNav } from './components/MonthNav.tsx';
import { Timeline } from './components/Timeline.tsx';
import { Lightbox } from './components/Lightbox.tsx';
import { NumbersSection } from './components/NumbersSection.tsx';
import { LoveLetter } from './components/LoveLetter.tsx';
import { FinalSection } from './components/FinalSection.tsx';
import { MusicPlayer } from './components/MusicPlayer.tsx';
import { LightboxState } from './types.ts';

export default function App() {
  const [activeMonth, setActiveMonth] = useState<string>('01');
  const [lightboxState, setLightboxState] = useState<LightboxState>({
    isOpen: false,
    images: [],
    currentIndex: 0,
    monthTitle: '',
    monthDate: '',
  });

  const handleScrollToSection = (elementId: string) => {
    const el = document.getElementById(elementId);
    if (el) {
      const navOffset = 90;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  const handleSelectMonth = (month: string) => {
    setActiveMonth(month);
    handleScrollToSection(`month-${month}`);
  };

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const handleCloseLightbox = () => {
    setLightboxState((prev) => ({ ...prev, isOpen: false }));
  };

  const handlePrevLightbox = () => {
    setLightboxState((prev) => {
      const nextIndex =
        prev.currentIndex === 0 ? prev.images.length - 1 : prev.currentIndex - 1;
      return { ...prev, currentIndex: nextIndex };
    });
  };

  const handleNextLightbox = () => {
    setLightboxState((prev) => {
      const nextIndex =
        prev.currentIndex === prev.images.length - 1 ? 0 : prev.currentIndex + 1;
      return { ...prev, currentIndex: nextIndex };
    });
  };

  return (
    <div className="min-h-screen bg-[#FFFDF9] text-[#242124] flex flex-col selection:bg-[#B87D87]/20 selection:text-[#242124]">
      {/* 1. Hero Section */}
      <Hero onBeginClick={() => handleScrollToSection('intro')} />

      {/* 2. Emotional Intro */}
      <Intro />

      {/* 3. Sticky Month Navigation */}
      <MonthNav
        activeMonth={activeMonth}
        onSelectMonth={handleSelectMonth}
      />

      {/* 4. 12 Month Timeline */}
      <main>
        <Timeline
          memories={memories}
          onOpenLightbox={setLightboxState}
          onMonthInView={(month) => setActiveMonth(month)}
        />

        {/* 5. Our Numbers Section */}
        <NumbersSection />

        {/* 6. A Letter For You */}
        <LoveLetter />

        {/* 7. Final Cinematic Screen */}
        <FinalSection onReplayClick={handleScrollToTop} />
      </main>

      {/* Fullscreen Photo Lightbox */}
      <Lightbox
        state={lightboxState}
        onClose={handleCloseLightbox}
        onPrev={handlePrevLightbox}
        onNext={handleNextLightbox}
      />

      {/* Background Music Button in Corner */}
      <MusicPlayer />
    </div>
  );
}
