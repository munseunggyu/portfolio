"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import ChatbotWindow from "./ChatbotWindow";

export default function ChatbotButton() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <motion.button
        className="fixed z-30 cursor-pointer bottom-4 right-4 rounded-full w-16 h-16 flex items-center justify-center shadow-lg overflow-hidden"
        onClick={() => setIsOpen(!isOpen)}
        whileTap={{ scale: 0.9 }}
        aria-label={isOpen ? "AI 챗봇 닫기" : "AI 챗봇 열기"}
        aria-expanded={isOpen}
      >
        <Image src={"/images/chat_ai.webp"} alt="챗봇" width={64} height={64} />
      </motion.button>
      {isOpen && <ChatbotWindow />}
    </>
  );
}
