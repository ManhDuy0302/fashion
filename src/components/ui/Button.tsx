import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { motion } from 'framer-motion';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: ReactNode;
  fullWidth?: boolean;
}

export function Button({
  variant = 'primary',
  size = 'md',
  children,
  fullWidth = false,
  className = '',
  disabled,
  ...props
}: ButtonProps) {
  const baseStyles =
    'inline-flex items-center justify-center font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed tracking-wide rounded-full';

  const variants = {
    primary:
      'bg-pink-500 text-white hover:bg-pink-600 focus:ring-pink-500 shadow-lg shadow-pink-500/25',
    secondary:
      'bg-pink-50 text-pink-600 hover:bg-pink-100 focus:ring-pink-300',
    outline:
      'border-2 border-pink-500 text-pink-500 bg-transparent hover:bg-pink-500 hover:text-white focus:ring-pink-500',
    ghost:
      'text-gray-700 bg-transparent hover:bg-pink-50 focus:ring-pink-300',
  };

  const sizes = {
    sm: 'px-5 py-2.5 text-sm',
    md: 'px-8 py-3.5 text-base',
    lg: 'px-10 py-4 text-base',
  };

  const widthClass = fullWidth ? 'w-full' : '';

  return (
    <motion.button
      whileHover={{ scale: 1.02, y: -1 }}
      whileTap={{ scale: 0.98 }}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${widthClass} ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </motion.button>
  );
}
