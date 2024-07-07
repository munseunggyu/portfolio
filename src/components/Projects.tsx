"use client";

import Image from "next/image";
import React, { useState } from "react";
import { CardBody, CardContainer, CardItem } from "./ui/Card3d";
import { motion } from "framer-motion";
import triplusImg from "../../public/project-trplus.png";
import secretLionImg from "../../public/project-secretLion.png";
import profileImg from "../../public/portfoilo-profile.jpeg";

import { FaExternalLinkAlt } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";

export default function Projects() {
  const initialProjectsData = [
    {
      title: "Portfolio",
      img: profileImg,
      period: "(2024.07 ~ 2024.07)",
      intro:
        "개인 포트폴리오 웹 사이트입니다.\nframer-motion 라이브러리를 활용하여 인터랙티브하고 반응형 애니메이션을 구현",
      member: "FE 1명",
      contribute: "100",
      skills: "Next.js, Tailwind CSS",
      github: "https://github.com/munseunggyu/Secret-Lion",
      detail: false
    },
    {
      title: "triPlus",
      img: triplusImg,
      period: "(2022.12.09 ~ 2023.01.05)",
      intro:
        "triPlus는 다양한 사용자들의 폭넓은 여행 후기 및 자신의 여행 상품을 홍보할 수 있는 SNS서비스입니다.",
      contents:
        "1. 사용자 경험을 개선하고, 콘텐츠 노출을 극대화하귀 위해 무한 스크롤 구현\n2. 서버에 부하를 줄이기위해 검색 기능에 디바운싱 적용\n3. Custom Hooks를 이용하여 코드의 재사용성 증가\n4. 이미지 스프라이트 기법을 활용하여 자주 변경되지 않는 25개의 이미지를 하나의 이미지로 통합함으로써, 해당 이미지 로딩 시간 약 10배 가량 단축",
      member: "FE 4명",
      contribute: "39",
      skills: "React, Styled-Components",
      github: "https://github.com/munseunggyu/triplus",
      detail: false
    },
    {
      title: "Secret-Lion",
      img: secretLionImg,
      period: "(2022.11.03 ~ 2022.12.08)",
      intro:
        "순수 자바스크립트로 SPA 구현한 '비밀멋사'는 온라인으로 진행하는 부트캠프 훈련생간의 더욱 활발한 소통을 위한 익명 커뮤니티 서비스입니다.",
      contents:
        "1. 싱글 페이지 애플리케이션(SPA) 기능을 위해 window.pushState와 window.onpopstate를 이용한 커스텀 라우터를 개발\n2. 상태관리와 렌더링 로직을 위해 initialize로 최초 상태 값과 컴포넌트를 저장한 이후 상태 값이 변경 되었을 경우 replaceWith 메서드를 사용하여 DOM을 효율적으로 업데이트",
      member: "FE 4명",
      contribute: "20",
      skills: "JavaScript, Firebase",
      github: "https://github.com/munseunggyu/Secret-Lion",
      live: "https://secret-lion.netlify.app/",
      detail: false
    }
  ];
  const [projects, setProjects] = useState(initialProjectsData);

  const toggleContent = (title: string) => {
    const newProjects = projects.map(project => {
      if (project.title === title) {
        return {
          ...project,
          detail: !project.detail
        };
      }
      return project;
    });
    setProjects(newProjects);
  };
  return (
    <section id='projects' className='flex flex-col items-center pt-20'>
      <h2 className='text-center text-3xl mb-10 font-bold'>Projects</h2>
      <ul className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
        {projects.map((project, idx) => {
          return (
            <li key={idx}>
              <CardContainer className='inter-var '>
                <CardBody className='relative group/card  hover:shadow-2xl hover:shadow-emerald-500/[0.1] bg-black border-white/[0.2] w-auto sm:w-[28rem] h-auto rounded-xl p-6 border  '>
                  <CardItem
                    as='h3'
                    translateZ='50'
                    className='text-2xl font-bold text-neutral-300 text-center block w-full mb-2 leading-5'
                  >
                    {project.title}
                    <br />
                    <span className='text-xs mt-2  text-[#abb2b8]'>
                      {project.period}
                    </span>
                  </CardItem>

                  <CardItem translateZ='100' className='w-full mt-4'>
                    <Image
                      src={project.img}
                      height='500'
                      width='1000'
                      className='w-full object-cover rounded-xl group-hover/card:shadow-xl'
                      alt='thumbnail'
                    />
                  </CardItem>

                  <CardItem
                    as='p'
                    translateZ='30'
                    className='text-sm max-w-sm mt-4 text-neutral-300 whitespace-pre-wrap'
                  >
                    {project.intro}
                  </CardItem>
                  <CardItem
                    as='button'
                    translateZ='30'
                    className='text-sm max-w-sm mt-4 text-neutral-300 underline'
                    onClick={() => toggleContent(project.title)}
                  >
                    {project.detail ? "숨기기" : "상세 보기"}
                  </CardItem>
                  <CardItem
                    as='div'
                    translateZ='30'
                    className='text-sm max-w-sm mt-4 text-neutral-300 whitespace-pre-wrap'
                  >
                    <motion.p
                      initial={{ height: 0, opacity: 0 }}
                      animate={{
                        height: project.detail ? "auto" : 0,
                        opacity: project.detail ? 1 : 0
                      }}
                      transition={{ duration: 0.5 }}
                      style={{ overflow: "hidden" }}
                    >
                      {project.contents}
                    </motion.p>
                  </CardItem>

                  <hr className='my-4' />
                  <CardItem
                    as='span'
                    translateZ='40'
                    className='text-xs mt-2  text-[#abb2b8] leading-5 block w-full'
                  >
                    팀 구성: {project.member}
                    <br />
                    기여도: {project.contribute}%
                    <br />
                    기술스택: {project.skills}
                    <br />
                    <br />
                    <div className='flex gap-2 justify-end'>
                      {" "}
                      {project.live && (
                        <a href={project.live} target='_blank'>
                          <FaExternalLinkAlt size={20} />
                        </a>
                      )}
                      <a href={project.github} target='_blank'>
                        <FaGithub size={20} />
                      </a>
                    </div>
                  </CardItem>
                </CardBody>
              </CardContainer>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
