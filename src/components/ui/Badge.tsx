import { ReactNode } from 'react';

interface BadgeProps {
  variant?: 'default' | 'new' | 'sale' | 'soldout';
  children: ReactNode;
  className?: string;
}

export function Badge({ variant = 'default', children, className = '' }: BadgeProps) {
  const variants = {
    default: 'bg-pink-500 text-white',
    new: 'bg-rose-400 text-white',
    sale: 'bg-red-500 text-white',
    soldout: 'bg-gray-400 text-white',
  };

  return (
    <span
      className={`inline-block px-3 py-1.5 text-xs font-semibold uppercase tracking-wider rounded-full ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
