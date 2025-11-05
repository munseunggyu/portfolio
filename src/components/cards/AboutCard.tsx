"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Mail, Github } from "lucide-react";

interface AboutCardProps {
  name: string;
  email: string;
  github: string;
  profileImage: string;
}

export default function AboutCard({ name, email, github, profileImage }: AboutCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      whileHover={{ scale: 1.02 }}
    >
      <Card className="bg-black/40 border-white/10 p-8 backdrop-blur-sm">
        <div className="flex flex-col items-center gap-6">
          <motion.div
            className="w-48 h-48 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center overflow-hidden"
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Image src={profileImage} alt="Profile" width={192} height={192} className="w-full h-full object-cover" />
          </motion.div>
          <motion.div
            className="text-center space-y-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <h3 className="text-2xl font-bold text-white">{name}</h3>
            <motion.div
              className="flex items-center justify-center gap-2 text-white/70"
              whileHover={{ scale: 1.05, color: "rgb(255, 255, 255)" }}
            >
              <Mail className="w-4 h-4" />
              <span>{email}</span>
            </motion.div>
            <motion.div className="flex items-center justify-center gap-2 text-white/70" whileHover={{ scale: 1.05 }}>
              <Github className="w-4 h-4" />
              <a href={github} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                {github}
              </a>
            </motion.div>
          </motion.div>
        </div>
      </Card>
    </motion.div>
  );
}
