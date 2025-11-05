"use client";

import { motion } from "framer-motion";
import { SectionWrapper } from "@/components/layout";
import { ProjectCard } from "@/components/cards";
import { projects } from "@/lib/data/projects";

export default function ProjectsSection() {
  return (
    <SectionWrapper id="projects" title="Projects" maxWidth="6xl" className="pb-32">
      <motion.div
        className="grid md:grid-cols-2 gap-8 items-start"
        initial="hidden"
        animate="visible"
        variants={{
          visible: {
            transition: {
              staggerChildren: 0.2,
            },
          },
        }}
      >
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </motion.div>
    </SectionWrapper>
  );
}
