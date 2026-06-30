"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useMotionValue, animate } from "framer-motion";

export function Counter({
  value,
  suffix = "",
  duration = 2,
  className,
}: {
  value: number;
  suffix?: string;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const motionValue = useMotionValue(0);
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    const unsub = motionValue.on("change", (latest) => {
      setDisplay(Math.round(latest).toLocaleString("en-US"));
    });
    return () => unsub();
  }, [motionValue]);

  useEffect(() => {
    if (inView) {
      const controls = animate(motionValue, value, {
        duration,
        ease: [0.22, 1, 0.36, 1],
      });
      return controls.stop;
    }
  }, [inView, value, duration, motionValue]);

  return (
    <span ref={ref} className={className}>
      {display}
      <span className="text-copper-400">{suffix}</span>
    </span>
  );
}
