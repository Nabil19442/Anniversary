import React from 'react';
import { motion } from 'motion/react';
import { Quote } from 'lucide-react';
import { Memory, LightboxState } from '../types.ts';
import { EditorialPhotoCard } from './EditorialPhotoCard.tsx';

interface TimelineProps {
  memories: Memory[];
  onOpenLightbox: (state: LightboxState) => void;
  onMonthInView: (month: string) => void;
}

export const Timeline: React.FC<TimelineProps> = ({
  memories,
  onOpenLightbox,
  onMonthInView,
}) => {
  return (
    <section id="timeline-section" className="relative py-12 sm:py-20 px-4 sm:px-6 max-w-4xl mx-auto">
      {/* Central subtle vertical timeline guide line */}
      <div className="absolute left-6 sm:left-1/2 top-10 bottom-24 w-[1px] bg-gradient-to-b from-[#EDE6DC] via-[#D8C7B5] to-[#EDE6DC] -translate-x-1/2 pointer-events-none hidden sm:block" />

      <div className="space-y-28 sm:space-y-36">
        {memories.map((memory, index) => {
          const isEven = index % 2 === 0;

          return (
            <motion.article
              key={memory.month}
              id={`month-${memory.month}`}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              onViewportEnter={() => onMonthInView(memory.month)}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative scroll-mt-24"
            >
              {/* Timeline Center Node (Desktop) */}
              <div className="hidden sm:flex absolute left-1/2 -top-6 -translate-x-1/2 z-10 flex-col items-center">
                <span className="w-8 h-8 rounded-full bg-[#FFFDF9] border border-[#8B4250]/40 flex items-center justify-center font-mono text-xs font-semibold text-[#8B4250] shadow-xs">
                  {memory.month}
                </span>
              </div>

              {/* Chapter Header Card */}
              <div className="text-center max-w-xl mx-auto mb-10">
                <div className="inline-flex items-center gap-2 mb-2 sm:hidden">
                  <span className="w-7 h-7 rounded-full bg-[#242124] text-[#FFFDF9] flex items-center justify-center font-mono text-xs font-medium">
                    {memory.month}
                  </span>
                  <span className="text-xs uppercase font-mono tracking-[0.2em] text-[#8C827A]">
                    Chapter {memory.month}
                  </span>
                </div>

                <p className="font-mono text-xs sm:text-sm uppercase tracking-[0.25em] text-[#8B4250] font-medium mb-1">
                  {memory.date}
                </p>

                <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#242124] tracking-tight leading-tight font-normal">
                  {memory.title}
                </h2>
              </div>

              {/* Photos Scrapbook / Editorial Layout */}
              <div className="mb-10 max-w-2xl mx-auto">
                {memory.images.length === 1 && (
                  <div className="max-w-lg mx-auto">
                    <EditorialPhotoCard
                      src={memory.images[0]}
                      alt={`${memory.title} photograph`}
                      monthNum={memory.month}
                      monthTitle={memory.title}
                      photoIndex={0}
                      totalPhotos={memory.images.length}
                      caption={memory.caption || memory.captions?.[0]}
                      isFeatured={true}
                      rotation={isEven ? "-rotate-1" : "rotate-1"}
                      onClick={() =>
                        onOpenLightbox({
                          isOpen: true,
                          images: memory.images,
                          currentIndex: 0,
                          monthTitle: memory.title,
                          monthDate: memory.date,
                          captions: memory.captions || (memory.caption ? [memory.caption] : undefined),
                        })
                      }
                    />
                  </div>
                )}

                {memory.images.length === 2 && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
                    <EditorialPhotoCard
                      src={memory.images[0]}
                      alt={`${memory.title} photo 1`}
                      monthNum={memory.month}
                      monthTitle={memory.title}
                      photoIndex={0}
                      totalPhotos={memory.images.length}
                      caption={memory.captions?.[0] || memory.caption}
                      isFeatured={true}
                      rotation="-rotate-2"
                      onClick={() =>
                        onOpenLightbox({
                          isOpen: true,
                          images: memory.images,
                          currentIndex: 0,
                          monthTitle: memory.title,
                          monthDate: memory.date,
                          captions: memory.captions || (memory.caption ? [memory.caption] : undefined),
                        })
                      }
                    />
                    <div className="sm:translate-y-6">
                      <EditorialPhotoCard
                        src={memory.images[1]}
                        alt={`${memory.title} photo 2`}
                        monthNum={memory.month}
                        monthTitle={memory.title}
                        photoIndex={1}
                        totalPhotos={memory.images.length}
                        caption={memory.captions?.[1] || memory.caption}
                        rotation="rotate-2"
                        onClick={() =>
                          onOpenLightbox({
                            isOpen: true,
                            images: memory.images,
                            currentIndex: 1,
                            monthTitle: memory.title,
                            monthDate: memory.date,
                            captions: memory.captions || (memory.caption ? Array(memory.images.length).fill(memory.caption) : undefined),
                          })
                        }
                      />
                    </div>
                  </div>
                )}

                {memory.images.length >= 3 && (
                  <div className="space-y-4">
                    {/* Featured primary photo */}
                    <div className="max-w-xl mx-auto">
                      <EditorialPhotoCard
                        src={memory.images[0]}
                        alt={`${memory.title} featured photo`}
                        monthNum={memory.month}
                        monthTitle={memory.title}
                        photoIndex={0}
                        totalPhotos={memory.images.length}
                        caption={memory.captions?.[0] || memory.caption}
                        isFeatured={true}
                        rotation={isEven ? "-rotate-1" : "rotate-1"}
                        onClick={() =>
                          onOpenLightbox({
                            isOpen: true,
                            images: memory.images,
                            currentIndex: 0,
                            monthTitle: memory.title,
                            monthDate: memory.date,
                            captions: memory.captions || (memory.caption ? Array(memory.images.length).fill(memory.caption) : undefined),
                          })
                        }
                      />
                    </div>

                    {/* Secondary scrapbook thumbnails */}
                    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 gap-4 max-w-md mx-auto pt-2">
                      {memory.images.slice(1).map((imgUrl, pIndex) => (
                        <EditorialPhotoCard
                          key={pIndex + 1}
                          src={imgUrl}
                          alt={`${memory.title} photo ${pIndex + 2}`}
                          monthNum={memory.month}
                          monthTitle={memory.title}
                          photoIndex={pIndex + 1}
                          totalPhotos={memory.images.length}
                          caption={memory.captions?.[pIndex + 1] || memory.caption}
                          rotation={pIndex % 2 === 0 ? "rotate-2" : "-rotate-2"}
                          onClick={() =>
                            onOpenLightbox({
                              isOpen: true,
                              images: memory.images,
                              currentIndex: pIndex + 1,
                              monthTitle: memory.title,
                              monthDate: memory.date,
                              captions: memory.captions || (memory.caption ? Array(memory.images.length).fill(memory.caption) : undefined),
                            })
                          }
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Story Narrative */}
              <div className="max-w-xl mx-auto text-center px-4 sm:px-6">
                <div className="font-sans text-base sm:text-lg text-[#242124]/90 leading-relaxed font-normal space-y-4">
                  {memory.story.split('\n\n').map((paragraph, pIdx) => (
                    <p key={pIdx}>{paragraph}</p>
                  ))}
                </div>

                {/* Optional Quote Card */}
                {memory.quote && memory.quote.trim() !== '' && (
                  <div className="mt-6 pt-6 border-t border-[#EDE6DC] relative">
                    <div className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-[#F5EFEB] text-[#8B4250] mb-3">
                      <Quote className="w-3.5 h-3.5 stroke-[1.5]" />
                    </div>
                    <blockquote className="font-serif italic text-lg sm:text-xl text-[#6B4E3D] leading-relaxed max-w-md mx-auto">
                      {memory.quote.startsWith('“') || memory.quote.startsWith('"')
                        ? memory.quote
                        : `“${memory.quote}”`}
                    </blockquote>
                  </div>
                )}
              </div>

              {/* Chapter bottom delicate flow indicator */}
              {index < memories.length - 1 && (
                <div className="mt-16 flex flex-col items-center justify-center gap-2">
                  <div className="w-[1px] h-6 bg-[#EDE6DC]" />
                  <span className="text-[#8C827A] text-xs font-serif italic">↓</span>
                </div>
              )}
            </motion.article>
          );
        })}
      </div>
    </section>
  );
};
