"use client";
import { useCart } from "@/app/hooks/useCart";

export const FooterDev = () => {
  const {cart, addToCart, removeFromCart} = useCart();
return (
    <>
        <footer className="bg-dark opacity-90 text-white p-4 fixed bottom-0 left-0 right-0">
            {JSON.stringify(cart)}
        </footer>
    </>
);
}

export default FooterDev;