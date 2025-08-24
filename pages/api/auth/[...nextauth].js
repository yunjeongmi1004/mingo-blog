import { connectDB, client } from "@/util/database";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "password", type: "password" },
      },
      
      async authorize(credentials) {
        try {
          console.log(credentials)
          let db = (await connectDB).db('forum');
          let user = await db.collection('user').findOne({email : credentials.email})
          if (!user) {
            console.log('해당 이메일은 없음');
            return null
          }
          const pwcheck = await bcrypt.compare(credentials.password, user.password);
          if (!pwcheck) {
            console.log('비번틀림');
            return null
          }
          return user;
        } catch (error) {
          console.error('Authorization error:', error);
          return null;
        }
      },
    })
  ],

  pages: {
    signIn: '/login',
  },

  session: {
    strategy: 'jwt',
    maxAge: 24 * 60 * 60 //1일
  },

  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.user = {};
        token.user.name = user.name
        token.user.email = user.email
      }
      return token;
    },
    session: async ({ session, token }) => {
      session.user = token.user;  
      return session;
    },
  },
  
  secret: process.env.NEXTAUTH_SECRET,
  adapter: MongoDBAdapter(client), // client 인스턴스 사용
}

export default NextAuth(authOptions);