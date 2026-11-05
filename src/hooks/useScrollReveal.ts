"use client";

import { useReducedMotion, Variants } from "framer-motion";

export function useScrollReveal(delay = 0, yOffset = 24) {
  const shouldReduceMotion = useReducedMotion();

  const variants: Variants = {
    hidden: {
      opacity: 0,
      y: shouldReduceMotion ? 0 : yOffset,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0.1 : 0.6,
        delay,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const viewportConfig = {
    once: true,
    margin: "-60px",
  };

  return { variants, viewportConfig };
}
