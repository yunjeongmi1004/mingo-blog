import { connectDB } from "@/util/database";
import { getServerSession } from "next-auth";
import { authOptions } from "./[...nextauth]";
import bcrypt from "bcrypt";

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        // 세션 확인
        const session = await getServerSession(req, res, authOptions);
        
        if (!session) {
            return res.status(401).json({ error: '로그인이 필요합니다.' });
        }

        const { password } = req.body;

        if (!password) {
            return res.status(400).json({ error: '비밀번호를 입력해주세요.' });
        }

        // 데이터베이스 연결
        const db = (await connectDB).db('forum');
        
        // 사용자 정보 조회
        const user = await db.collection('user').findOne({ email: session.user.email });

        if (!user) {
            return res.status(400).json({ error: '존재하지 않는 사용자입니다.' });
        }

        // 비밀번호 확인
        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if (!isPasswordCorrect) {
            return res.status(400).json({ error: '비밀번호가 일치하지 않습니다.' });
        }

        // 사용자 관련 데이터 삭제 (예: 게시글, 댓글 등)
        // 필요에 따라 추가 컬렉션의 데이터도 삭제
        await db.collection('post').deleteMany({ author: session.user.email });
        
        // 사용자 계정 삭제
        const deleteResult = await db.collection('user').deleteOne({ email: session.user.email });

        if (deleteResult.deletedCount === 0) {
            return res.status(500).json({ error: '회원탈퇴 처리 중 오류가 발생했습니다.' });
        }

        // 성공 응답
        return res.status(200).json({ 
            success: true, 
            message: '회원탈퇴가 완료되었습니다.' 
        });

    } catch (error) {
        console.error('회원탈퇴 처리 중 오류:', error);
        return res.status(500).json({ 
            error: '서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.' 
        });
    }
} 