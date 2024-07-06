"use client";

import Image from "next/image";
import React from "react";
import { CardBody, CardContainer, CardItem } from "./ui/Card3d";

import triplusImg from "../../public/project-trplus.png";
import secretLionImg from "../../public/project-secretLion.png";

export default function Projects() {
  const projects = [
    {
      title: "Secret-Lion",
      img: secretLionImg,
      period: "(2022.11.03 ~ 2022.12.08)",
      intro:
        "'비밀멋사'는 온라인으로 진행하는 부트캠프 훈련생간의 더욱 활발한 소통을 위한 익명 커뮤니티 서비스입니다.\n순수 자바스크립트로 SPA 구현",
      member: "프론트엔드 4명",
      contribute: "20",
      skills: "JavaScript, Firebase",
      github: "https://github.com/munseunggyu/Secret-Lion"
    },
    {
      title: "triplus",
      img: triplusImg,
      period: "(2022.12.09 ~ 2023.01.05)",
      intro:
        "triPlus는 다양한 사용자들의 폭넓은 여행 후기 및 자신의 여행 상품을 홍보할 수 있는 SNS서비스입니다.\n\nReact로 처음 진행한 팀 프로젝트로 무한 스크롤기능과 디바운싱을 이용하여 최적화를 진행하였고 Custom Hooks를 이용하여 코드의 재사용성을 높였습니다.",
      member: "프론트엔드 4명",
      contribute: "39",
      skills: "React, Styled-Components",
      github: "https://github.com/munseunggyu/triplus"
    }
  ];
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
                      {"(2022.12.09 ~ 2023.01.05)"}
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
                  <hr className='my-4' />
                  <CardItem
                    as='span'
                    translateZ='40'
                    className='text-xs mt-2  text-[#abb2b8]  block w-full'
                  >
                    팀 구성: {project.member}
                    <br />
                    기여도: {project.contribute}%
                    <br />
                    기술스택: {project.skills}
                    <br />
                    <a href={project.github} target='_blank'>
                      깃허브: 링크
                    </a>
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
