import React, { useEffect, useState } from 'react';
import { motion, useInView } from 'motion/react';
import { statistics } from '../data/memories.js';

interface AnimatedCounterProps {
  target: number | string;
  duration?: number;
}

const AnimatedCounter: React.FC<AnimatedCounterProps> = ({ target, duration = 1.6 }) => {
  const [count, setCount] = useState<number | string>(typeof target === 'number' ? 0 : target);
  const ref = React.useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!isInView || typeof target !== 'number') return;

    let startTime: number | null = null;
    let animationFrame: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / (duration * 1000), 1);
      // Ease out quartic
      const easeProgress = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(easeProgress * target));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        setCount(target);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [isInView, target, duration]);

  return <span ref={ref}>{count}</span>;
};

export const NumbersSection: React.FC = () => {
  return (
    <section
      id="our-numbers"
      className="py-24 sm:py-32 px-6 bg-[#FAF5EE] border-y border-[#EDE6DC] relative overflow-hidden"
    >
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <span className="text-xs uppercase tracking-[0.3em] text-[#8B4250] font-mono font-medium">
            Milestones of Our First Year
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#242124] mt-2 font-normal">
            Our Numbers
          </h2>
          <div className="w-12 h-[1px] bg-[#D4C5B3] mx-auto mt-4" />
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 sm:gap-12">
          {statistics.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: idx * 0.15 }}
              className="flex flex-col items-center"
            >
              <div className="font-serif text-5xl sm:text-6xl md:text-7xl text-[#242124] tracking-tight leading-none mb-3 font-normal">
                <AnimatedCounter target={stat.value} />
                {stat.suffix}
              </div>
              <span className="font-mono text-xs sm:text-sm uppercase tracking-[0.2em] text-[#6B4E3D]">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
