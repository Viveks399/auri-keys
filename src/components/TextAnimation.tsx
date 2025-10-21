import React from 'react';
import { motion } from 'framer-motion';
import AnimatedLetter from './AnimatedLetter';
import { LETTERS_DATA } from '@/constants/loaderConfig';

interface TextAnimationProps {
  showText: boolean;
}

const TextAnimation: React.FC<TextAnimationProps> = ({ showText }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl px-4"
    >
      <svg
        width="100%"
        height="auto"
        viewBox="0 0 1000 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto max-h-20 sm:max-h-24 md:max-h-32 lg:max-h-40"
      >
        {LETTERS_DATA.map((letterData, index) => (
          <AnimatedLetter key={letterData.letter} letterData={letterData} />
        ))}
      </svg>
    </motion.div>
  );
};

export default TextAnimation;
