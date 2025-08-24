import { connectDB } from "../util/database";
import Link from "next/link";
import ListItem from "./list/ListItem";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

export const dynamic = 'force-dynamic';

export default async function Home() {
  const session = await getServerSession(authOptions);

  let db = (await connectDB).db('forum');
  let result = await db.collection('post').find().toArray();
  const serializedResult = JSON.parse(JSON.stringify(result));

  return (
    <section>
      <img src="/hello.png" alt="bg" className="w-full h-full max-w-[300px] mx-auto" />
      <ListItem result={serializedResult} />
      <div className="flex max-w-[600px] mx-auto justify-end mt-[16px]">
        {session ? (
          <Link href="/write" className="bg-[#ffddbf] rounded-md p-[10px] text-center text-sm text-[#403930] font-boldhover:bg-[#ffddbf]/80 transition-all duration-300">글작성</Link>
        ) : null}
      </div>
    </section>
  );  
}