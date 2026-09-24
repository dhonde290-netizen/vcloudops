'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface ScrollFadeProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export function ScrollFade({ children, className, delay = 0 }: ScrollFadeProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: false, amount: 0, margin: '0px 0px -50px 0px' }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
