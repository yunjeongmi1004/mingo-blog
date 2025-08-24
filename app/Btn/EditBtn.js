"use client"

import { useSession } from "next-auth/react"
import Link from "next/link"

export default function EditButton({ id }) {
  const { data: session } = useSession()
  
  if (!session) return null
  
  return (
    <Link 
      href={`/edit/${id}`} 
      className="text-sm font-[500] border-1 border-[rgba(0,0,0,0)] bg-[#4d5566] text-[#fcfcfc] rounded-md pl-[10px] pr-[10px] py-[5px] mr-[5px]"
    >
      수정
    </Link>
  )
}