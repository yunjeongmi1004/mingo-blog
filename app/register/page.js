import InputItem from "./inputitem";

export default function Register({ searchParams }) {
  const error = searchParams?.error;
  const success = searchParams?.success;

  return (
    <section className="flex flex-col items-center justify-center mt-[100px]">
      <form method="POST" action="/api/auth/signup" className="flex flex-col gap-[20px] bg-[#fcfcfc] rounded-[10px] p-[16px]">
        <InputItem label="이름" name="name" placeholder="이름" type="text" description="영문, 숫자, 10자이하 가능"/>
        <InputItem label="이메일" name="email" placeholder="이메일" type="email" description="이메일 형식에 맞게 입력해주세요"/>
        <InputItem label="비밀번호" name="password" placeholder="비번" type="password" description="영문, 숫자, 8자이하 가능"/>
        
        {error && (
          <div className="w-[300px] p-[10px] bg-red-100 border border-red-400 text-red-700 rounded">
            {decodeURIComponent(error)}
          </div>
        )}
        
        {success && (
          <div className="w-[300px] p-[10px] bg-green-100 border border-green-400 text-green-700 rounded">
            {decodeURIComponent(success)}
          </div>
        )}
        
        <button type="submit" className="w-[300px] h-[40px] rounded-md border-1 border-[transparent] bg-[#4d5566] pl-[10px] pr-[10px] text-center text-sm text-[#f4f7ff] font-[500]">
          회원가입
        </button>
      </form>
    </section>
  );
}