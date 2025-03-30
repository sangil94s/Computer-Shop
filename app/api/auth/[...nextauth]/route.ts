/* eslint-disable @typescript-eslint/no-explicit-any */
import NextAuth, { NextAuthOptions } from 'next-auth';
import NaverProvider from 'next-auth/providers/naver';
interface NaverProfile extends Record<string, any> {
  resultcode: string;
  message: string;
  response: {
    id: string;
    nickname: string;
    name: string;
  };
}

const handler = NextAuth({
  providers: [
    NaverProvider({
      clientId: process.env.NAVER_CLIENT_ID!,
      clientSecret: process.env.NAVER_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async jwt({ token, account, profile }) {
      if (account && profile) {
        const naverProfile = profile as NaverProfile;
        token.nickname = naverProfile.response.nickname;
        token.name = naverProfile.response.name;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.nickname = token.nickname as string;
        session.user.name = token.name as string;
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      return baseUrl;
    },
  },
  session: {
    strategy: 'jwt',
    maxAge: 60 * 60,
  },
  pages: {
    signIn: '/auth/logins',
  },
});

export { handler as GET, handler as POST };
