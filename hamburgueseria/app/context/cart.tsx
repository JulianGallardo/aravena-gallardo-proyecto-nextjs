import { createContext, useEffect, useState } from "react";
import { CartItem, ExtraInCart } from "@/lib/types";

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
    addToCart: () => {},
    removeFromCart: () => {},
    clearCart: () => {},
    addWithQuantity: () => {},
    removeWithQuantity: () => {},
});

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
    const [cart, setCart] = useState<CartItem[]>([]);
    const [items, setItems] = useState(0);
    const [total, setTotal] = useState(0);
    const [load, setLoad] = useState(false);

    const updateLocalStorage = (cart: CartItem[]) => {
        window.localStorage.setItem("cart", JSON.stringify(cart));
    };

    useEffect(() => {   
        if (load === false) {
            const data = window.localStorage.getItem("cart");
            if (data) {
                const cartInitialState = JSON.parse(data) as CartItem[];
                setCart(cartInitialState);
                setItems(cartInitialState.reduce((acc, item) => acc + item.quantity, 0));
                setTotal(cartInitialState.reduce((acc, item) => acc + item.price * item.quantity, 0));
            }
            setLoad(true);
        } else {
            updateLocalStorage(cart);
        }
        console.log(cart);
    }, [cart]);

    const areExtrasEqual = (extras1: ExtraInCart[], extras2: ExtraInCart[]) => {
        if (extras1.length !== extras2.length) return false;
        return extras1.every(extra1 => 
            extras2.some(extra2 => extra1.extra.extraId === extra2.extra.extraId && extra1.quantity === extra2.quantity)
        );
    };

    const addToCart = (product: CartItem) => {
        setCart((prevCart) => {
            const existingProduct = prevCart.find((item) => 
                item.productId === product.productId && areExtrasEqual(item.extras, product.extras)
            );
            if (existingProduct) {
                return prevCart.map((item) =>
                    item.productId === product.productId && areExtrasEqual(item.extras, product.extras)
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
            const existingProduct = prevCart.find((item) => 
                item.productId === product.productId && areExtrasEqual(item.extras, product.extras)
            );
            if (existingProduct) {
                if (existingProduct.quantity > 1) {
                    return prevCart.map((item) =>
                        item.productId === product.productId && areExtrasEqual(item.extras, product.extras)
                            ? { ...item, quantity: item.quantity - 1 }
                            : item
                    );
                } else {
                    return prevCart.filter((item) => 
                        !(item.productId === product.productId && areExtrasEqual(item.extras, product.extras))
                    );
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
            const existingProduct = prevCart.find((item) => 
                item.productId === product.productId && areExtrasEqual(item.extras, product.extras)
            );
            if (existingProduct) {
                return prevCart.map((item) =>
                    item.productId === product.productId && areExtrasEqual(item.extras, product.extras)
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
            const existingProduct = prevCart.find((item) => 
                item.productId === product.productId && areExtrasEqual(item.extras, product.extras)
            );
            if (existingProduct) {
                if (existingProduct.quantity > quantity) {
                    return prevCart.map((item) =>
                        item.productId === product.productId && areExtrasEqual(item.extras, product.extras)
                            ? { ...item, quantity: item.quantity - quantity }
                            : item
                    );
                } else {
                    return prevCart.filter((item) => 
                        !(item.productId === product.productId && areExtrasEqual(item.extras, product.extras))
                    );
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
