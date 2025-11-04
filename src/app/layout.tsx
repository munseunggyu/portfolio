import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ENV } from "@/lib/constants";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Frontend Developer Portfolio | 프론트엔드 개발자 포트폴리오",
    template: "%s | Frontend Developer Portfolio",
  },
  description: "React, Next.js, TypeScript를 활용한 프론트엔드 개발자의 포트폴리오입니다.",
  keywords: [
    "프론트엔드 개발자",
    "Frontend Developer",
    "React",
    "Next.js",
    "TypeScript",
    "웹 개발",
    "포트폴리오",
    "Portfolio",
    "JavaScript",
    "Vue.js",
  ],
  metadataBase: new URL(ENV.NEXT_PUBLIC_APP_URL),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: ENV.NEXT_PUBLIC_APP_URL,
    title: "Frontend Developer Portfolio | 프론트엔드 개발자 포트폴리오",
    description: "React, Next.js, TypeScript를 활용한 프론트엔드 개발자의 포트폴리오입니다.",
    siteName: "Frontend Developer Portfolio",
    images: [
      {
        url: "/images/profile_image.webp",
        width: 1200,
        height: 630,
        alt: "Frontend Developer Portfolio",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
  verification: {
    google: "your-google-verification-code", // Google Search Console 인증 코드
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-linear-to-br from-slate-950 via-blue-950 to-slate-950`}
      >
        {children}
      </body>
    </html>
  );
}
