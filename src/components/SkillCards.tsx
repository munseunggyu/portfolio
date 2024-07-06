import { CardHoverEffect } from "./ui/CardHoverEffect";

export default function SkillCards() {
  const projects = [
    {
      title: "HTML/CSS",
      description:
        "1. 웹 접근성 향상을 위해 시멘틱 태그를 적극적으로 활용하며, 웹 표준 준수에 주력합니다. \n2. 실무에서 1년 4개월동안 SASS, SCSS 문법을 사용하였습니다."
    },
    {
      title: "React",
      description:
        "1. 대략 20개가 넘는 클론코딩과 2번의 사이드프로젝트를 진행하여 배포한 경험이 있습니다.\n2. Context API, Zustand 등 상태관리 라이브러리를 사용한 경험이 있습니다.\n3. 순수 자바스크립트로 react와 비슷하게 구현한 경험이 있습니다."
    },
    {
      title: "Vue",
      description:
        "1. 실무에서 1년 4개월동안 사용한 경험이 있습니다. \n2. Vue2에서 Vue3로 마이그레이션한 경험이 있습니다.\n3. Mixins문법을 Composable 문법으로 변경한 경험이 있습니다.\n3. 이전 페이지의 상태를 기억하는 Vue Page Stack을 개발한 경험이 있습니다."
    }
  ];
  return (
    <section id='skills' className='max-w-5xl mx-auto px-8 pt-20'>
      <h2 className='text-center text-3xl font-bold mb-10'>Skills</h2>
      <CardHoverEffect items={projects} />
    </section>
  );
}
