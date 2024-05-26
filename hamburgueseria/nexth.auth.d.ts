import { DefaultSession } from "next-auth";
import { User } from "@/prisma/generated/client";

declare module "next-auth" {

    interface Session extends DefaultSession{
        user: User;
    }



}

declare module "next-auth/jwt" {
    interface JWT {
        user: User;
    }
  }