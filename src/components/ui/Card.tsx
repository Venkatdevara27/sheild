import React from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'glass' | 'elevated' | 'gradient' | 'premium';
  hover?: boolean;
}

function Card({ children, className = '', variant = 'default', hover = false }: CardProps) {
  const baseClasses = 'rounded-2xl border transition-all duration-300';
  
  const variants = {
    default: 'bg-white dark:bg-neutral-800 border-neutral-200 dark:border-neutral-700',
    glass: 'bg-white/80 dark:bg-neutral-800/80 backdrop-blur-xl border-white/20 dark:border-neutral-700/50 shadow-xl',
    elevated: 'bg-white dark:bg-neutral-800 border-neutral-200 dark:border-neutral-700 shadow-2xl',
    gradient: 'bg-gradient-to-br from-white via-neutral-50 to-neutral-100 dark:from-neutral-800 dark:via-neutral-800 dark:to-neutral-900 border-neutral-200/50 dark:border-neutral-700/50 shadow-xl',
    premium: 'bg-white/90 dark:bg-neutral-800/90 backdrop-blur-2xl border border-white/30 dark:border-neutral-700/30 shadow-2xl',
  };

  const hoverClasses = hover ? 'hover:shadow-2xl hover:scale-[1.02] hover:-translate-y-1 cursor-pointer' : '';
  
  const classes = `${baseClasses} ${variants[variant]} ${hoverClasses} ${className}`;

  const CardComponent = hover ? motion.div : 'div';
  const motionProps = hover ? {
    whileHover: { y: -4, scale: 1.02 },
    transition: { duration: 0.2, ease: 'easeOut' }
  } : {};

  return (
    <CardComponent 
      className={classes}
      {...motionProps}
    >
      {children}
    </CardComponent>
  );
}

export default Card;