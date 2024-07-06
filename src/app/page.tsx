import Intro from "@/components/Intro";
import SkillCards from "@/components/SkillCards";
import Projects from "@/components/Projects";
import { FloatingNav } from "@/components/ui/FloatingNav";
import About from "@/components/About";

export default function Home() {
  const navItems = [
    { name: "About", link: "#about" },
    { name: "Skills", link: "#skills" },
    { name: "Projects", link: "#projects" }
  ];

  return (
    <main className='relative bg-black-100 flex justify-center items-center flex-col overflow-hidden mx-auto sm:px-10 px-5'>
      <div className='max-w-7xl w-full'>
        <FloatingNav navItems={navItems} />
        <Intro />
        <About />
        <SkillCards />
        <Projects />
      </div>
    </main>
  );
}
