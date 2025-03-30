import NextAuth from 'next-auth';

declare module 'next-auth' {
  interface User {
    id: string;
    name?: string | null;
    nickname?: string | null;
  }

  interface Session {
    user: User;
  }
}
