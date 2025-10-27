import { useState, useEffect } from 'react';
import { ANIMATION_CONFIG } from '@/constants/loaderConfig';

interface UseLoaderTimingProps {
  isLoading: boolean;
  onComplete?: () => void;
  carouselImagesLoaded?: boolean;
}

export const useLoaderTiming = ({ 
  isLoading, 
  onComplete, 
  carouselImagesLoaded = true 
}: UseLoaderTimingProps) => {
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    if (!isLoading) return;

    const textTimer = setTimeout(() => {
      setShowText(true);
    }, ANIMATION_CONFIG.TEXT_DELAY);

    // Wait for both the fixed delay AND carousel images to be loaded
    const completeTimer = setTimeout(() => {
      if (carouselImagesLoaded) {
        onComplete?.();
      }
    }, ANIMATION_CONFIG.COMPLETE_DELAY);

    return () => {
      clearTimeout(textTimer);
      clearTimeout(completeTimer);
    };
  }, [isLoading, onComplete, carouselImagesLoaded]);

  // If carousel images load after the fixed delay, complete immediately
  useEffect(() => {
    if (carouselImagesLoaded && isLoading) {
      const timer = setTimeout(() => {
        onComplete?.();
      }, 100); // Small delay to ensure smooth transition
      
      return () => clearTimeout(timer);
    }
  }, [carouselImagesLoaded, isLoading, onComplete]);

  useEffect(() => {
    if (!isLoading) {
      setShowText(false);
    }
  }, [isLoading]);

  return { showText };
};