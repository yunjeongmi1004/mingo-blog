import { connectDB } from "@/util/database";
import bcrypt from "bcryptjs";

export default async function handler(req, res){
  if(req.method === 'POST'){
    const {name, email, password} = req.body;
    // 영문, 숫자, 한글만 허용
    const validNamePattern = /^[a-zA-Z0-9가-힣]*$/;
    const validPasswordPattern = /^[a-zA-Z0-9]*$/;

    if(!name){
      return res.redirect('/register?error=' + encodeURIComponent('이름을 입력해주세요'));
    }
    if(name.length > 10){
      return res.redirect('/register?error=' + encodeURIComponent('이름은 10자 이하여야 합니다.'));
    }
    if(!validNamePattern.test(name)){
      return res.redirect('/register?error=' + encodeURIComponent('이름은 영문, 숫자, 한글만 사용 가능합니다.'));
    }
    if(!email){
      return res.redirect('/register?error=' + encodeURIComponent('이메일을 입력해주세요'));
    }
    if(email.includes('@') === false){
      return res.redirect('/register?error=' + encodeURIComponent('이메일 형식이 올바르지 않습니다.'));
    }
    if(!password){
      return res.redirect('/register?error=' + encodeURIComponent('비밀번호를 입력해주세요'));
    }
    if(password.length > 8){
      return res.redirect('/register?error=' + encodeURIComponent('비밀번호는 8자 이하여야 합니다.'));
    }
    if(!validPasswordPattern.test(password)){
      return res.redirect('/register?error=' + encodeURIComponent('비밀번호는 영문, 숫자만 사용 가능합니다.'));
    }
    
    const db = (await connectDB).db('forum');

    const existingUser = await db.collection('user').findOne({email: email});
    if(existingUser){
      return res.redirect('/register?error=' + encodeURIComponent('이미 존재하는 이메일입니다.'));
    }

    const existingName = await db.collection('user').findOne({name: name});
    if(existingName){
      return res.redirect('/register?error=' + encodeURIComponent('이미 존재하는 이름입니다.'));
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    try{
      const result = await db.collection('user').insertOne({name, email, password: hashedPassword});
      // res.status(200).json({message : '회원가입이 완료되었습니다.', userId: result.insertedId}).redirect('/');
      res.status(200).redirect('/').alert('회원가입이 완료되었습니다.');
    }catch (error) {
      console.error('회원가입 오류:', error);
      res.status(500).json({error : '회원가입 중 오류가 발생했습니다.'});
    }
  }
}