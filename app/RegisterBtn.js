'use client'

import { useSession } from "next-auth/react";
import Link from "next/link";

export default function RegisterButton(){
  const { data: session, status } = useSession();

  if (status === "loading" || session) {
    return null;
  }

  return (
    <Link 
      href="/register" 
      className="
        flex items-center justify-center 
        h-[30px] 
        rounded-md 
        border-1 border-[#4d5566] 
        bg-[#4d5566] 
        pl-[10px] pr-[10px] 
        text-center text-sm 
        text-[#f3f2ff] 
        font-[500]
      "
    >
      회원가입
    </Link>
  );
}