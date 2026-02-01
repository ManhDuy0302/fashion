import { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface CountUpProps {
  end: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  className?: string;
}

export function CountUp({
  end,
  duration = 2,
  suffix = '',
  prefix = '',
  decimals = 0,
  className = '',
}: CountUpProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!isInView || hasAnimated.current) return;
    hasAnimated.current = true;

    const startTime = Date.now();
    const endTime = startTime + duration * 1000;

    const easeOutQuart = (t: number): number => {
      return 1 - Math.pow(1 - t, 4);
    };

    const animate = () => {
      const now = Date.now();
      const progress = Math.min((now - startTime) / (duration * 1000), 1);
      const easedProgress = easeOutQuart(progress);
      const currentCount = easedProgress * end;

      setCount(currentCount);

      if (now < endTime) {
        requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    requestAnimationFrame(animate);
  }, [isInView, end, duration]);

  const displayValue = decimals > 0 
    ? count.toFixed(decimals) 
    : Math.floor(count).toLocaleString('vi-VN');

  return (
    <motion.span
      ref={ref}
      initial={{ opacity: 0, y: 10 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
      className={className}
    >
      {prefix}{displayValue}{suffix}
    </motion.span>
  );
}
