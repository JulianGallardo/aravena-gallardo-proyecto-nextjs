import { NextAuthConfig, Session } from 'next-auth';
import { JWT } from 'next-auth/jwt';
import { PrismaClient } from '@/prisma/generated/client';
import { NextResponse } from 'next/server';

const db = new PrismaClient();

export const authConfig = {
  pages: {
    signIn: '/auth/login',
  },
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async redirect({ url, baseUrl }) {
      if (url.startsWith(baseUrl)) {
        return url;
      }
      return baseUrl;
    },
    async authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnProfile = nextUrl.pathname.startsWith('/perfil');
      const isOnAdmin = nextUrl.pathname.startsWith('/admin');
      const isOnLogin = nextUrl.pathname.startsWith('/auth/login');
      const isOnRegister = nextUrl.pathname.startsWith('/auth/register');
      

      if (isLoggedIn){
        if (isOnLogin || isOnRegister){
          return NextResponse.redirect(process.env.NEXTAUTH_URL + '/');
        }
        if (isOnProfile){
          return true;
        }
        if (isOnAdmin && auth.user.role === 'ADMIN'){
          return true;
        }
        if (isOnAdmin && auth.user.role !== 'ADMIN'){
          return NextResponse.redirect(process.env.NEXTAUTH_URL + '/');
        }
      }
      else{
        if (isOnProfile || isOnAdmin){
          return NextResponse.redirect(process.env.NEXTAUTH_URL + '/auth/login');
        }
        if (isOnLogin || isOnRegister){
          return true;
        }
      }
    },
    async jwt({ token, user, session, trigger }) {
      if (trigger === 'signIn') {
        return {
          ...token,
          id: user.id,
          email: user.email,
          role: user.role,
          fullName: user.fullName,
          cellphone: user.cellphone,
          address: user.address,
        };
      }

      if (trigger === 'update' && session?.user) {
        const user = await db.user.findUnique({ where: { email: session.user.email } });
        if (!user) return token;

        try{
          
        const newUser = await db.user.update({
          where: { email: session.user.email },
          data: {
            fullName: session.user.fullName,
            email: session.user.email,
            role: session.user.role,
            cellphone: session.user.cellphone,
            address: session.user.address,
          },
        });



        }catch(e){
          console.log(e);
          return token;
        }


        return {
          ...token,
          id: session.user.id,
          email: session.user.email,
          role: session.user.role,
          fullName: session.user.fullName,
          cellphone: session.user.cellphone,
          address: session.user.address,
        };
      }

      if (user) {
        return {
          ...token,
          id: session.user.id,
          email: session.user.email,
          role: session.user.role,
          fullName: session.user.fullName,
          cellphone: session.user.cellphone,
          address: session.user.address,
        };
      }
      return token;
    },
    async session({ session, token }: { session: any; token: JWT }) {
      return {
        ...session, user: {
          ...session.user,
          id: token.id,
          email: token.email,
          role: token.role,
          fullName: token.fullName,
          cellphone: token.cellphone,
          address: token.address,
        }
      };
    },
  },

  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;