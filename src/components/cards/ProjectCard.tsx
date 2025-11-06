"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Github, ExternalLink, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { Project } from "@/lib/types";

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggle = () => {
    setIsExpanded((prev) => !prev);
  };
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0 },
      }}
      whileHover={{ y: -10 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="bg-black/40 border-white/10 overflow-hidden backdrop-blur-sm h-full">
        <motion.div
          className="aspect-video relative overflow-hidden"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        >
          <Image src={project.thumbnail} alt={project.title} fill className="object-cover" />
        </motion.div>
        <div className="p-6 space-y-4">
          <motion.h3 className="text-2xl font-bold text-white" whileHover={{ scale: 1.05, x: 10 }}>
            {project.title}
          </motion.h3>
          <p className="text-white/60 text-sm">{project.period}</p>
          <p className="text-white/70 whitespace-pre-line min-h-[50px] ">{project.description}</p>

          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button
              variant="ghost"
              className="w-full text-white/70 hover:text-white hover:bg-white/10"
              onClick={handleToggle}
            >
              {isExpanded ? (
                <>
                  상세 정보 접기 <ChevronUp className="ml-2 w-4 h-4" />
                </>
              ) : (
                <>
                  상세 정보 보기 <ChevronDown className="ml-2 w-4 h-4" />
                </>
              )}
            </Button>
          </motion.div>

          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-4 pt-4 border-t border-white/10"
            >
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
                <h4 className="text-white font-semibold mb-3">상세 소개</h4>
                <ul className="space-y-2">
                  {project.details.intro.map((item, index) => (
                    <li key={index} className="text-white/70 text-sm leading-relaxed flex gap-2">
                      <span className="text-white/50 ">•</span>
                      <span className="flex-1">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
                <h4 className="text-white font-semibold mb-2">팀 구성</h4>
                <p className="text-white/70 text-sm">{project.details.team}</p>
              </motion.div>
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
                <h4 className="text-white font-semibold mb-2">기술 스택</h4>
                <p className="text-white/70 text-sm">{project.details.tech}</p>
              </motion.div>
              <motion.div
                className="flex gap-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                {project.details.links.service && (
                  <motion.div className="flex-1" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <a href={project.details.links.service} target="_blank" rel="noopener noreferrer" className="block">
                      <Button variant="outline" size="sm" className="w-full border-white/20 text-white bg-transparent">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        서비스 링크
                      </Button>
                    </a>
                  </motion.div>
                )}
                <motion.div className="flex-1" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <a href={project.details.links.github} target="_blank" rel="noopener noreferrer" className="block">
                    <Button variant="outline" size="sm" className="w-full border-white/20 text-white bg-transparent">
                      <Github className="w-4 h-4 mr-2" />
                      GitHub
                    </Button>
                  </a>
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </div>
      </Card>
    </motion.div>
  );
}
