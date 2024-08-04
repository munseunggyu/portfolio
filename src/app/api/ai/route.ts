import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(req: NextRequest) {
  try {
    const gemini_api_key = process.env.NEXT_PUBLIC_AI_KEY!;
    const { message } = await req.json();

    const googleAI = new GoogleGenerativeAI(gemini_api_key);

    const geminiModel = googleAI.getGenerativeModel({
      model: "gemini-pro"
    });
    const personalInfo = {
      age: "저의 나이는 98년생으로 만26살입니다.",
      hobbies:
        "탁구 입니다. 그리고 아직 드럼을 치지는 못하지만 드럼에 관심있습니다.",
      experience:
        "자사 서비스가 있는 소규모 스타트업 모두리치에서 프론트엔드 개발자로 서비스 유지보수 및 기능 개발 업무 담당하였습니다 당시 혼자 프론트엔드 개발자를 맡아 어떠한 문제도 끝까지 해결하려는 끈기를 가지고 있습니다.",
      hose: "본가는 광주광역시에 위치하고 있으며 현재는 경기도 성남시 분당구 야탑동에 거주하고 있습니다.",
      developStart:
        "저는 개발자란 하나의 게이머라고 개발자의 여정은 마치 자신을 성장시키고 스킬을 습득하는 RPG게임과 비슷하다고 생각합니다 처음 개발자로서의 길을 시작하는 것을 마치 게임에서 1차 전직을 하는 것과 같습니다 예를들어 프론트엔드, 백엔드 등의 기초적인 역할들 선택하게 되는데, 이는 게임에서 전사, 마법사 같은 기본 작업을 선택하는 것과 유사하다고 생각합니다 그 후 , 다양한 기술과 도구들을 배우게 됩니다. 이 과정에서 저희는 여러 라이브러리라는 스킬을 습득하게 되고, 이는 게임에서 캐릭터가 다양한 스킬을 찍는 것과 비슨합니다. 예를 들어 프론트엔드 개발자는 js, html, css 같은 기본 기술을 익히고 그 위에 나중에 React, Vue 과 같은 프레임워크를 추가로 배우며 자신의 기술을 점점 더 확장해 나갑니다 또한, 프로젝트를 진행하고 문제를 해결하는 과정은 마치 게임의 퀘스트를 수행하는 것과 같습니다. 각 퀘스트는 새로운 도전과 학습 기회를 제공하며, 이를 통해 저희는 점점 더 강력한 캐릭터로 성장합니다 이러한 개발자로서의 여정은 끝이 없습니다. 항상 새로운 기술과 도구들이 등장하며, 저희는 끊임없이 배우고 성장합니다. 저는 이런 점에서 개발자가 매우 흥미롭고 보람차다고 생각합니다 매일 새로운 것을 배우고, 문제를 해결하며, 자신의 기술을 향상시키는 과정이 마치 RPG 게임을 즐기는 것처럼 재미있고 흥미진진하다고 생각하여 개발을 하게 되었습니다.",
      food: "삼겹살을 가장 좋아합니다",
      MBTI: "저의 MBTI는 INTJ로 새로운 지식과 기술을 습득하는 것을 즐깁니다. 끊임없이 학습하고 성장하려는 욕구가 강합니다."
    };
    const prompt = `
        사용자가 다음과 같은 질문을 했을 때 미리 설정된 개인 정보를 사용하여 답변하세요.
        - 나이: ${personalInfo.age}
        - 취미: ${personalInfo.hobbies}
        - 경력: ${personalInfo.experience}
        - 사는 곳: ${personalInfo.hose}
        - 개발을 시작한 이유: ${personalInfo.developStart}
        - 좋아하는 음식: ${personalInfo.food}
        - MBTI: ${personalInfo.MBTI}
        사용자: ${message}
        AI:
      `;
    const result = await geminiModel.generateContent(prompt);
    const response = result.response;
    const responseMessage = response.text();

    return NextResponse.json({
      message: responseMessage
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      {
        message: "에러 발생"
      },
      { status: 500 }
    );
  }
}
