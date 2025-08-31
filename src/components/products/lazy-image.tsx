'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

interface LazyImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  sizes: string;
  className?: string;
  priority?: boolean;
}

export default function LazyImage({ 
  src, 
  alt, 
  width, 
  height, 
  sizes, 
  className = "", 
  priority = false 
}: LazyImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          setIsLoading(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: '100px', // Increased margin for smoother preloading
        threshold: 0.01
      }
    );

    if (imageRef.current) {
      observer.observe(imageRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleImageLoad = () => {
    setIsLoaded(true);
    setIsLoading(false);
  };

  return (
    <div 
      ref={imageRef} 
      className={`relative overflow-hidden ${className}`}
    >
      {isInView && (
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          sizes={sizes}
          priority={priority}
          onLoad={handleImageLoad}
          className={`w-full h-auto transition-all duration-1000 ease-out ${
            isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}
        />
      )}
      
      {/* Enhanced loading placeholder */}
      {!isLoaded && isInView && (
        <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 animate-pulse">
          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/20 to-transparent animate-shimmer"></div>
        </div>
      )}
    </div>
  );
}
