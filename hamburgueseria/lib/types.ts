import { Burger } from "@/prisma/generated/client";

export interface CartItem extends Burger {
    quantity: number;
}
