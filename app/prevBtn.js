'use client'

import { useRouter, usePathname } from "next/navigation";


export default function PrevBtn(){
  const router = useRouter();
  const pathname = usePathname();


  // 메인화면(/)에서는 버튼을 표시하지 않음
  if (pathname === '/') {
    return null // 레이아웃 유지를 위한 빈 div
  }
    
  return(
    <button onClick={() => router.back()} className="flex justify-center items-center relative w-[40px] h-[40px]">
      <img src="/prev.svg" alt="이전" className="w-[24px] h-[24px] opacity-50 hover:opacity-100" />
    </button>
  )
}