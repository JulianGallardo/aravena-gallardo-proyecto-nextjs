import React from "react";
import { CartItem } from "@/lib/types";
import { useCart } from "@/app/hooks/useCart";
import { AddToCartIcon, RemoveFromCartIcon } from "../shared/cartIcons";
import Image from "next/image";
import ByteBurgersLogo from "@/public/ByteBurgersLogo.png";

interface CartItemsProps {
    item: CartItem
}

const CartItems: React.FC<CartItemsProps> = ({ item }) => {

    const { cart, addToCart, removeFromCart } = useCart();
    


    return (
        <div className={`flex items-center border rounded-lg shadow-lg mb-4 p-4`} >
            {
                    <div className="invisible flex items-center justify-center w-fit  bg-darkblue rounded-lg md:visible md:w-2/3">
                        <Image width={200} height={200} src={ByteBurgersLogo} alt="Byte Burgers Logo" className=" bg-lightgrey rounded-md p-2 " />
                    </div>
            }
            
            <div className={`flex-grow w-full  mb-4 p-4 `}>
                <div className="flex-grow text-white">
                    <h2 className="text-lg font-semibold">{item.name}</h2>
                    <p className="text-sm">Price per unit: ${item.price}</p>
                    <p className="text-sm">Total: ${item.price * item.quantity}</p>
                </div>
                <div className="flex flex-row items-center mt-5 ">
                    <button className="btn bg-darkblue text-white" onClick={() => addToCart(item)}> <AddToCartIcon /> </button>
                    <p className="text-white mx-5">{item.quantity}</p>   
                    <button className="btn bg-darkblue text-white" onClick={() => removeFromCart(item)}> <RemoveFromCartIcon /> </button>
                </div>

            </div>
        </div>
    )
}

export default CartItems;