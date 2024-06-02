import { createContext, use, useEffect, useState } from "react";
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
    addToCart: (product: CartItem) => { },
    removeFromCart: (product: CartItem) => { },
    clearCart: () => { },
    addWithQuantity: (product: CartItem, quantity: number) => { },
    removeWithQuantity: (product: CartItem, quantity: number) => { },
});

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
    const [cart, setCart] = useState<CartItem[]>([]);
    const [items, setItems] = useState(0);
    const [total, setTotal] = useState(0);
    const [load, setLoad] = useState(false);


    const updateLocalStorage = (cart: CartItem[]) => {
        window.localStorage.setItem("cart", JSON.stringify(cart));
    }

    

    useEffect(() => {   
        if (load === false) { //si es la primera carga, lo busco en local storage
            const data = window.localStorage.getItem("cart");
            console.log("data", data);
            if (data) {
                console.log("data, entro", data);
                const cartInitialState = JSON.parse(data) as CartItem[];
                console.log("cartInitialState", cartInitialState);
                setCart(cartInitialState);
                setItems(cartInitialState.reduce((acc, item) => acc + item.quantity, 0));
                setTotal(cartInitialState.reduce((acc, item) => acc + item.price * item.quantity, 0));
            }
            setLoad(true);
        }
        else { //sino lo voy actualizando
            updateLocalStorage(cart);
        }
    }, [cart]);


    const addToCart = (product: CartItem) => {
        setCart((prevCart) => {
            const existingProduct = prevCart.find((item) => item.productId === product.productId);
            if (existingProduct) {
                return prevCart.map((item) =>
                    item.productId === product.productId
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }
            return [...prevCart, { ...product, quantity: 1 }];
        });
        setItems((prevItems) => prevItems + 1);
        setTotal((prevTotal) => prevTotal + product.price);
    };

    const removeFromCart = (product: CartItem) => {
        setCart((prevCart) => {
            const existingProduct = prevCart.find((item) => item.productId === product.productId);
            if (existingProduct) {
                if (existingProduct.quantity > 1) {
                    return prevCart.map((item) =>
                        item.productId === product.productId
                            ? { ...item, quantity: item.quantity - 1 }
                            : item
                    );
                } else {
                    return prevCart.filter((item) => item.productId !== product.productId);
                }
            }
            return prevCart;
        });
        setItems((prevItems) => prevItems - 1);
        setTotal((prevTotal) => prevTotal - product.price);
    };

    const clearCart = () => {
        setCart([]);
        setItems(0);
        setTotal(0);
    };

    const addWithQuantity = (product: CartItem, quantity: number) => {
        setCart((prevCart) => {
            const existingProduct = prevCart.find((item) => item.productId === product.productId);
            if (existingProduct) {
                return prevCart.map((item) =>
                    item.productId === product.productId
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                );
            }
            return [...prevCart, { ...product, quantity }];
        });
        setItems((prevItems) => prevItems + quantity);
        setTotal((prevTotal) => prevTotal + product.price * quantity);
    };

    const removeWithQuantity = (product: CartItem, quantity: number) => {
        setCart((prevCart) => {
            const existingProduct = prevCart.find((item) => item.productId === product.productId);
            if (existingProduct) {
                if (existingProduct.quantity > quantity) {
                    return prevCart.map((item) =>
                        item.productId === product.productId
                            ? { ...item, quantity: item.quantity - quantity }
                            : item
                    );
                } else {
                    return prevCart.filter((item) => item.productId !== product.productId);
                }
            }
            return prevCart;
        });
        setItems((prevItems) => prevItems - quantity);
        setTotal((prevTotal) => prevTotal - product.price * quantity);
    };

    return (
        <CartContext.Provider value={{ cart, total, items, addToCart, removeFromCart, clearCart, addWithQuantity, removeWithQuantity }}>
            {children}
        </CartContext.Provider>
    );
};
