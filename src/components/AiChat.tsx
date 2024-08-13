"use client";

import { FormEventHandler, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoIosArrowBack } from "react-icons/io";
import LoadingUi from "./ui/LoadingUi";
import chatAiImg from "../../public/chatAi.webp";
import Image from "next/image";

export default function Chatbot() {
  const bottomOfPanelRef = useRef<HTMLLIElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<
    { text: string; sender: string; isLoading: boolean }[]
  >([]);
  const [isLoading, setIsLoading] = useState(false);
  const [input, setInput] = useState("");
  const [startChat, setStartChat] = useState(false);
  const questionList = [
    { value: "나이" },
    { value: "취미" },
    { value: "사는 곳" },
    { value: "개발을 시작한 이유" },
    { value: "경력" },
    { value: "좋아하는 음식" },
    { value: "MBTI" }
  ];
  const handleChat = async (message: string, type: string) => {
    if (message.trim().length === 0) return;
    const aiChatCount = localStorage.getItem("count");
    if (!aiChatCount) {
      localStorage.setItem("count", "1");
    } else {
      localStorage.setItem("count", String(Number(aiChatCount) + 1));
    }
    if (Number(aiChatCount) > 2) {
      alert(
        "질문 횟수가 초과되었습니다.\n 더 궁금한 사항이 있으시면 연락해 주세요. 감사합니다."
      );
      return;
    }
    if (type === "button") {
      setStartChat(true);
    } else {
      if (!message.trim()) return;
    }
    const userMessage = { text: message, sender: "user", isLoading: false };
    setMessages([...messages, userMessage]);
    setInput("");
    let botMessage = {
      text: "",
      sender: "bot",
      isLoading: true
    };
    setIsLoading(true);
    setMessages(prevMessages => [...prevMessages, botMessage]);
    try {
      const res = await fetch(process.env.NEXT_PUBLIC_BASE_URL + "api/ai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          message
        })
      });
      const resultMessage = await res.json();
      if (res.status === 500) {
        botMessage = {
          text: "에러 발생",
          sender: "bot",
          isLoading: false
        };
        setMessages(prevMessages => {
          return prevMessages.map((prevMessage, idx) => {
            if (
              idx === prevMessages.length - 1 &&
              prevMessage.sender === "bot"
            ) {
              return { ...botMessage };
            }
            return prevMessage;
          });
        });
        setIsLoading(false);
        return;
      }
      botMessage = {
        text: resultMessage.message,
        sender: "bot",
        isLoading: false
      };
      setMessages(prevMessages => {
        return prevMessages.map((prevMessage, idx) => {
          if (idx === prevMessages.length - 1 && prevMessage.sender === "bot") {
            return { ...botMessage };
          }
          return prevMessage;
        });
      });
      setIsLoading(false);
    } catch (err) {
      console.log("err", err);
    }
  };

  const handleSendMessage: FormEventHandler = async e => {
    e.preventDefault();
    handleChat(input, "submit");
  };

  useEffect(() => {
    if (bottomOfPanelRef.current) {
      bottomOfPanelRef.current.scrollIntoView({
        behavior: "smooth"
      });
    }
  }, [isLoading]);

  return (
    <>
      <motion.button
        className='fixed z-30 bottom-4 right-4 bg-blue-500  rounded-full w-16 h-16 flex items-center justify-center text-2xl shadow-lg overflow-hidden'
        onClick={() => setIsOpen(!isOpen)}
        whileTap={{ scale: 0.9 }}
      >
        <Image src={chatAiImg} alt='챗봇' width={64} height={64} />
      </motion.button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className='fixed bottom-[90px] right-4 w-80 z-30 h-[500px] border border-gray-300 rounded-lg bg-white shadow-lg flex flex-col overflow-hidden'
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.3 }}
          >
            <div className='bg-blue-500  p-4 text-center font-bold  '>
              {startChat && (
                <IoIosArrowBack
                  size={20}
                  className='absolute top-[18px] cursor-pointer'
                  onClick={() => setStartChat(false)}
                />
              )}
              <span>AI 챗봇</span>
            </div>
            {startChat ? (
              <>
                <ul className='flex-1 p-4 overflow-y-auto'>
                  {messages.map((msg, index) => (
                    <li
                      key={index}
                      className={`  flex ${
                        msg.sender === "user"
                          ? " justify-end text-right"
                          : "justify-start"
                      }`}
                    >
                      {!msg.isLoading ? (
                        <p
                          className={`rounded mb-2 p-2 w-fit max-w-[200px] ${
                            msg.sender === "user"
                              ? "bg-blue-400 "
                              : "bg-gray-500 "
                          }`}
                        >
                          {msg.text}
                        </p>
                      ) : (
                        <LoadingUi />
                      )}
                    </li>
                  ))}
                  <li
                    ref={bottomOfPanelRef}
                    className='w-1 h-1 text-black'
                  ></li>
                </ul>
                <form
                  className='border-t border-gray-300 p-2 flex'
                  onSubmit={handleSendMessage}
                >
                  <input
                    type='text'
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    className='flex-1 p-2 border-none outline-none text-black'
                    placeholder='메시지를 입력하세요...'
                  />
                  <button
                    className='bg-blue-500  px-4 py-2 ml-2 rounded disabled:bg-blue-200'
                    disabled={input.trim().length === 0}
                  >
                    전송
                  </button>
                </form>
              </>
            ) : (
              <>
                <div className='bg-white shadow-lg rounded-lg p-6 max-w-sm'>
                  <p className='text-lg font-semibold text-gray-800 mb-2'>
                    안녕하세요 프론트엔드 개발자 문승규입니다.
                  </p>
                  <p className='text-gray-600 mb-2 text-[13px]'>
                    저에 대해 궁금한 점이 있으신가요?
                    <br /> 이 챗봇을 통해 저에 관한 여러 가지 정보를 알아보실 수
                    있습니다.
                    <br /> 챗봇은 최대 3회까지 질문에 답변드리며, 더 자세한
                    사항이 궁금하시다면 언제든지 저에게 연락해 주세요.
                  </p>

                  <ul className='flex flex-wrap gap-2'>
                    {questionList.map(question => (
                      <li key={question.value}>
                        <button
                          className={` text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-500  bg-blue-400`}
                          onClick={() => handleChat(question.value, "button")}
                        >
                          {question.value}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
                <button
                  className={`bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg  w-[90%] mt-5 mx-auto `}
                  onClick={() => setStartChat(true)}
                >
                  시작하기
                </button>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
