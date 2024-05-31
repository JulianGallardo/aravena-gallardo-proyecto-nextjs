import { createContext,useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({children}) => {
    const [cart, setCart] = useState([]);
    const [total, setTotal] = useState(0);

    const addToCart = (product) => {
        setCart([...cart, product]);
        setTotal(total + product.price);
    }

    const removeFromCart = (product) => {
        setCart(cart.filter((item) => item.id !== product.id));
        setTotal(total - product.price);
    }

    

    return (
        <CartContext.Provider value={{cart, total, addToCart, removeFromCart}}>
            {children}
        </CartContext.Provider>
    )
}