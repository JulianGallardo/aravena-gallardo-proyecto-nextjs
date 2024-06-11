import { Burger,Extra } from "@/prisma/generated/client";

export interface CartItem extends Burger {
    quantity: number;
    extras: ExtraInCart[];
}

export interface ExtraInCart {
    extra: Extra;
    quantity: number;
}
