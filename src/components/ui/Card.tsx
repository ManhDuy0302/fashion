import type { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export function Card({ children, className = '', hover = false }: CardProps) {
  if (hover) {
    return (
      <motion.div
        whileHover={{ y: -4, boxShadow: '0 20px 40px rgba(236, 72, 153, 0.15)' }}
        transition={{ duration: 0.3 }}
        className={`bg-white rounded-2xl shadow-sm border border-pink-100 overflow-hidden ${className}`}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <div className={`bg-white rounded-2xl shadow-sm border border-pink-100 overflow-hidden ${className}`}>
      {children}
    </div>
  );
}
