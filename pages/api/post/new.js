import { connectDB } from "../../../util/database";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(req, res){
  if(req.method === 'POST'){
    
    // 세션 확인
    const session = await getServerSession(req, res, authOptions);
    
    if (!session) {
      return res.status(401).redirect('/write?error=' + encodeURIComponent('로그인이 필요합니다'));
    }

    if(req.body.title === ''){
      return res.status(400).redirect('/write?error=' + encodeURIComponent('제목을 입력해주세요'));
    }
    if(req.body.content === ''){
      return res.status(400).redirect('/write?error=' + encodeURIComponent('내용을 입력해주세요'));
    }
    
    try{
      let db = (await connectDB).db('forum');
      
      // 현재 로그인한 사용자 정보 조회
      let user = await db.collection('user').findOne({email: session.user.email});
      
      if (!user) {
        return res.status(404).json({error : '사용자를 찾을 수 없습니다'});
      }

      let result = await db.collection('post').insertOne({
        title: req.body.title,
        content: req.body.content,
        author: session.user.email, // 작성자 이메일
        authorName: session.user.name, // 작성자 이름  
        authorId: user._id, // 작성자 MongoDB _id
        createdAt: new Date() // 작성 시간
      });
      
      console.log(result);
      res.redirect(302, '/');      
    }catch(e){
      console.log(e);
      return res.status(500).json({error: '데이터베이스 오류'});
    }
  }
}