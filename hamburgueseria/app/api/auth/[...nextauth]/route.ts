import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import db from "@/lib/db";
import bcrypt from "bcryptjs";

const authOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                username: { label: "Email", type: "text", placeholder: "Email"},
                password: { label: "Password", type: "password",   placeholder: "Password"}
            },
            async authorize(credentials,req): Promise<any>{
                const userFound = await db.user.findUnique({
                    where: {
                        email: String(credentials?.username)
                    }
                })
                if (!userFound) {
                    return JSON.stringify({
                        message:'User not found',
                        ok:"false"
                    })
                }

                console.log(userFound);

                const matchPassword=await bcrypt.compare(String(credentials?.password), String(userFound.password));

                if (!matchPassword) {
                    return JSON.stringify({
                        message:'Password incorrect',
                        ok:"false"
                    })
                }
                
                return {
                    id: String(userFound.clientId),
                    email: userFound.email,
                    name: userFound.fullName,
                };
            }
        })
    ],
};

const handler = NextAuth(authOptions);
export {handler as GET, handler as POST};
