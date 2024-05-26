import { NextAuthConfig, Session } from 'next-auth';
import { JWT } from 'next-auth/jwt';

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
      if (trigger==='signIn') return token;
      
      if (trigger==='update' && session?.user) {
        return { ...token, id: session.user.id, email: session.user.email };
      }

      if (user) {
        return { ...token, id: user.id, email: user.email };
      }
      return token;
    },
    async session({ session, token }: { session: any, token: JWT }) {
      return { ...session, user: { ...session.user, id: token.id as string | undefined, email: token.email } };
    }
  },

  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;