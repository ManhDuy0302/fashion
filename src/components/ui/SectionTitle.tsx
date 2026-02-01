import { motion } from 'framer-motion';

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  align?: 'left' | 'center' | 'right';
  className?: string;
}

export function SectionTitle({
  title,
  subtitle,
  align = 'center',
  className = '',
}: SectionTitleProps) {
  const alignStyles = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`mb-12 ${alignStyles[align]} ${className}`}
    >
      <h2 className="text-4xl md:text-5xl font-serif font-semibold text-gray-900 mb-4 tracking-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="text-gray-600 text-lg font-medium max-w-2xl mx-auto leading-relaxed">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
