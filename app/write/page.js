import Link from "next/link";

export default function Write({ searchParams }){

  const error = searchParams?.error;
  
  return(
    <section className="flex flex-col w-full h-[calc(100vh-180px)] overflow-y-auto mx-auto mt-[20px] max-w-[600px] bg-[#fcfcfc] rounded-[10px] p-[16px]">
      <form action="/api/post/new" method="post" className="h-full">
        <div className="flex flex-col gap-[20px] h-full">
          <input type="text" name="title" placeholder="글제목" className="w-full p-[10px] border border-gray-300 rounded-md" />
          <textarea name="content" placeholder="글내용" rows={10} className="w-full h-[calc(100%-50px)] p-[10px] resize-none border border-gray-300 rounded-md whitespace-pre-wrap "></textarea>
          <button type="submit" className="ml-auto mt-auto w-[100px] h-[40px] rounded-md border-1 border-[transparent] bg-[#4d5566] pl-[10px] pr-[10px] text-center text-sm text-[#f4f7ff] font-[500]">저장</button>
        </div>
      </form>
      {error && (
        <div className="relative w-full p-[10px] mt-[10px] bg-red-100 border border-red-400 text-red-700 rounded">
          <Link href="/write" className="absolute top-[50%] right-[10px] translate-y-[-50%]">X</Link>
          {decodeURIComponent(error)}
        </div>
      )}
    </section>
  )
}