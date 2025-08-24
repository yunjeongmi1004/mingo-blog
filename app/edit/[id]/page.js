import { ObjectId } from "mongodb";
import { connectDB } from "@/util/database";

export default async function Edit(props){
  let id = String(props.params.id);
  let db = (await connectDB).db('forum');
  let result = await db.collection('post').findOne({_id :new ObjectId(id)});

  // document 내용 수정은 updateOne
  await db.collection('post').updateOne({_id :new ObjectId(id)}, {$set : {title : result.title, content : result.content}});

  return(
    <section className="
      flex flex-col 
      w-full 
      h-[calc(100vh-180px)] 
      overflow-y-auto 
      mx-auto 
      mt-[20px] 
      max-w-[600px] 
      bg-[#fcfcfc] 
      rounded-[10px] 
      p-[16px]
    ">
      <form action="/api/post/edit" method="POST" className="h-full">
        <div className="flex flex-col gap-[20px] h-full">
          <input 
            type="text" 
            name="title" 
            defaultValue={result.title} 
            className="
              w-full 
              p-[10px] 
              border border-gray-300 
              rounded-md
            " 
          />
          <textarea 
            name="content" 
            defaultValue={result.content}  
            rows={10} 
            className="
              w-full 
              h-[calc(100%-50px)] 
              p-[10px] 
              resize-none 
              border border-gray-300 
              rounded-md 
              whitespace-pre-wrap
            "
          />
          <input type="hidden" name="id" value={result._id.toString()} />
          <button 
            type="submit" 
            className="
              ml-auto mt-auto 
              w-[100px] h-[40px] 
              rounded-md 
              border-1 border-[transparent] 
              bg-[#4d5566] 
              pl-[10px] pr-[10px] 
              text-center text-sm 
              text-[#f4f7ff] 
              font-[500]
            "
          >
            수정
          </button>
        </div>
      </form>
    </section>
  )
}