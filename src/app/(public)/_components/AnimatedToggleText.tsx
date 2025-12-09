"use client";

import { AnimatePresence, motion } from "framer-motion";

interface AnimatedToggleTextProps {
  show: boolean;
  children: React.ReactNode;
  duration?: number;
}

const AnimatedToggleText = ({
  show,
  children,
  duration = 0.25,
}: AnimatedToggleTextProps) => {
  return (
    <AnimatePresence mode="wait">
      {show && (
        <motion.span
          key="animated-text"
         initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -10 }}
          transition={{ duration }}
        >
          {children}
        </motion.span>
      )}
    </AnimatePresence>
  );
};

export default AnimatedToggleText;
