
import React from 'react';
import { motion } from 'framer-motion';

interface AnimatedBackgroundProps {
  children: React.ReactNode;
  variant?: 'subtle' | 'gradient' | 'geometric';
  className?: string;
}

export const AnimatedBackground: React.FC<AnimatedBackgroundProps> = ({
  children,
  variant = 'subtle',
  className = ''
}) => {
  const backgroundVariants = {
    subtle: {
      backgroundImage: 'radial-gradient(circle at 20% 50%, rgb(120, 119, 198, 0.05) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgb(255, 119, 198, 0.05) 0%, transparent 50%)',
    },
    gradient: {
      backgroundImage: 'linear-gradient(135deg, rgb(667, 0.05) 0%, rgb(120, 119, 198, 0.1) 100%)',
    },
    geometric: {
      backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23667eea' fill-opacity='0.02'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className={`relative overflow-hidden ${className}`}
      style={backgroundVariants[variant]}
    >
      {/* Floating elements */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-2 h-2 bg-primary/20 rounded-full"
        animate={{
          y: [0, -20, 0],
          opacity: [0.3, 0.8, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute top-3/4 right-1/3 w-3 h-3 bg-secondary/20 rounded-full"
        animate={{
          y: [0, -30, 0],
          opacity: [0.2, 0.6, 0.2],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />
      <motion.div
        className="absolute top-1/2 right-1/4 w-1 h-1 bg-accent/30 rounded-full"
        animate={{
          y: [0, -15, 0],
          opacity: [0.4, 0.9, 0.4],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />
      
      {children}
    </motion.div>
  );
};
