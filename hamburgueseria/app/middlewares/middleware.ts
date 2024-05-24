import NextAuth from 'next-auth';
import { authConfig } from '@/auth.config';
import { redirect } from 'next/dist/server/api-utils';
 
export default NextAuth(authConfig).auth;
 
export const config = {
  // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
  matcher: ['/perfil'],
  redirect: '/auth/login',
};