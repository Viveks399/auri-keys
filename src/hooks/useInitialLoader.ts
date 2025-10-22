'use client';

import { useState, useEffect } from 'react';
import { ANIMATION_CONFIG } from '@/constants/loaderConfig';

export const useInitialLoader = () => {
  const [showLoader, setShowLoader] = useState(true); // Start with true to prevent flash
  const [isLoading, setIsLoading] = useState(true);
  const [contentLoaded, setContentLoaded] = useState(false);

  useEffect(() => {
    // Check if this is the first visit (not a reload)
    const hasVisited = sessionStorage.getItem('hasVisited');
    
    if (!hasVisited) {
      // First visit - show loader
      setShowLoader(true);
      setIsLoading(true);
      
      // Mark as visited
      sessionStorage.setItem('hasVisited', 'true');
      
      // Simulate content loading for 3 seconds
      const contentLoadingTimer = setTimeout(() => {
        setContentLoaded(true);
      }, ANIMATION_CONFIG.LOADER_DURATION);
      
      return () => clearTimeout(contentLoadingTimer);
    } else {
      // Already visited - don't show loader
      setShowLoader(false);
      setIsLoading(false);
      setContentLoaded(true);
    }
  }, []);

  // Hide loader when content is loaded
  useEffect(() => {
    if (contentLoaded) {
      setIsLoading(false);
      // Add a small delay before hiding loader to ensure smooth transition
      const hideTimer = setTimeout(() => {
        setShowLoader(false);
      }, 100);
      
      return () => clearTimeout(hideTimer);
    }
  }, [contentLoaded]);

  return { showLoader, isLoading, contentLoaded };
};
