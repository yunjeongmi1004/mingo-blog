import { ObjectId } from "mongodb"
import { connectDB } from "@/util/database"
import NotFound from "@/app/not-found"
import Link from "next/link"
import EditButton from "@/app/Btn/EditBtn"



export default async function Detail(props){
  let id = String(props.params.id);

  if(!ObjectId.isValid(id)){
    return <NotFound />
  }
  
  let db = (await connectDB).db('forum');
  let result = await db.collection('post').findOne({_id :new ObjectId(id)});


  if(!result){
    return <NotFound />
  }

  return(
    <section className="flex flex-col w-full h-[calc(100vh-180px)] mx-auto mt-[20px] max-w-[600px] bg-[rgba(255,255,255,0.3)] rounded-[10px] p-[16px]">
      <h5 className="text-sm text-[#4d5566] font-[700] border-b border-[rgba(0,0,0,0.1)] pb-[10px]">{result.title}</h5>
      <div className="mt-[10px] text-sm text-[#4d5566] font-[500] whitespace-pre-wrap h-[calc(100%-60px)] overflow-y-auto">
        {result.content}
      </div>
      <div className="sticky bottom-[0px] flex justify-end mt-[10px]">
        <EditButton id={id} />
      </div>
    </section>
  )
}