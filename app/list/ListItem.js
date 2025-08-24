"use client"
import Link from "next/link";
import { useSession } from "next-auth/react";

export default function ListItem(props){
  const result = props.result;
  const { data: session } = useSession();

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
  };
  
  return(
    <div className="px-[16px] md:px-0">
      {result.map((a, i) => (
          <div 
            className="relative flex flex-col h-[140px] shadow-[0_0_10px_0_rgba(0,0,0,0.1)] max-w-[600px] mx-auto rounded-[10px] p-[16px] mb-[16px] bg-[rgba(255,255,255,0.8)] hover:scale-102 transition-all duration-300" 
            key={i}
          >
            {session?.user.email === a.author && (
              <div className="absolute top-[16px] right-[16px] flex flex-row">
                {/* <Link 
                  href={`/edit/${a._id}`} 
                  className="rounded-md border border-transparent p-[5px] text-center text-[11px] transition-all text-slate-600 hover:bg-slate-100 focus:bg-slate-100 active:bg-slate-100 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                >
                  수정
                </Link> */}
                <button  
                  className="rounded-md border border-transparent p-[5px] text-center text-[11px] transition-all text-slate-600 hover:bg-slate-100 focus:bg-slate-100 active:bg-slate-100 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" 
                  onClick={(e) => {
                    fetch(`/api/post/delete?id=${a._id}`, {
                      method : 'DELETE',
                    })
                    .then(res => {
                      if(res.status === 200){
                        alert('삭제되었습니다.');
                        window.location.reload();
                      }else{
                        alert('삭제에 실패했습니다.');
                      }
                    })
                    .catch(err => {
                      console.log(err);
                    })
                  }}
                >
                  삭제
                </button>
              </div>
            )}
            <Link href={`/detail/${a._id}`}>
              <h2 className="text-[16px] w-[calc(100%-100px)] overflow-hidden text-ellipsis whitespace-nowrap text-[#4d5566] font-[700]">
                {a.title}
              </h2>
              <p className="mt-[10px] mb-[10px] text-[14px] overflow-hidden text-ellipsis line-clamp-2 text-[#4d5566]">
                {a.content}
              </p>
            </Link>
            <div className="flex flex-row justify-between text-[11px] mt-[auto] p-0 text-[#666]">
              <span className="text-[12px] text-[#959595]">by {a.authorName}</span>
              <p className="text-[12px] text-[#959595]">{formatDate(a.createdAt)}</p>
            </div>

          </div>
        )
      )}
    </div>
  )
}