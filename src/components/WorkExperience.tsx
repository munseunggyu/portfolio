import React from "react";

import monstockLogo from "../../public/monstock.svg";
import { cn } from "@/utils/cn";
import { WorkItem } from "./ui/WorkItem";

export default function WorkExperience() {
  const data = [
    {
      id: 4,
      title: "주식회사 모두리치",
      description: "",
      className: "lg:col-span-2 md:col-span-3 md:row-span-1",
      imgClassName: "",
      contentsClassName: "items-center",
      img: monstockLogo
    },

    {
      id: 5,
      title: "업무",
      description: `- 하이브리드 앱 멤버십 정기 구독 결제 기능
- 하이브리드 앱 단건 결제 기능
- 하이브리드 앱 보상형 광고 기능
- 소셜 로그인 기능 구현(카카오)
- 주식이나 코인의 실시간 시세를 이용한 모의투자 게임(데이트레이딩) 기능 개발
- Vue2 → Vue3 마이그레이션
- 매일 한 번만 변경되는 대략 3천개의 주식, 코인 데이터를 indexedb 기술을 도입하여 불필요한 호출 제거(대략 150ms의 서버 호출 시간 절약) 와 메모리 효율 향상
- 코드의 가독성 향상을 위한 Vue Mixins 문법 → Composable로 변경
      `,
      className: "md:col-span-3 md:row-span-2",
      contentsClassName: "",
      titleClassName: "mb-2"
    },
    {
      id: 6,
      title: "블록체인과 투자정보가 만난 투자정보\n공유 서비스(하이브리드 앱)",
      description: "",
      className: "lg:col-span-2 md:col-span-3 md:row-span-1",
      imgClassName: "",
      contentsClassName:
        "justify-center md:max-w-full max-w-60 text-center font-[22px]"
    }
  ];
  return (
    <section id='work' className='pt-20 px-8 max-w-5xl mx-auto'>
      <h2 className='text-center text-3xl  font-bold mb-10'>Work Experience</h2>
      <div
        className={cn(
          "grid grid-cols-1 md:grid-cols-6 lg:grid-cols-5 md:grid-row-7 gap-4 lg:gap-8 mx-auto px-2"
        )}
      >
        {data.map((item, idx) => {
          return (
            <WorkItem
              id={item.id}
              key={idx}
              title={item.title}
              description={item.description}
              className={item.className}
              img={item.img}
              imgClassName={item.imgClassName}
              contentsClassName={item.contentsClassName}
              titleClassName={item.titleClassName}
            />
          );
        })}
      </div>
    </section>
  );
}
