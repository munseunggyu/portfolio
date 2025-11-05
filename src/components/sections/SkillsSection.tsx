"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Card } from "@/components/ui/card";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SectionWrapper } from "@/components/layout";
import { SkillCard } from "@/components/cards";
import { SKILLS } from "@/lib/constants";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export default function SkillsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <SectionWrapper id="skills" title="Skills">
      <Card className="bg-black/40 border-white/10 p-8 backdrop-blur-sm" ref={ref}>
        <TooltipProvider>
          <motion.div
            variants={container}
            initial="hidden"
            animate={isInView ? "show" : "hidden"}
            className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-7 gap-6"
          >
            {SKILLS.map((skill) => (
              <SkillCard key={skill.name} skill={skill} />
            ))}
          </motion.div>
        </TooltipProvider>
      </Card>
    </SectionWrapper>
  );
}
