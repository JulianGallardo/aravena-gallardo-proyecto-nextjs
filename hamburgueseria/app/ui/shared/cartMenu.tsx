import React from "react";
import { useCart } from "@/app/hooks/useCart";
import Link from "next/link";


interface CartMenuProps {
    handleCartClose: () => void;
    handleCartToggle: () => void;
    CartMenuShow: boolean;
}




const CartMenu: React.FC<CartMenuProps> = ({ handleCartClose, handleCartToggle, CartMenuShow }) => {
    const { cart, items, total} = useCart();


    return (
        <div>
            <div tabIndex={0} role="button" className="btn btn-ghost bg-lightgrey btn-circle" onClick={handleCartToggle}>
                <div className="indicator">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="black"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                    {
                        items > 0 && 
                        <span className="badge badge-sm indicator-item">
                            {items}
                        </span>

                    }
                </div>
            </div>
            {
                CartMenuShow &&
                <div tabIndex={0} className="mt-3 z-[1] card card-compact dropdown-content w-52 bg-lightgrey shadow">
                    <div className="card-body">
                        <span className="font-bold text-lg">Items: {items}</span>
                        <span className="white">Subtotal: ${total}</span>
                        <div className="card-actions items-center justify-center">
                            <Link href="/cart" className="flex justify-center items-center">
                                <button className="btn bg-darkblue text-sm text-white hover:bg-lightgrey hover:text-dark" onClick={handleCartClose}>Ver carrito</button>
                            </Link>
                        </div>
                    </div>
                </div>

            }

        </div>


    );
}

export default CartMenu;
