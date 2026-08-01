'use client';

import {ReactNode} from 'react';
import {motion} from 'framer-motion';
import {cn} from '@/lib/utils';

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  onClick?: () => void;
}

export default function Card({children, className, hover = true, onClick}: CardProps) {
  return (
    <motion.div
      whileHover={hover ? {y: -4} : undefined}
      transition={{type: 'spring', stiffness: 300, damping: 20}}
      onClick={onClick}
      className={cn(
        'rounded-2xl border border-[var(--border-default)] bg-[var(--bg-elevated)] p-6',
        hover && 'cursor-pointer transition-colors hover:border-[var(--accent)]',
        onClick && 'cursor-pointer',
        className
      )}
    >
      {children}
    </motion.div>
  );
}
