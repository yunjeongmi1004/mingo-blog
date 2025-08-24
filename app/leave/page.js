'use client'

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";

export default function Leave(){
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { data: session, status } = useSession();

  // 세션 로딩 중일 때 로딩 표시
  if (status === "loading") {
    return <div>로딩 중...</div>;
  }

  // 로그인하지 않은 경우 리다이렉트
  if (status === "unauthenticated") {
    router.push('/register');
    return <div>로그인이 필요합니다. 로그인 페이지로 이동합니다...</div>;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if(!password){
      alert('비밀번호를 입력해주세요.');
      return;
    }

    const confirmLeave = confirm('정말로 탈퇴하시겠습니까? 이 작업은 되돌릴 수 없습니다.');
    if(!confirmLeave) return;

    setIsLoading(true);

    try {
      const response = await fetch('/api/auth/leave', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password }),
      });

      const result = await response.json();

      if(response.ok){
        alert('회원탈퇴가 완료되었습니다.');
        // 로그아웃 후 홈페이지로 이동
        await signOut({ callbackUrl: '/' });
      } else {
        alert(result.error || '탈퇴 중 오류가 발생했습니다.');
      }
    } catch (error) {
      console.error('탈퇴 오류:', error);
      alert('탈퇴 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  }

  return(
    <div className="flex flex-col items-center justify-center mt-[100px] max-w-[600px] mx-auto bg-[#fcfcfc] rounded-[10px] p-[16px]">
      <p className="text-[14px] text-[#dc3545] font-[500] mb-[10px]">
        ⚠️ 회원탈퇴 시 모든 데이터가 삭제되며 복구할 수 없습니다.
      </p>
      
      <form onSubmit={handleSubmit} className="flex flex-col gap-[10px] w-full">
        <div className="flex flex-col gap-[10px]">
          <label className="text-[14px] text-[#4d5566] font-[500]">이메일</label>
          <input 
            type="text" 
            value={session?.user?.email || ''} 
            readOnly 
            className="w-full p-[10px] border border-gray-300 rounded-md"
          />
        </div>
        <div className="flex flex-col gap-[10px]">
          <label className="text-[14px] text-[#4d5566] font-[500]">비밀번호 확인</label>
          <input 
            type="password" 
            placeholder="현재 비밀번호를 입력하세요" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-[10px] border border-gray-300 rounded-md"
          />
        </div>
        <button 
          type="submit" 
          disabled={isLoading}
          className="w-full h-[40px] mt-[20px] rounded-md border-1 border-[transparent] bg-[#4d5566] pl-[10px] pr-[10px] text-center text-sm text-[#f4f7ff] font-[500]"
        >
          {isLoading ? '처리중...' : '회원탈퇴'}
        </button>
      </form>
    </div>
  )
}