import { Spotlight } from "./ui/Spotlight";
import { TextGenerateEffect } from "./ui/TextGenerateEffect";

export default function Intro() {
  return (
    <div className='pt-36'>
      <div>
        <Spotlight
          className='-top-40 -left-10 md:-left-32 md:-top-20 h-screen'
          fill='white'
        />
        <Spotlight className='h-[80vh] w-[50vw] top-10 left-full' fill='blue' />
        <Spotlight className='left-80 top-28 h-[80vh] w-[50vw]' fill='blue' />
      </div>

      <div className='flex justify-center relative mt-20 z-10'>
        <div className='max-w-[89vw] md:max-w-2xl lg:max-w-[60vw] flex flex-col items-center justify-center'>
          <TextGenerateEffect
            words='프론트엔드 개발자 문승규'
            className='text-center text-[40px] md:text-5xl text-3xl'
          />

          <p className='text-center md:tracking-wider mb-4 text-sm md:text-md lg:text-md'>
            - 스타트업에서의 업무를 경험하면서 프로덕트의 오너십을 가지고
            주도적인 의견을 내는 것을 지향하며,
            <br /> 문제를 해결할 때 유저의 입장에서 생각하려고 노력합니다.
          </p>
          <p className='text-center md:tracking-wider mb-4 text-sm md:text-md lg:text-md'>
            - 상대방의 입장과 생각을 고려하면서, 효과적인 커뮤니케이션을 하려
            노력합니다.
          </p>
          <p className='text-center md:tracking-wider mb-4 text-sm md:text-md lg:text-md'>
            - 새로운 기술을 학습하고 적용하는 것을 좋아합니다.
          </p>
        </div>
      </div>
    </div>
  );
}
