import { createContext, useEffect, useState } from "react";
import { CartItem, CartItemBurger, CartItemPromo, ExtraInCart } from "@/lib/types";

interface CartContextType {
    cart: CartItem[];
    total: number;
    items: number;
    addToCartBurger: (product: CartItemBurger) => void;
    removeFromCartBurger: (product: CartItemBurger) => void;
    addToCartPromo: (product: CartItemPromo) => void;
    removeFromCartPromo: (product: CartItemPromo) => void;
    clearCart: () => void;
}

export const CartContext = createContext<CartContextType>({
    cart: [],
    total: 0,
    items: 0,
    addToCartBurger: () => {},
    removeFromCartBurger: () => {},
    addToCartPromo: () => {},
    removeFromCartPromo: () => {},
    clearCart: () => {},
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
                setItems(cartInitialState.reduce((acc, item) => acc + (item.cartItemBurger?.quantity || 0) + (item.cartItemPromo?.quantity || 0), 0));
                setTotal(cartInitialState.reduce((acc, item) => 
                    acc + (item.cartItemBurger?.price || 0) * (item.cartItemBurger?.quantity || 0) + (item.cartItemPromo?.price || 0) * (item.cartItemPromo?.quantity || 0), 0)
                );
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

    const addToCartBurger = (product: CartItemBurger) => {
        setCart((prevCart) => {
            const existingProduct = prevCart.find((item) => 
                item.cartItemBurger?.productId === product.productId && areExtrasEqual(item.cartItemBurger.extras, product.extras)
            );
            
            if (existingProduct) {
                console.log("product",existingProduct);
                return prevCart.map((item) =>
                    item.cartItemBurger?.productId === product.productId && areExtrasEqual(item.cartItemBurger.extras, product.extras)
                        ? { ...item, cartItemBurger: { ...item.cartItemBurger, quantity: item.cartItemBurger.quantity + 1 } }
                        : item
                );
            }
            return [...prevCart, { cartItemBurger: { ...product, quantity: 1 }, cartItemPromo: null }];
        });
        setItems((prevItems) => prevItems + 1);
        setTotal((prevTotal) => prevTotal + product.price + product.extras.reduce((acc, extra) => acc + extra.extra.price * extra.quantity, 0));
    };


    const addToCartPromo = (product: CartItemPromo) => {
        setCart((prevCart) => {
            const existingProduct = prevCart.find((item) => 
                item.cartItemPromo?.productId === product.productId
            );
            if (existingProduct) {
                return prevCart.map((item) =>
                    item.cartItemPromo?.promoId === product.promoId
                        ? { ...item, cartItemPromo: { ...item.cartItemPromo, quantity: item.cartItemPromo.quantity + 1 } }
                        : item
                );
            }
            return [...prevCart, { cartItemPromo: { ...product, quantity: 1 }, cartItemBurger: null }];
        });
        setItems((prevItems) => prevItems + 1);
        setTotal((prevTotal) => prevTotal + product.price );
    }



    const removeFromCartBurger = (product: CartItemBurger) => {
        setCart((prevCart) => {
            const existingProduct = prevCart.find((item) => 
                item.cartItemBurger?.productId === product.productId && areExtrasEqual(item.cartItemBurger.extras, product.extras)
            );
            if (existingProduct && existingProduct.cartItemBurger !=undefined) {
                if (existingProduct.cartItemBurger?.quantity > 1) {
                    return prevCart.map((item) =>
                        item.cartItemBurger?.productId === product.productId && areExtrasEqual(item.cartItemBurger.extras, product.extras)
                            ? { ...item, cartItemBurger: { ...item.cartItemBurger, quantity: item.cartItemBurger.quantity - 1 } }
                            : item
                    );
                } else {
                    return prevCart.filter((item) => 
                        !(item.cartItemBurger?.productId === product.productId && areExtrasEqual(item.cartItemBurger.extras, product.extras))
                    );
                }
            }
            return prevCart;
        });
        setItems((prevItems) => prevItems - 1);
        setTotal((prevTotal) => prevTotal - product.price);
    };


    const removeFromCartPromo = (product: CartItemPromo) => {
        setCart((prevCart) => {
            const existingProduct = prevCart.find((item) => 
                item.cartItemPromo?.promoId === product.promoId
            );
            if (existingProduct && existingProduct.cartItemPromo !=undefined) {
                if (existingProduct.cartItemPromo?.quantity > 1) {
                    return prevCart.map((item) =>
                        item.cartItemPromo?.promoId === product.promoId
                            ? { ...item, cartItemPromo: { ...item.cartItemPromo, quantity: item.cartItemPromo.quantity - 1 }}
                            : item
                    );
                } else {
                    return prevCart.filter((item) => 
                        !(item.cartItemPromo?.promoId === product.promoId)
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


    return (
        <CartContext.Provider value={{ cart, total, items, addToCartBurger, removeFromCartBurger, addToCartPromo, removeFromCartPromo, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};
