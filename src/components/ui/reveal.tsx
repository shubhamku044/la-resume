import { ReactNode } from 'react';

interface RevealProps {
  children: ReactNode;
  width?: 'fit-content' | '100%';
  delay?: number;
  duration?: number;
  yOffset?: number;
  className?: string;
  variants?: unknown; // Kept for compatibility but unused
}

export const Reveal = ({ children, width = 'fit-content', className = '' }: RevealProps) => {
  return (
    <div style={{ position: 'relative', width }} className={className}>
      {children}
    </div>
  );
};

interface FadeInProps {
  children: ReactNode;
  width?: 'fit-content' | '100%';
  delay?: number;
  duration?: number;
  className?: string;
}

export const FadeIn = ({ children, width = '100%', className = '' }: FadeInProps) => {
  return (
    <Reveal width={width} className={className}>
      {children}
    </Reveal>
  );
};
