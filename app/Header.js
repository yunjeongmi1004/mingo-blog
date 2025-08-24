'use client'

import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();

  const getHeaderText = () => {
    // MongoDB ObjectId 패턴 (24자리 16진수)
    const objectIdPattern = /^[0-9a-fA-F]{24}$/;
    
    // 동적 경로 처리
    if (pathname.startsWith('/detail/')) {
      const id = pathname.split('/')[2];
      return objectIdPattern.test(id) ? '글상세' : 'mlog ( ੭ ･ ౩･ )੭';
    }
    
    if (pathname.startsWith('/edit/')) {
      const id = pathname.split('/')[2];
      return objectIdPattern.test(id) ? '글수정' : 'mlog ( ੭ ･ ౩･ )੭';
    }

    // 정적 경로들
    const pageHeaders = {
      '/register': '회원가입',
      '/leave': '회원탈퇴',
      '/': 'mlog ( ੭ ･ ౩･ )੭',
      '/write': '글작성',
      '/list': '글목록',
      '/login': '로그인'
    };

    return pageHeaders[pathname] || 'mlog ( ੭ ･ ౩･ )੭';
  };

  const headerText = getHeaderText();

  return (
    <>
    {pathname === '/' ? 
      <h1 className="text-[12px] md:text-[14px] font-[700] text-[#594f43]">{headerText}</h1> : 
      <h1 className="absolute left-[60px] md:left-1/2 md:-translate-x-1/2 text-[14px] md:text-[18px] lg:text-[18px] font-[700] text-[#594f43]" onClick={() => router.push('/')}>{headerText}</h1>
    }
    </>
  );
}