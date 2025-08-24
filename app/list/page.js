import { connectDB } from "../../util/database";
import Link from "next/link";
import DetailLink from "./DetailLink";
import ListItem from "./ListItem";

export const dynamic = 'force-dynamic'; // 데이터가 변경될 때마다 다시 렌더링

export default async function List(){

  let db = (await connectDB).db('forum');
  let result = await db.collection('post').find().toArray();

  const serializedResult = JSON.parse(JSON.stringify(result));
  console.log(serializedResult)
  console.log(result)

  return(
    <div className="list-bg">
      <ListItem result={serializedResult} />
      <Link href="/write">글작성</Link>
    </div>
  )
}