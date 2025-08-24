// 요청,응답
export default function handler(req, res){
  console.log(req.query)
  return res.status(200).json('처리완료');

  // if(req.method === 'POST'){
  //   console.log(req.body);
  //   return res.status(200).json('처리완료');
  // }
}