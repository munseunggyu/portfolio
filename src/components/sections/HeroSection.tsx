"use client";

import { motion, useScroll, useTransform } from "framer-motion";

export default function HeroSection() {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.8]);

  return (
    <section className="pt-32 pb-20 px-4">
      <div className="container mx-auto text-center">
        <motion.div style={{ opacity, scale }}>
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-5xl md:text-6xl font-bold text-white mb-6 text-balance"
          >
            프론트엔드 개발자 문승규
          </motion.h1>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, staggerChildren: 0.2 }}
            className="space-y-2 text-white/70 text-lg"
          >
            {[
              "- 주어진 문제를 단순히 해결하는 데 그치지 않고, 근본적인 원인을 찾아 구조적으로 개선하는 것을 중요하게 생각합니다.",
              "- 프로젝트 전반에서 빌드 환경 최적화, 데이터 처리 효율 개선, 서비스 구조 리팩터링 등을 주도하며 성능과 개발 효율을 동시에 높여왔습니다.",
              "- 서비스 품질을 높이기 위한 고민을 멈추지 않으며, 팀과 함께 성장하는 방향으로 일하는 것을 지향합니다.",
            ].map((text, index) => (
              <motion.p
                key={index}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + index * 0.2, duration: 0.6 }}
              >
                {text}
              </motion.p>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
