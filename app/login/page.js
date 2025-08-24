'use client'

import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import InputItem from '../register/inputitem';

export default function Login({ searchParams }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError('이메일 또는 비밀번호가 올바르지 않습니다.');
      } else {
        router.push('/');
      }
    } catch (error) {
      setError('로그인 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="flex flex-col items-center justify-center mt-[100px]">
      <form onSubmit={handleSubmit} className="flex flex-col gap-[20px] bg-[#fcfcfc] rounded-[10px] p-[16px]">
        <InputItem 
          label="이메일" 
          name="email" 
          placeholder="이메일" 
          type="email" 
          value={email}
          onChange={setEmail}
        />
        <InputItem 
          label="비밀번호" 
          name="password" 
          placeholder="비밀번호" 
          type="password" 
          value={password}
          onChange={setPassword}
        />

        {error && (
          <div className="w-[300px] p-[10px] bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        {searchParams?.error && (
          <div className="w-[300px] p-[10px] bg-red-100 border border-red-400 text-red-700 rounded">
            로그인에 실패했습니다.
          </div>
        )}

        <button 
          type="submit" 
          disabled={loading}
          className="w-[300px] h-[40px] rounded-md border-1 border-[transparent] bg-[#4d5566] pl-[10px] pr-[10px] text-center text-sm text-[#f4f7ff] font-[500] disabled:opacity-50"
        >
          {loading ? '로그인 중...' : '로그인'}
        </button>
      </form>
    </section>
  );
}