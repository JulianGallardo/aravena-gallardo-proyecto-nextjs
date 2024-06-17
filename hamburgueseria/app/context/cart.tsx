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
    addToCartBurger: () => { },
    removeFromCartBurger: () => { },
    addToCartPromo: () => { },
    removeFromCartPromo: () => { },
    clearCart: () => { },
});

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
    const [cart, setCart] = useState<CartItem[]>([]);
    const [items, setItems] = useState(0);
    const [total, setTotal] = useState(0);
    const [load, setLoad] = useState(false);

    const updateLocalStorage = (cart: CartItem[]) => {
        window.localStorage.setItem("cart", JSON.stringify(cart));
    };


    const sumBurgerPriceWithExtras = (burger: CartItemBurger|null) => {
        if(burger == null) return 0;
        let price = burger.price;
        for (let i = 0; i < burger.extras.length; i++) {
            price += burger.extras[i].extra.price * burger.extras[i].quantity;
        }
        return price * burger.quantity;
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

        setItems(cart.reduce((acc, item) => acc + (item.cartItemBurger?.quantity || 0) + (item.cartItemPromo?.quantity || 0), 0));
        setTotal(cart.reduce((acc, item) =>
            acc + sumBurgerPriceWithExtras(item.cartItemBurger)  + (item.cartItemPromo?.price || 0) * (item.cartItemPromo?.quantity || 0), 0)
        );


        if(items<0){
            setItems(0);
        }
        if(total<0){
            setTotal(0);
        }
    }, [cart]);


    const areExtrasEqual = (extras1: ExtraInCart[], extras2: ExtraInCart[]) => {
        if (extras1.length !== extras2.length) return false;
        for (let i = 0; i < extras1.length; i++) {
            if (extras1[i].extra.extraId !== extras2[i].extra.extraId || extras1[i].quantity !== extras2[i].quantity) return false;
        }
        return true;
    };

    const addToCartBurger = (product: CartItemBurger) => {
        setCart((prevCart) => {
            const existingProduct = prevCart.find((item) =>
                item.cartItemBurger?.productId === product.productId && areExtrasEqual(item.cartItemBurger.extras, product.extras)
            );

            if (existingProduct) {
                return prevCart.map((item) =>
                    item.cartItemBurger?.productId === product.productId && areExtrasEqual(item.cartItemBurger.extras, product.extras)
                        ? { ...item, cartItemBurger: { ...item.cartItemBurger, quantity: item.cartItemBurger.quantity + 1 } }
                        : item
                );
            }
            return [...prevCart, { cartItemBurger: { ...product, quantity: 1 }, cartItemPromo: null }];
        });
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
    }



    const removeFromCartBurger = (product: CartItemBurger) => {
        setCart((prevCart) => {
            const existingProduct = prevCart.find((item) =>
                item.cartItemBurger?.productId === product.productId && areExtrasEqual(item.cartItemBurger.extras, product.extras)
            );
            if (existingProduct && existingProduct.cartItemBurger != undefined) {
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
    };


    const removeFromCartPromo = (product: CartItemPromo) => {
        setCart((prevCart) => {
            const existingProduct = prevCart.find((item) =>
                item.cartItemPromo?.promoId === product.promoId
            );
            if (existingProduct && existingProduct.cartItemPromo != undefined) {
                if (existingProduct.cartItemPromo?.quantity > 1) {
                    return prevCart.map((item) =>
                        item.cartItemPromo?.promoId === product.promoId
                            ? { ...item, cartItemPromo: { ...item.cartItemPromo, quantity: item.cartItemPromo.quantity - 1 } }
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
    };


    const clearCart = () => {
        setCart([]);
    };


    return (
        <CartContext.Provider value={{ cart, total, items, addToCartBurger, removeFromCartBurger, addToCartPromo, removeFromCartPromo, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};
