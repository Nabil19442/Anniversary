import React, { useState } from 'react';
import { Camera, ZoomIn } from 'lucide-react';

interface EditorialPhotoCardProps {
  src: string;
  alt: string;
  caption?: string;
  monthNum: string;
  monthTitle: string;
  photoIndex: number;
  totalPhotos: number;
  rotation?: string;
  isFeatured?: boolean;
  onClick: () => void;
}

export const EditorialPhotoCard: React.FC<EditorialPhotoCardProps> = ({
  src,
  alt,
  caption,
  monthNum,
  monthTitle,
  photoIndex,
  totalPhotos,
  rotation = '',
  isFeatured = false,
  onClick,
}) => {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div
      onClick={onClick}
      className={`group relative cursor-pointer select-none transition-all duration-500 ${rotation} hover:rotate-0 hover:z-20`}
    >
      {/* Polaroid / Editorial Frame Card */}
      <div className="bg-white p-2.5 sm:p-3 pb-5 sm:pb-6 rounded-lg shadow-md group-hover:shadow-xl transition-shadow duration-500 border border-[#EDE6DC]">
        <div
          className={`relative overflow-hidden rounded bg-[#F4EFEA] ${
            isFeatured
              ? 'aspect-[4/5] sm:aspect-[4/3] md:aspect-[16/10] w-full'
              : 'aspect-[4/5] sm:aspect-[3/4] w-full'
          }`}
        >
          {/* Real image or placeholder if error */}
          {!hasError ? (
            <img
              src={src}
              alt={alt}
              loading="lazy"
              referrerPolicy="no-referrer"
              onLoad={() => setIsLoaded(true)}
              onError={() => setHasError(true)}
              className={`w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03] ${
                isLoaded ? 'opacity-100' : 'opacity-0'
              }`}
            />
          ) : (
            /* Elegant editorial fallback placeholder */
            <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-gradient-to-b from-[#F7F2EC] to-[#ECE4DA] border border-[#E2D8CC] rounded">
              <div className="w-10 h-10 rounded-full bg-white/80 border border-[#D5C9B9] flex items-center justify-center mb-3 text-[#8B4250]">
                <Camera className="w-5 h-5 stroke-[1.5]" />
              </div>
              <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#8B4250] mb-1">
                Month {monthNum} • Memory {photoIndex + 1}
              </span>
              <p className="font-serif italic text-sm text-[#5C4334] line-clamp-2 max-w-[200px]">
                {monthTitle}
              </p>
            </div>
          )}

          {/* Loading shimmer before image loads */}
          {!isLoaded && !hasError && (
            <div className="absolute inset-0 bg-[#F2ECE3] animate-pulse flex items-center justify-center">
              <span className="text-[10px] uppercase font-mono tracking-widest text-[#8C827A]">Loading photo...</span>
            </div>
          )}

          {/* Hover overlay hint */}
          <div className="absolute inset-0 bg-[#242124]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <div className="bg-white/90 backdrop-blur-xs text-[#242124] px-3 py-1.5 rounded-full text-xs font-medium flex items-center gap-1.5 shadow-sm transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
              <ZoomIn className="w-3.5 h-3.5 text-[#8B4250]" />
              <span>Enlarge</span>
            </div>
          </div>
        </div>

        {/* Polaroid bottom caption strip */}
        <div className="mt-2.5 px-1 flex items-center justify-between">
          <span className="font-serif italic text-xs sm:text-sm text-[#6B6265] truncate max-w-[80%]">
            {caption || `${monthTitle} • Part ${photoIndex + 1}`}
          </span>
          <span className="font-mono text-[10px] text-[#8C827A]">
            {photoIndex + 1}/{totalPhotos}
          </span>
        </div>
      </div>
    </div>
  );
};
