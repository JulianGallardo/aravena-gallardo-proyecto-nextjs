import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';
import { User } from './prisma/generated/client';
import db from '@/lib/db';
import bcrypt from 'bcryptjs';


async function getUser(email: string): Promise<User | undefined> {

    const user = await db.user.findUnique({ where: { email } });
    if (!user) return undefined;
    return user;

}

export const { auth,handlers, signIn, signOut } = NextAuth({
    ...authConfig,
    providers: [
        Credentials({
            async authorize(credentials) {
                const parsedCredentials = z
                    .object({ email: z.string().email(), password: z.string() })
                    .safeParse(credentials);


                if (parsedCredentials.success) {
                    const { email, password } = parsedCredentials.data;
                    const user = await getUser(email);
                    if (!user) return null;
                    const passwordsMatch = await bcrypt.compare(password, user.password);

                    if (passwordsMatch) return user;
                }
                
                return null;
            },
            
            
        }),
    ],
});