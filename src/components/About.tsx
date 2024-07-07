"use client";

import Image from "next/image";
import React from "react";
import Link from "next/link";
import { CardBody, CardContainer, CardItem } from "./ui/Card3d";
import { FaUser } from "react-icons/fa";
import { MdOutlineMailOutline } from "react-icons/md";
import { FaGithub } from "react-icons/fa";

import profileImg from "../../public/portfoilo-profile.jpeg";

export default function About() {
  const email = "mun9927@naver.com";
  const handleCopy = () => {
    navigator.clipboard.writeText(email);
    alert("이메일 주소가 복사되었습니다.");
  };

  return (
    <section id='about'>
      <CardContainer className='inter-var mt-20'>
        <CardBody className=' relative group/card  hover:shadow-2xl hover:shadow-emerald-500/[0.1] bg-black border-white/[0.2] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border'>
          <CardItem
            as='h2'
            translateZ='60'
            className='text-3xl  max-w-sm mt-2  text-neutral-300'
          >
            About
          </CardItem>
          <CardItem translateZ='100' className='w-full mt-4'>
            <Image
              src={profileImg}
              height='500'
              width='1000'
              className='w-full object-cover rounded-xl group-hover/card:shadow-xl'
              alt='thumbnail'
            />
          </CardItem>
          <div className='flex items-center mt-8'>
            <CardItem
              as='span'
              translateZ='30'
              className=' text-sm max-w-sm mt-2 text-neutral-300'
            >
              <FaUser size={30} />
            </CardItem>
            <CardItem
              as='span'
              translateZ='30'
              className=' text-sm max-w-sm mt-2 text-neutral-300'
            >
              &nbsp; 문승규
            </CardItem>
          </div>
          <div className='flex items-center '>
            <CardItem
              as='span'
              translateZ='30'
              className='text-sm max-w-sm mt-2 text-neutral-300'
            >
              <MdOutlineMailOutline size={30} />
            </CardItem>
            <CardItem
              as='button'
              onClick={handleCopy}
              translateZ='30'
              className='text-sm max-w-sm mt-2 text-neutral-300'
            >
              &nbsp; mun9927@naver.com
            </CardItem>
          </div>
          <div className='flex items-center '>
            <CardItem
              as='span'
              translateZ='30'
              className='text-sm max-w-sm mt-2 text-neutral-300'
            >
              <FaGithub size={30} />
            </CardItem>
            <CardItem
              as={Link}
              href='https://github.com/munseunggyu'
              target='__blank'
              translateZ='30'
              className='text-sm max-w-sm mt-2 text-neutral-300'
            >
              &nbsp; https://github.com/munseunggyu
            </CardItem>
          </div>
        </CardBody>
      </CardContainer>
    </section>
  );
}
