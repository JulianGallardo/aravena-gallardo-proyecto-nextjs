import type { NextAuthConfig } from 'next-auth';
 
export const authConfig = {
  pages: {
    signIn: '/auth/login',
  },
  callbacks: {
    async redirect({ url, baseUrl }) {
      // Redirige a la página deseada después del inicio de sesión
      return baseUrl ;
    },
    authorized({ auth, request: { nextUrl } }) {
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
  },
  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;