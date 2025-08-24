import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";

export default async function handler(req, res){
  
  if(req.method === 'DELETE'){
    try{
      // query parameter에서 id 가져오기
      const { id } = req.query;
      
      if (!id) {
        return res.status(400).json('ID가 필요합니다');
      }
      
      let db = (await connectDB).db('forum');
      let result = await db.collection('post').deleteOne({_id: new ObjectId(id)});
      
      if (result.deletedCount === 0) {
        return res.status(404).json('게시물을 찾을 수 없습니다');
      }
      
      res.status(200).json('삭제완료');
    }catch(err){
      res.status(500).json('삭제실패');
    }
  }
}