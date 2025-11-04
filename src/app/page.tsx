import { Navigation } from "@/components/layout";
import { HeroSection, AboutSection, SkillsSection, ExperienceSection, ProjectsSection } from "@/components/sections";

export default function PortfolioPage() {
  return (
    <div className="min-h-screen ">
      <Navigation />
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ExperienceSection />
      <ProjectsSection />
    </div>
  );
}
