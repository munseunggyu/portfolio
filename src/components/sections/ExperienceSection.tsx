"use client";

import { useRef } from "react";
import { useInView } from "framer-motion";
import { SectionWrapper } from "@/components/layout";
import { ExperienceCard } from "@/components/cards";
import { experiences } from "@/lib/data/experiences";

export default function ExperienceSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <SectionWrapper id="workexperience" title="Work Experience">
      <div className="space-y-8" ref={ref}>
        {experiences.map((experience, index) => (
          <ExperienceCard key={experience.id} experience={experience} index={index} isInView={isInView} />
        ))}
      </div>
    </SectionWrapper>
  );
}
