"use client";

import { motion, useReducedMotion } from "motion/react";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  /** Seconds. Use to stagger siblings. */
  delay?: number;
};

/**
 * Scroll-reveal wrapper. Subtle fade/rise, plays once. Renders plain markup under
 * prefers-reduced-motion. Without JS the layout's <noscript> rule keeps content visible.
 */
export function Reveal({ children, className, delay = 0 }: RevealProps) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <motion.div
      data-reveal
      className={className}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 0.45, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
