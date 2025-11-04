"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";
import type { Experience } from "@/lib/types";

interface ExperienceCardProps {
  experience: Experience;
  index: number;
  isInView: boolean;
}

export default function ExperienceCard({ experience, index, isInView }: ExperienceCardProps) {
  const [expandedPerformance, setExpandedPerformance] = useState<Record<number, boolean>>({});

  const togglePerformance = (taskIndex: number) => {
    setExpandedPerformance((prev) => ({
      ...prev,
      [taskIndex]: !prev[taskIndex],
    }));
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      whileHover={{ scale: 1.02, x: 10 }}
    >
      <Card className="bg-black/40 border-white/10 p-8 backdrop-blur-sm">
        <div className="flex items-start gap-6">
          <motion.div
            className={`w-20 h-20 rounded-full bg-gradient-to-br ${experience.gradient} flex items-center justify-center shrink-0`}
            whileHover={{ rotate: 360, scale: 1.1 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-3xl font-bold text-white">{experience.logo}</span>
          </motion.div>
          <div className="flex-1">
            <h3 className="text-2xl font-bold text-white mb-2">{experience.name}</h3>
            <p className="text-white/60 mb-4">{experience.period}</p>

            <div className="space-y-6">
              {experience.tasks.map((task, taskIndex) => (
                <motion.div
                  key={taskIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ delay: index * 0.2 + taskIndex * 0.1 + 0.3 }}
                  className={task.hasBorder ? "pt-6 border-t border-white/10" : ""}
                >
                  <h4 className="text-xl font-semibold text-white mb-2">{task.title}</h4>
                  <p className="text-white/70 mb-4">{task.description}</p>

                  {/* 신규 개발 섹션 */}
                  <div className="mb-4">
                    <h5 className="text-lg font-semibold text-white/90 mb-3">신규 개발</h5>
                    <motion.ul
                      className="space-y-2 text-white/70"
                      initial="hidden"
                      animate={isInView ? "visible" : "hidden"}
                      variants={{
                        visible: {
                          transition: {
                            staggerChildren: 0.1,
                            delayChildren: index * 0.2 + taskIndex * 0.1 + 0.4,
                          },
                        },
                      }}
                    >
                      {task.newDevelopments.map((item, itemIndex) => (
                        <motion.li
                          key={itemIndex}
                          variants={{
                            hidden: { opacity: 0, x: -20 },
                            visible: { opacity: 1, x: 0 },
                          }}
                          whileHover={{ x: 10, color: "rgb(255, 255, 255)" }}
                          className="leading-relaxed"
                        >
                          • {item}
                        </motion.li>
                      ))}
                    </motion.ul>
                  </div>

                  {/* 성능 이슈 파악 및 개선 섹션 */}
                  {task.performanceImprovements && task.performanceImprovements.length > 0 && (
                    <div>
                      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                        <Button
                          variant="ghost"
                          className="w-full text-white/70 hover:text-white hover:bg-white/10 mb-3"
                          onClick={() => togglePerformance(taskIndex)}
                        >
                          <span className="text-lg font-semibold">성능 이슈 파악 및 개선</span>
                          {expandedPerformance[taskIndex] ? (
                            <ChevronUp className="ml-2 w-4 h-4" />
                          ) : (
                            <ChevronDown className="ml-2 w-4 h-4" />
                          )}
                        </Button>
                      </motion.div>

                      <AnimatePresence>
                        {expandedPerformance[taskIndex] && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="space-y-4 overflow-hidden"
                          >
                            {task.performanceImprovements.map((improvement, improvementIndex) => (
                              <motion.div
                                key={improvementIndex}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: improvementIndex * 0.1 }}
                                className="bg-white/5 rounded-lg p-4 space-y-3 border border-white/10"
                              >
                                <h6 className="text-base font-semibold text-white">{improvement.title}</h6>
                                <div className="space-y-2 text-sm">
                                  <div>
                                    <span className="text-red-400 font-medium">문제:</span>
                                    <p className="text-white/70 mt-1 leading-relaxed">{improvement.problem}</p>
                                  </div>
                                  <div>
                                    <span className="text-orange-400 font-medium">원인:</span>
                                    <p className="text-white/70 mt-1 leading-relaxed">{improvement.cause}</p>
                                  </div>
                                  <div>
                                    <span className="text-blue-400 font-medium">해결:</span>
                                    <p className="text-white/70 mt-1 leading-relaxed">{improvement.solution}</p>
                                  </div>
                                  <div>
                                    <span className="text-green-400 font-medium">성과:</span>
                                    <p className="text-white/70 mt-1 leading-relaxed">{improvement.result}</p>
                                  </div>
                                </div>
                              </motion.div>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
