import React from 'react';
import { motion } from 'framer-motion';
import { LetterData, ANIMATION_CONFIG } from '@/constants/loaderConfig';

interface AnimatedLetterProps {
  letterData: LetterData;
}

const AnimatedLetter: React.FC<AnimatedLetterProps> = ({ letterData }) => {
  return (
    <motion.path
      d={letterData.path}
      fill="white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ 
        duration: letterData.duration, 
        ease: ANIMATION_CONFIG.EASING, 
        delay: letterData.delay 
      }}
      transform={letterData.transform}
    />
  );
};

export default AnimatedLetter;
