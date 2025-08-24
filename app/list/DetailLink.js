'use client';
import {useRouter, usePathname, useSearchParams} from 'next/navigation';

export default function DetailLink(){
  let router = useRouter();
  let pathname = usePathname();
  let searchParams = useSearchParams();

  console.log('pathname : ', pathname);
  console.log('searchParams : ', searchParams);
  
  return( 
    <button onClick={() => {
      router.prefetch('/detail/dsds');
    }}>
      버튼
    </button>
  )
}