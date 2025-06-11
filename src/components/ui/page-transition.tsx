
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";

interface PageTransitionProps {
  children: React.ReactNode;
}

const pageVariants = {
  initial: {
    opacity: 0,
    y: 20,
    scale: 0.98
  },
  in: {
    opacity: 1,
    y: 0,
    scale: 1
  },
  out: {
    opacity: 0,
    y: -20,
    scale: 1.02
  }
};

const pageTransition = {
  type: "tween",
  ease: "anticipate",
  duration: 0.4
};

export const PageTransition: React.FC<PageTransitionProps> = ({ children }) => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={location.pathname}
        initial="initial"
        animate="in"
        exit="out"
        variants={pageVariants}
        transition={pageTransition}
        className="w-full"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export const SlideTransition: React.FC<PageTransitionProps> = ({ children }) => {
  const location = useLocation();

  const slideVariants = {
    initial: { x: "100%", opacity: 0 },
    in: { x: "0%", opacity: 1 },
    out: { x: "-100%", opacity: 0 }
  };

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={location.pathname}
        initial="initial"
        animate="in"
        exit="out"
        variants={slideVariants}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="w-full"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export const FadeTransition: React.FC<PageTransitionProps> = ({ children }) => {
  const location = useLocation();

  const fadeVariants = {
    initial: { opacity: 0 },
    in: { opacity: 1 },
    out: { opacity: 0 }
  };

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={location.pathname}
        initial="initial"
        animate="in"
        exit="out"
        variants={fadeVariants}
        transition={{ duration: 0.3 }}
        className="w-full"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};
