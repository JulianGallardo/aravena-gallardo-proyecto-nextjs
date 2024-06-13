import { CartItem } from "@/lib/types";
import BurgerCartItems from "./BurgerCartItems";
import PromoCartItems from "./PromoCartItem";
import { inter } from "../fonts";

interface CartItemProps {
    item: CartItem;
}

export default function( {item}: CartItemProps){
        if(item.cartItemBurger){
            return <BurgerCartItems item={item.cartItemBurger}/>
        }
        if(item.cartItemPromo){
            return <PromoCartItems item={item.cartItemPromo}/>
        }
}