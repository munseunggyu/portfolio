"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface SkillCardProps {
  skill: {
    name: string;
    icon: string;
  };
}

const item = {
  hidden: { opacity: 0, scale: 0.8 },
  show: { opacity: 1, scale: 1 },
};

export default function SkillCard({ skill }: SkillCardProps) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <motion.div
          variants={item}
          whileHover={{ scale: 1.2, rotate: 5 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="flex items-center justify-center p-3 bg-white/5 rounded-lg hover:bg-white/10 cursor-pointer"
        >
          <Image
            src={skill.icon}
            alt={skill.name}
            width={48}
            height={48}
            className="w-12 h-12 object-contain"
          />
        </motion.div>
      </TooltipTrigger>
      <TooltipContent>
        <p>{skill.name}</p>
      </TooltipContent>
    </Tooltip>
  );
}
