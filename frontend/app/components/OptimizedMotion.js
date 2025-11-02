'use client';

import { motion } from 'framer-motion';
import { useMemo } from 'react';

/**
 * Optimized motion component that uses GPU-accelerated properties
 * to prevent forced reflows and improve performance
 */

// GPU-accelerated animation variants that don't cause layout reflows
const fadeInUpVariants = {
  hidden: { 
    opacity: 0, 
    y: 20,
    // Use transform instead of top/bottom for GPU acceleration
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.1, 0.25, 1], // Custom easing for smoother animation
    }
  }
};

const fadeInScaleVariants = {
  hidden: { 
    opacity: 0, 
    scale: 0.95,
  },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1],
    }
  }
};

// Optimized motion div with will-change hint for GPU acceleration
export const OptimizedMotionDiv = ({ 
  children, 
  variant = 'fadeInUp', 
  delay = 0,
  className = '',
  ...props 
}) => {
  // Memoize variants to prevent recreation on each render
  const variants = useMemo(() => {
    const baseVariant = variant === 'fadeInScale' ? fadeInScaleVariants : fadeInUpVariants;
    
    if (delay > 0) {
      return {
        ...baseVariant,
        visible: {
          ...baseVariant.visible,
          transition: {
            ...baseVariant.visible.transition,
            delay,
          }
        }
      };
    }
    
    return baseVariant;
  }, [variant, delay]);

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={variants}
      className={className}
      style={{
        // Hint to browser that these properties will change
        willChange: 'transform, opacity',
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
};

// Optimized viewport-triggered animation
export const OptimizedViewportMotion = ({ 
  children, 
  variant = 'fadeInUp',
  delay = 0, 
  className = '',
  once = true,
  ...props 
}) => {
  const variants = useMemo(() => {
    const baseVariant = variant === 'fadeInScale' ? fadeInScaleVariants : fadeInUpVariants;
    
    if (delay > 0) {
      return {
        ...baseVariant,
        visible: {
          ...baseVariant.visible,
          transition: {
            ...baseVariant.visible.transition,
            delay,
          }
        }
      };
    }
    
    return baseVariant;
  }, [variant, delay]);

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: '-50px' }} // Trigger 50px before entering viewport
      variants={variants}
      className={className}
      style={{
        willChange: 'transform, opacity',
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
};

// Batch layout reads to prevent forced reflows
export const useBatchedLayoutEffect = (callback, deps) => {
  if (typeof window !== 'undefined' && 'requestAnimationFrame' in window) {
    requestAnimationFrame(() => {
      callback();
    });
  }
};
