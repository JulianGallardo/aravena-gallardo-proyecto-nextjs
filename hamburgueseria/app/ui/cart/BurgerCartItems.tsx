import React, { useEffect, useState } from "react";
import { CartItem, CartItemBurger } from "@/lib/types";
import { useCart } from "@/app/hooks/useCart";
import { AddToCartIcon, RemoveFromCartIcon } from "../shared/cartIcons";
import Image from "next/image";

interface BurgerCartItemsProps {
    item: CartItemBurger;
}

const BurgerCartItems: React.FC<BurgerCartItemsProps> = ({ item }) => {
    const [isMobile, setIsMobile] = useState(false);
    const { addToCartBurger, removeFromCartBurger } = useCart();

    const handleResize = () => {
        setIsMobile(window.innerWidth < 768);
    };

    useEffect(() => {
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const calculateTotal = () => {
        let total = item.price * item.quantity;
        item.extras.forEach(extra => {
            total += extra.extra.price * extra.quantity;
        });
        return total;
    }

    return (
        <div className="flex flex-col md:flex-row items-center border border-gray-300 rounded-lg shadow-lg mb-4 p-4 dark:bg-gray-900 dark:text-white">
            {!isMobile && (
                <div className="flex items-center justify-center w-full md:w-1/3 p-2">
                    <Image
                        width={200}
                        height={200}
                        src={item.imageUrl}
                        alt={item.name}
                        className="rounded-md"
                    />
                </div>
            )}
            <div className="flex-grow w-full md:w-2/3 mb-4 p-4">
                <div className="flex-grow ">
                    <h2 className="text-lg md:text-xl lg:text-2xl font-semibold">{item.name}</h2>
                    <p className="text-sm md:text-base lg:text-lg">Price per unit: ${item.price}</p>
                    <p className="text-sm md:text-base lg:text-lg">Extras:</p>
                    <div className="">
                        <ul className="flex flex-col md:grid grid-cols-2 gap-2">
                            {item.extras.map((extra, index) => (
                                <li key={index} className="text-sm w-fit md:w-full md:text-base lg:text-lg bg-slate-600  px-2 rounded-md">
                                    {extra.extra.name}
                                    <p className="text-xs md:text-sm lg:text-base">Quantity: {extra.quantity}</p>
                                    <p className="text-xs md:text-sm lg:text-base">Price: ${extra.extra.price}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <p className="text-sm md:text-base lg:text-lg">Total: ${calculateTotal()}</p>
                </div>
                <div className={`flex flex-row items-center ${isMobile ? 'justify-center' : 'justify-start'} mt-5`}>
                    <button className="btn bg-green-500 hover:bg-green-700 text-white px-4 py-2 rounded-md flex items-center">
                        <AddToCartIcon/>
                        Añadir
                    </button>
                    <p className="text-white mx-5">{item.quantity}</p>
                    <button className="btn bg-red-500 hover:bg-red-700 text-white px-4 py-2 rounded-md flex items-center" onClick={() => removeFromCartBurger(item)}>
                        <RemoveFromCartIcon/>
                        Remover
                    </button>
                </div>
                
            </div>
        </div>
    );
}

export default BurgerCartItems;
