"use client";

import { useRef, type ReactNode } from "react";
import { motion, useInView } from "framer-motion";

interface SectionWrapperProps {
  id: string;
  title: string;
  children: ReactNode;
  maxWidth?: "4xl" | "6xl";
  className?: string;
  contentDelay?: number;
}

export default function SectionWrapper({
  id,
  title,
  children,
  maxWidth = "4xl",
  className = "",
  contentDelay = 0.2,
}: SectionWrapperProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const maxWidthClass = maxWidth === "6xl" ? "max-w-6xl" : "max-w-4xl";

  return (
    <section id={id} className={`py-20 px-4 ${className}`} ref={ref}>
      <div className={`container mx-auto ${maxWidthClass}`}>
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold text-white text-center mb-12"
        >
          {title}
        </motion.h2>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.6, delay: contentDelay }}
        >
          {children}
        </motion.div>
      </div>
    </section>
  );
}
