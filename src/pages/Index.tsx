
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import MatrixBackground from '@/components/MatrixBackground';
import AboutSection from '@/components/AboutSection';

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full mx-auto mb-4"
          />
          <h2 className="text-2xl font-bold text-green-400 font-mono">Initializing Terminal...</h2>
          <div className="text-green-600 font-mono mt-2">Loading portfolio interface...</div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-black overflow-hidden">
      <MatrixBackground />
      <AboutSection onNext={() => {}} onPrev={() => {}} isFirst={true} isLast={true} />
    </div>
  );
};

export default Index;
