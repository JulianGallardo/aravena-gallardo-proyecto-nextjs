import { CartItem } from "@/lib/CartTypes";
import BurgerCartItems from "./BurgerCartItems";
import PromoCartItems from "./PromoCartItem";

interface CartItemProps {
    item: CartItem;
}

export default function CartItemComponent( {item}: CartItemProps){
        if(item.cartItemBurger){
            return <BurgerCartItems item={item.cartItemBurger}/>
        }
        if(item.cartItemPromo){
            return <PromoCartItems item={item.cartItemPromo}/>
        }
}