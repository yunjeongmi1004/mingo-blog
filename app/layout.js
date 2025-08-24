import "./globals.css";
import LoginBtn from "./LoginBtn";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import AuthSessionProvider from "@/pages/api/auth/SessionProvider";
import PrevBtn from "./prevBtn";
import Header from "./Header";
import RegisterBtn from "./RegisterBtn";
import LeaveBtn from "./LeaveBtn";

export const metadata = {
  title: "Ming's Blog",
  description: "Ming's Blog",
};

export default async function RootLayout({ children }) {
  const session = await getServerSession(authOptions) 
  console.log(session)

  return (
    <html lang="en">
      <head>
        <link 
          href="https://fastly.jsdelivr.net/gh/projectnoonnu/noonfonts_20-04@2.1/NEXON Lv2 Gothic.woff" 
          rel="preload" 
          as="font" 
          type="font/woff" 
          crossOrigin="anonymous"
        />
      </head>
      <body>
      <div className="flex flex-col min-h-screen bg-[#ffeed9]">
        <AuthSessionProvider session={session}>
            <nav className="relativeh-[52px] w-full max-w-[640px] mx-auto h-[52px] flex items-center px-4 justify-between"> 

              <PrevBtn />
              <Header session={session} />
              <div className="flex items-center gap-2">
              {session ? (
                <>
                  <LoginBtn session={session} />
                </>
              ) : (
                <>
                  <RegisterBtn session={session} />
                  <LoginBtn session={session} />
                </>
              )}
              </div>
            </nav> 
            {children}
            <footer className="flex justify-center items-center h-[52px] mt-[auto]">
              {session ? (<LeaveBtn session={session} />) : null}
            </footer>
        </AuthSessionProvider>
      </div>
      </body>
    </html>
  );
}
