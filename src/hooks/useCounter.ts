"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

export function useCounter(endValue: number, duration = 1200, startOnView = true) {
  const [count, setCount] = useState(0);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (!startOnView) return;
    if (shouldReduceMotion) {
      setCount(endValue);
      return;
    }

    let start = 0;
    const startTime = performance.now();

    const updateCounter = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(easedProgress * endValue);

      setCount(current);

      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      } else {
        setCount(endValue);
      }
    };

    const animId = requestAnimationFrame(updateCounter);
    return () => cancelAnimationFrame(animId);
  }, [endValue, duration, startOnView, shouldReduceMotion]);

  return count;
}
