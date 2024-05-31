import { createContext,useState } from "react";
import { set } from "zod";

export const CartContext = createContext();

export const CartProvider = ({children}) => {
    const [cart, setCart] = useState([]);
    const [items, setItems] = useState(0);
    const [total, setTotal] = useState(0);

    const addToCart = (product) => {
        const check = cart.every(item => item.id !== product.id);
        if(!check)
        {
            cart.map((item) => {
                if(item.id === product.id)
                {
                    item.quantity += 1;
                }
            });
            setItems(items + 1);
            setTotal(total + product.price);
            return;
        }
        product.quantity = 1;
        setCart([...cart, product]);
        setItems(items + 1);
        setTotal(total + product.price);
    }

    const removeFromCart = (product) => {
        if(product.quantity > 1)
        {
            cart.map((item) => {
                if(item.id === product.id)
                {
                    item.quantity -= 1;
                }
            });
            setItems(items - 1);
            setTotal(total - product.price);
            return;
        }
        setCart(cart.filter((item) => item.id !== product.id));
        setItems(items - 1);
        setTotal(total - product.price);
    }

    const clearCart = () => {
        setItems(0);
        setCart([]);
        setTotal(0);
    }

    const addWithQuantity = (product, quantity) => {
        for (let i = 0; i < quantity; i++) {
            addToCart(product);
        }
    }

    const removeWithQuantity = (product, quantity) => {
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