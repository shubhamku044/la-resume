'use client';
import React from 'react';
import { motion } from 'framer-motion';

export const AnimatedBackground = () => {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      <div className="bg-gradient-radial absolute top-0 size-full from-purple-50 to-transparent opacity-30 dark:from-purple-950/20 dark:to-transparent"></div>
      {Array.from({ length: 10 }).map((_, index) => (
        <motion.div
          key={index}
          className={`absolute rounded-full bg-gradient-to-br ${
            index % 2 === 0
              ? 'from-purple-300/10 to-pink-300/10 dark:from-purple-500/10 dark:to-pink-500/10'
              : 'from-pink-300/10 to-purple-300/10 dark:from-pink-500/10 dark:to-purple-500/10'
          }`}
          style={{
            width: `${Math.random() * 100 + 50}px`,
            height: `${Math.random() * 100 + 50}px`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            x: [0, Math.random() * 50 - 25],
            y: [0, Math.random() * 50 - 25],
            scale: [1, Math.random() * 0.5 + 0.8, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: Math.random() * 5 + 10,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'easeInOut',
            delay: Math.random() * 5,
          }}
        />
      ))}
    </div>
  );
};
