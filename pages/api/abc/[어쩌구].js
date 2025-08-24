export default function handler(req, res){
  console.log(req.query.어쩌구)
  return res.status(200).json('어쩌구 안녕');
}