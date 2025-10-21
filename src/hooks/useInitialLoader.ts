'use client';

import { useState, useEffect } from 'react';
import { ANIMATION_CONFIG } from '@/constants/loaderConfig';

export const useInitialLoader = () => {
  const [showLoader, setShowLoader] = useState(true); // Start with true to prevent flash
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if this is the first visit (not a reload)
    const hasVisited = sessionStorage.getItem('hasVisited');
    
    if (!hasVisited) {
      // First visit - show loader
      setShowLoader(true);
      setIsLoading(true);
      
      // Mark as visited
      sessionStorage.setItem('hasVisited', 'true');
      
      // Hide loader after animation completes
      const timer = setTimeout(() => {
        setIsLoading(false);
        setShowLoader(false);
      }, ANIMATION_CONFIG.LOADER_DURATION);
      
      return () => clearTimeout(timer);
    } else {
      // Already visited - don't show loader
      setShowLoader(false);
      setIsLoading(false);
    }
  }, []);

  return { showLoader, isLoading };
};
