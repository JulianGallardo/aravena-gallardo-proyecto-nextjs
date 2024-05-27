// Importa los tipos necesarios
import { DefaultSession, DefaultUser } from "next-auth";
import { User as PrismaUser } from "@/prisma/generated/client";

// Extiende las interfaces de `next-auth`
declare module "next-auth" {
    interface Session {
        user: User;
    }

    interface User extends PrismaUser {}
}

declare module "next-auth/jwt" {
    interface JWT {
        user: User;
    }
}
