import React from "react";
import { useCart } from "@/app/hooks/useCart";
import Link from "next/link";


interface CartMenuProps {
    handleCartClose: () => void;
}




const CartMenu: React.FC<CartMenuProps> = ({ handleCartClose }) => {
    const { cart, items, total, addToCart, removeFromCart } = useCart();


    return (
        <div tabIndex={0} className="mt-3 z-[1] card card-compact dropdown-content w-52 bg-lightgrey shadow">
            <div className="card-body">
                <span className="font-bold text-lg">Items: {items}</span>
                <span className="white">Subtotal: ${total}</span>
                <div className="card-actions">
                    <Link href="/cart">
                        <button className="btn bg-darkblue text-sm w-full text-white hover:bg-lightgrey hover:text-dark" onClick={handleCartClose}>Ver carrito</button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default CartMenu;
