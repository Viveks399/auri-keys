'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface CarouselLoadingContextType {
  carouselImagesLoaded: boolean;
  setCarouselImagesLoaded: (loaded: boolean) => void;
}

const CarouselLoadingContext = createContext<CarouselLoadingContextType | undefined>(undefined);

export const CarouselLoadingProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [carouselImagesLoaded, setCarouselImagesLoaded] = useState(false);

  const updateCarouselImagesLoaded = (loaded: boolean) => {
    setCarouselImagesLoaded(loaded);
  };

  return (
    <CarouselLoadingContext.Provider value={{ carouselImagesLoaded, setCarouselImagesLoaded: updateCarouselImagesLoaded }}>
      {children}
    </CarouselLoadingContext.Provider>
  );
};

export const useCarouselLoading = () => {
  const context = useContext(CarouselLoadingContext);
  if (context === undefined) {
    throw new Error('useCarouselLoading must be used within a CarouselLoadingProvider');
  }
  return context;
};
