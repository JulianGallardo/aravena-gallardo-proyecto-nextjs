import { createContext,useState } from "react";
import { CartItem } from "@/lib/types";

interface CartContextType {
    cart: CartItem[];
    total: number;
    items: number;
    addToCart: (product: CartItem) => void;
    removeFromCart: (product: CartItem) => void;
    clearCart: () => void;
    addWithQuantity: (product: CartItem, quantity: number) => void;
    removeWithQuantity: (product: CartItem, quantity: number) => void;
}

export const CartContext = createContext<CartContextType>({
    cart: [],
    total: 0,
    items: 0,
    addToCart: (product: CartItem) => {},
    removeFromCart: (product: CartItem) => {},
    clearCart: () => {},
    addWithQuantity: (product: CartItem, quantity: number) => {},
    removeWithQuantity: (product: CartItem, quantity: number) => {}
});

export const CartProvider = ({children}: {children: React.ReactNode}) => {
    const [cart, setCart] = useState<CartItem[]>([]);
    const [items, setItems] = useState(0);
    const [total, setTotal] = useState(0);

    const addToCart = (product:CartItem) => {
        const check = cart.every(item => item.productId !== product.productId);
        if(!check)
        {
            cart.map((item) => {
                if(item.productId === product.productId)
                {
                    item.quantity += 1;
                }
            });
            setItems(items + 1);
            setTotal(total + product.price);
            return;
        }
        setCart([...cart, product]);
        setItems(items + 1);
        setTotal(total + product.price);
    }

    const removeFromCart = (product:CartItem) => {
        if(product.quantity > 1)
        {
            cart.map((item) => {
                if(item.productId === product.productId)
                {
                    item.quantity -= 1;
                }
            });
            setItems(items - 1);
            setTotal(total - product.price);
            return;
        }
        setCart(cart.filter((item) => item.productId !== product.productId));
        setItems(items - 1);
        setTotal(total - product.price);
    }

    const clearCart = () => {
        setItems(0);
        setCart([]);
        setTotal(0);
    }

    const addWithQuantity = (product:CartItem, quantity:number) => {
        for (let i = 0; i < quantity; i++) {
            addToCart(product);
        }
    }

    const removeWithQuantity = (product:CartItem, quantity:number) => {
        for (let i = 0; i < quantity; i++) {
            removeFromCart(product);
        }
        
    }


    return (
        <CartContext.Provider value={{cart, total,items, addToCart, removeFromCart,clearCart,addWithQuantity,removeWithQuantity}}>
            {children}
        </CartContext.Provider>
    )
}