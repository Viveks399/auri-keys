'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';

interface ImagePreloaderProps {
  images: string[];
  onAllLoaded: () => void;
}

const ImagePreloader: React.FC<ImagePreloaderProps> = ({ images, onAllLoaded }) => {
  const [loadedCount, setLoadedCount] = useState(0);
  const [allImagesLoaded, setAllImagesLoaded] = useState(false);

  useEffect(() => {
    if (loadedCount === images.length && !allImagesLoaded) {
      setAllImagesLoaded(true);
      // Add a delay to ensure all images are fully processed
      setTimeout(() => {
        console.log('All images preloaded and processed!');
        onAllLoaded();
      }, 500);
    }
  }, [loadedCount, images.length, allImagesLoaded, onAllLoaded]);

  const handleImageLoad = () => {
    setLoadedCount(prev => prev + 1);
  };

  return (
    <div style={{ position: 'absolute', top: '-9999px', left: '-9999px', visibility: 'hidden' }}>
      {images.map((src, index) => (
        <div key={src} style={{ position: 'relative', width: '100vw', height: '100vh' }}>
          <Image
            src={src}
            alt={`Preload ${index}`}
            fill
            priority={index === 0}
            quality={85}
            sizes="100vw"
            onLoad={handleImageLoad}
            style={{ objectFit: 'cover' }}
          />
        </div>
      ))}
    </div>
  );
};

export default ImagePreloader;