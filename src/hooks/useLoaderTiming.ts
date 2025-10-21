import { useState, useEffect } from 'react';
import { ANIMATION_CONFIG } from '@/constants/loaderConfig';

interface UseLoaderTimingProps {
  isLoading: boolean;
  onComplete?: () => void;
}

export const useLoaderTiming = ({ isLoading, onComplete }: UseLoaderTimingProps) => {
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    if (!isLoading) return;

    const textTimer = setTimeout(() => {
      setShowText(true);
    }, ANIMATION_CONFIG.TEXT_DELAY);

    const completeTimer = setTimeout(() => {
      onComplete?.();
    }, ANIMATION_CONFIG.COMPLETE_DELAY);

    return () => {
      clearTimeout(textTimer);
      clearTimeout(completeTimer);
    };
  }, [isLoading, onComplete]);

  useEffect(() => {
    if (!isLoading) {
      setShowText(false);
    }
  }, [isLoading]);

  return { showText };
};
