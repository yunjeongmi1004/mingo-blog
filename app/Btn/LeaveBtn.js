'use client'

import { useSession } from "next-auth/react";
import Link from "next/link";

export default function LeaveBtn(){
  const { data: session, status } = useSession();

  if (status === "loading" || session) {
    return null;
  }

  return (
  <Link href="/leave" className="text-sm text-[#403930] font-[500]">회원탈퇴</Link>
  );
}