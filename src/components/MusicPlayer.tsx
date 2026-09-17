import React, { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX, Music } from 'lucide-react';
import { anniversaryConfig } from '../data/memories.js';

export const MusicPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isSynthPlaying, setIsSynthPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const synthTimerRef = useRef<number | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);

  // Gentle romantic chord progression generator fallback in case mp3 is empty or not uploaded yet
  const playRomanticChimeProgression = () => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;

      if (!audioCtxRef.current || audioCtxRef.current.state === 'closed') {
        audioCtxRef.current = new AudioCtx();
      }

      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      // Romantic pentatonic chord frequencies: C4, E4, G4, B4, D5, E5
      const chords = [
        [261.63, 329.63, 392.00, 493.88], // Cmaj7
        [220.00, 261.63, 329.63, 392.00], // Am7
        [174.61, 220.00, 261.63, 329.63], // Fmaj7
        [196.00, 246.94, 293.66, 392.00], // G
      ];

      let chordIndex = 0;

      const triggerChord = () => {
        if (!audioCtxRef.current) return;
        const now = ctx.currentTime;
        const currentChord = chords[chordIndex];

        currentChord.forEach((freq, noteIdx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();

          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, now + noteIdx * 0.18);

          // Soft bell-like envelope
          gain.gain.setValueAtTime(0.0001, now + noteIdx * 0.18);
          gain.gain.exponentialRampToValueAtTime(0.04, now + noteIdx * 0.18 + 0.08);
          gain.gain.exponentialRampToValueAtTime(0.0001, now + noteIdx * 0.18 + 2.8);

          osc.connect(gain);
          gain.connect(ctx.destination);

          osc.start(now + noteIdx * 0.18);
          osc.stop(now + noteIdx * 0.18 + 3.0);
        });

        chordIndex = (chordIndex + 1) % chords.length;
      };

      triggerChord();
      const intervalId = window.setInterval(triggerChord, 3600);
      synthTimerRef.current = intervalId;
      setIsSynthPlaying(true);
    } catch {
      // Graceful ignore
    }
  };

  const stopSynth = () => {
    if (synthTimerRef.current) {
      clearInterval(synthTimerRef.current);
      synthTimerRef.current = null;
    }
    if (audioCtxRef.current && audioCtxRef.current.state === 'running') {
      audioCtxRef.current.suspend();
    }
    setIsSynthPlaying(false);
  };

  const toggleMusic = async () => {
    if (isPlaying) {
      // Turn Off
      if (audioRef.current) {
        audioRef.current.pause();
      }
      stopSynth();
      setIsPlaying(false);
    } else {
      // Turn On
      setIsPlaying(true);
      if (audioRef.current) {
        audioRef.current.loop = true;
        try {
          await audioRef.current.play();
        } catch {
          // If mp3 fails to play (empty file, file missing, or autoplay policy), fallback to gentle ambient chime
          playRomanticChimeProgression();
        }
      } else {
        playRomanticChimeProgression();
      }
    }
  };

  useEffect(() => {
    return () => {
      stopSynth();
    };
  }, []);

  return (
    <div className="fixed bottom-5 right-5 z-40">
      <audio
        ref={audioRef}
        src={anniversaryConfig.musicPath}
        preload="none"
        onEnded={() => {
          if (audioRef.current) audioRef.current.play();
        }}
        onError={() => {
          if (isPlaying && !isSynthPlaying) {
            playRomanticChimeProgression();
          }
        }}
      />

      <button
        id="music-toggle-btn"
        onClick={toggleMusic}
        aria-label={isPlaying ? "Turn music off" : "Turn music on"}
        className={`group flex items-center gap-2.5 px-4 py-2.5 rounded-full border shadow-md transition-all duration-300 backdrop-blur-md cursor-pointer ${
          isPlaying
            ? 'bg-[#242124] text-[#FFFDF9] border-[#242124] hover:bg-[#3D353A]'
            : 'bg-[#FFFDF9]/95 text-[#242124] border-[#EDE6DC] hover:border-[#8B4250] hover:text-[#8B4250]'
        }`}
      >
        <div className="relative">
          {isPlaying ? (
            <Volume2 className="w-4 h-4 text-[#B87D87] animate-pulse" />
          ) : (
            <VolumeX className="w-4 h-4 text-[#8C827A]" />
          )}
        </div>

        <span className="text-xs font-mono uppercase tracking-[0.15em] font-medium">
          {isPlaying ? 'Music On' : 'Music Off'}
        </span>

        {isPlaying && (
          <span className="flex gap-0.5 items-end h-3 ml-0.5">
            <span className="w-0.5 bg-[#B87D87] h-3 animate-[bounce_1s_infinite_100ms]" />
            <span className="w-0.5 bg-[#B87D87] h-2 animate-[bounce_1s_infinite_300ms]" />
            <span className="w-0.5 bg-[#B87D87] h-3.5 animate-[bounce_1s_infinite_200ms]" />
          </span>
        )}
      </button>
    </div>
  );
};
