import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info' | 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

function Badge({ children, variant = 'default', size = 'md', className = '' }: BadgeProps) {
  const baseClasses = 'inline-flex items-center font-semibold rounded-full transition-all duration-200 shadow-sm';
  
  const variants = {
    default: 'bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 border border-neutral-200 dark:border-neutral-700',
    success: 'bg-gradient-to-r from-success-100 to-success-200 dark:from-success-900/30 dark:to-success-800/30 text-success-800 dark:text-success-300 border border-success-200 dark:border-success-700/50',
    warning: 'bg-gradient-to-r from-warning-100 to-warning-200 dark:from-warning-900/30 dark:to-warning-800/30 text-warning-800 dark:text-warning-300 border border-warning-200 dark:border-warning-700/50',
    error: 'bg-gradient-to-r from-error-100 to-error-200 dark:from-error-900/30 dark:to-error-800/30 text-error-800 dark:text-error-300 border border-error-200 dark:border-error-700/50',
    info: 'bg-gradient-to-r from-primary-100 to-primary-200 dark:from-primary-900/30 dark:to-primary-800/30 text-primary-800 dark:text-primary-300 border border-primary-200 dark:border-primary-700/50',
    primary: 'bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-lg shadow-primary-500/25',
    secondary: 'bg-gradient-to-r from-secondary-500 to-secondary-600 text-white shadow-lg shadow-secondary-500/25',
  };

  const sizes = {
    sm: 'px-2.5 py-1 text-xs',
    md: 'px-3 py-1.5 text-sm',
    lg: 'px-4 py-2 text-base',
  };

  const classes = `${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`;

  return <span className={classes}>{children}</span>;
}

export default Badge;