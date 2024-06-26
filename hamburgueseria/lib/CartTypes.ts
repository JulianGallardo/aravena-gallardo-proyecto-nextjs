import { Burger,Extra, Promo } from "@/prisma/generated/client";
import { PromoExtendida } from "./definitions";



export interface CartItem {
    cartItemPromo: CartItemPromo|null;
    cartItemBurger: CartItemBurger|null;
}

export interface CartItemPromo extends PromoExtendida{
    quantity: number;
}
export interface CartItemBurger extends Burger {
    quantity: number;
    extras: ExtraInCart[];
}

export interface ExtraInCart {
    extra: Extra;
    quantity: number;
}


