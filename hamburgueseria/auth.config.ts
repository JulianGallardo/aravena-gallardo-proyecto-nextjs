import { NextAuthConfig, Session } from 'next-auth';
import { JWT } from 'next-auth/jwt';
import { User } from './prisma/generated/client';

type ExtendedSession = Session & { user: User };

export const authConfig = {
  pages: {
    signIn: '/auth/login',
  },
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async redirect({ url, baseUrl }) {
      // Redirige a la página deseada después del inicio de sesión
      return baseUrl;
    },
    async authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnProfile = nextUrl.pathname.startsWith('/');
      if (isOnProfile) {
        if (isLoggedIn) return true;
        return Response.redirect(new URL('/auth/login', nextUrl));
      } else if (isLoggedIn) {
        return Response.redirect(new URL('/perfil', nextUrl));
      }
      return true;
    },
    async jwt({ token, user, session, trigger }) {
      if (trigger === 'signIn') return token;

      if (trigger === 'update' && session?.user) {
        return {
          ...token,
          id: session.user.id,
          email: session.user.email,
          fullName: session.user.fullName,
          city: session.user.city,
          cellphone: session.user.cellphone,
          address: session.user.address,
        };
      }

      if (user) {
        return {
          ...token,
          id: session.user.id,
          email: session.user.email,
          fullName: session.user.fullName,
          city: session.user.city,
          cellphone: session.user.cellphone,
          address: session.user.address,
        };
      }
      return token;
    },
    async session({ session, token }: { session: any; token: JWT }) {
      console.log('session', session);
      return {
        ...session, user: {
          ...session.user,
          id: token.id,
          email: token.email,
          fullName: token.fullName,
          city: token.city,
          cellphone: token.cellphone,
          address: token.address,
        }
      };
    }
  },

  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;