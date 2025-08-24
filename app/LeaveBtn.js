'use client'

import { useSession } from "next-auth/react";
import Link from "next/link";

export default function LeaveBtn(){
  const { data: session, status } = useSession();

  // 로딩 중이거나 session이 없으면 null 반환
  if (status === "loading" || !session) {
    return null;
  }

  return (
    <Link href="/leave" className="text-[12px] text-[#403930] font-[500]">
      (๑•́ ᎔ ก̀๑) 회원탈퇴
    </Link>
  );
}