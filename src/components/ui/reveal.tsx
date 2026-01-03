'use client';

import { Variant, motion, useAnimation, useInView } from 'framer-motion';
import { useEffect, useRef } from 'react';

interface RevealProps {
  children: React.ReactNode;
  width?: 'fit-content' | '100%';
  delay?: number;
  duration?: number;
  yOffset?: number;
  className?: string;
  variants?: {
    visible: Variant;
    hidden: Variant;
  };
}

export const Reveal = ({
  children,
  width = 'fit-content',
  delay = 0,
  duration = 0.5,
  yOffset = 75,
  className = '',
  variants,
}: RevealProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const mainControls = useAnimation();

  useEffect(() => {
    if (isInView) {
      mainControls.start('visible');
    }
  }, [isInView, mainControls]);

  const defaultVariants = {
    hidden: { opacity: 0, y: yOffset },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div
      ref={ref}
      style={{ position: 'relative', width, overflow: 'hidden' }}
      className={className}
    >
      <motion.div
        variants={variants || defaultVariants}
        initial="hidden"
        animate={mainControls}
        transition={{ duration, delay }}
      >
        {children}
      </motion.div>
    </div>
  );
};

interface FadeInProps {
  children: React.ReactNode;
  width?: 'fit-content' | '100%';
  delay?: number;
  duration?: number;
  className?: string;
}

export const FadeIn = ({
  children,
  width = '100%',
  delay = 0,
  duration = 0.5,
  className = '',
}: FadeInProps) => {
  return (
    <Reveal width={width} delay={delay} duration={duration} yOffset={20} className={className}>
      {children}
    </Reveal>
  );
};
