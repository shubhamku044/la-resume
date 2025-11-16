'use client';
import { motion } from 'framer-motion';
import { useMemo } from 'react';

// Generate random values outside of render
const generateParticle = (index: number) => ({
  id: index,
  width: Math.random() * 100 + 50,
  height: Math.random() * 100 + 50,
  left: Math.random() * 100,
  top: Math.random() * 100,
  animateX: Math.random() * 50 - 25,
  animateY: Math.random() * 50 - 25,
  scale: Math.random() * 0.5 + 0.8,
  duration: Math.random() * 5 + 10,
  delay: Math.random() * 5,
});

export const AnimatedBackground = () => {
  // Generate stable random values that won't change on re-renders
  const particles = useMemo(
    () => Array.from({ length: 10 }, (_, index) => generateParticle(index)),
    []
  );

  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      <div className="bg-gradient-radial absolute top-0 size-full from-purple-50 to-transparent opacity-30 dark:from-purple-950/20 dark:to-transparent"></div>
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className={`absolute rounded-full bg-gradient-to-br ${
            particle.id % 2 === 0
              ? 'from-purple-300/10 to-pink-300/10 dark:from-purple-500/10 dark:to-pink-500/10'
              : 'from-pink-300/10 to-purple-300/10 dark:from-pink-500/10 dark:to-purple-500/10'
          }`}
          style={{
            width: `${particle.width}px`,
            height: `${particle.height}px`,
            left: `${particle.left}%`,
            top: `${particle.top}%`,
          }}
          animate={{
            x: [0, particle.animateX],
            y: [0, particle.animateY],
            scale: [1, particle.scale, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'easeInOut',
            delay: particle.delay,
          }}
        />
      ))}
    </div>
  );
};
