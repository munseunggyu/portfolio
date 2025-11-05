"use client";

import { SectionWrapper } from "@/components/layout";
import { AboutCard } from "@/components/cards";

export default function AboutSection() {
  return (
    <SectionWrapper id="about" title="About">
      <AboutCard
        name="문승규"
        email="mun9927@naver.com"
        github="https://github.com/munseunggyu"
        profileImage="/images/profile_image.webp"
      />
    </SectionWrapper>
  );
}
