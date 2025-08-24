'use client'

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

export default function LoginBtn(){
  const { data: session, status } = useSession();

  // 로딩 중일 때는 아무것도 표시하지 않음
  if (status === "loading") {
    return <div className="h-[30px] w-[60px]"></div>; // 레이아웃 시프트 방지
  }

  return(
    <>
      {session ? (
        <button 
          onClick={() => signOut({callbackUrl: '/', redirect: true})} 
          className="
            h-[30px] 
            rounded-md 
            border-1 border-[#4d5566] 
            pl-[10px] pr-[10px] 
            text-center text-sm 
            text-[#4d5566] 
            font-[500]
          "
        >
          로그아웃
        </button>
      ) : (
        <Link 
          href="/login" 
          className="
            flex items-center justify-center
            h-[30px] 
            rounded-md 
            border-1 border-[#4d5566] 
            pl-[10px] pr-[10px] 
            text-center text-sm 
            text-[#4d5566] 
            font-[500]
          "
        >
          로그인
        </Link>
      )}
    </>
  )
}