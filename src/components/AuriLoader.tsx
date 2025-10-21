'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TextAnimation from './TextAnimation';
import { useLoaderTiming } from '@/hooks/useLoaderTiming';

interface AuriLoaderProps {
  isLoading?: boolean;
  onComplete?: () => void;
}

const AuriLoader: React.FC<AuriLoaderProps> = ({ 
  isLoading = true, 
  onComplete
}) => {
  const { showText } = useLoaderTiming({ isLoading, onComplete });

  if (!isLoading) return null;

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black z-50 flex items-center justify-center"
        >
          <AnimatePresence>
            {showText && <TextAnimation showText={showText} />}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AuriLoader;