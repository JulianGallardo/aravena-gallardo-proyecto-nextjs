import React, { useEffect, useState } from "react";
import { CartItemPromo } from "@/lib/types";
import { useCart } from "@/app/hooks/useCart";
import { AddToCartIcon, RemoveFromCartIcon } from "../shared/cartIcons";
import Image from "next/image";
import { getImageUrl } from "@/utils/cloudinaryUtils";

interface PromoCartItemsProps {
    item: CartItemPromo;
}

const PromoCartItems: React.FC<PromoCartItemsProps> = ({ item }) => {
    const [isMobile, setIsMobile] = useState(false);
    const { addToCartPromo, removeFromCartPromo } = useCart();
    const [cloudinaryImageUrl, setCloudinaryImageUrl] = useState<string>("");

    const handleResize = () => {
        setIsMobile(window.innerWidth < 768);
    };

    useEffect(() => {
        const getCloudinaryImageUrl = async () => {
            try {
                const url = getImageUrl(item.name).then((url) => {
                    setCloudinaryImageUrl(url);
                });
            } catch (error) {
                console.error('Error fetching image:', error);
            }
        };
        getCloudinaryImageUrl();
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };


    }, []);



    return (
        <div className="flex flex-col md:flex-row items-center rounded-lg shadow-lg mb-4 p-4 dark:bg-gray-900 dark:text-white">
            {!isMobile && cloudinaryImageUrl != "" && (
                <div className="flex items-center justify-center w-full md:w-1/3 p-2">
                    <Image
                        width={200}
                        height={200}
                        src={cloudinaryImageUrl}
                        alt={item.name}
                        className="rounded-md"
                    />
                </div>
            )}
            {
                (cloudinaryImageUrl != "") ? (

                

                <div className="flex-grow w-full md:w-2/3 mb-4 p-4">
                    <div className="flex-grow ">
                        <h2 className="text-lg md:text-xl lg:text-2xl font-semibold">{item.name}</h2>
                        <p className="text-sm md:text-base lg:text-lg">Price per unit: ${item.price}</p>
                        <p className="text-sm md:text-base lg:text-lg">Burgers incluidas:</p>
                        <div className="">
                            <ul className="flex flex-col md:grid grid-cols-2 gap-2">
                                {
                                    item.burgers.map((burger, index) => (
                                        <li key={index} className="text-sm w-fit md:w-full md:text-base lg:text-lg bg-slate-600  px-2 rounded-md">
                                            {burger.burger.name}
                                            <p className="text-xs md:text-sm lg:text-base">Cantidad: {burger.quantity}</p>
                                            <p className="text-xs md:text-sm lg:text-base">Precio en promo: ${burger.newPrice}</p>
                                        </li>
                                    ))

                                }
                            </ul>
                        </div>
                        <p className="text-sm md:text-base lg:text-lg">Total: ${item.quantity * item.price}</p>
                    </div>
                    <div className={`flex flex-row items-center ${isMobile ? 'justify-center' : 'justify-start'} mt-5`}>
                        <button className="btn bg-green-500 hover:bg-green-700 text-white px-4 py-2 rounded-md flex items-center " onClick={() => addToCartPromo(item)}>
                            <AddToCartIcon />
                            {isMobile ? '' : 'Agregar'}
                        </button>
                        <p className="text-white mx-5">{item.quantity}</p>
                        <button className="btn  bg-red-500 hover:bg-red-700 text-white px-4 py-2 rounded-md flex items-center" onClick={() => removeFromCartPromo(item)}>
                            <RemoveFromCartIcon />
                            {isMobile ? '' : 'Remover'}
                        </button>
                    </div>
                </div>
                )
                :
                (
                    <div className="flex flex-col md:flex-row items-center gap-5 p-4 w-2/3 mx-24">
                        <div className="skeleton h-40 w-40 rounded-lg bg-gray-300"></div>
                        <div className="flex flex-col gap-4 w-2/3">
                            <div className="skeleton h-4 w-full bg-gray-300 rounded"></div>
                            <div className="skeleton h-4 w-full bg-gray-300 rounded"></div>
                            <div className="skeleton h-4 w-full bg-gray-300 rounded"></div>
                            <div className="skeleton h-4 w-full bg-gray-300 rounded"></div>
                            <div className="skeleton h-4 w-full bg-gray-300 rounded"></div>
                        </div>
                    </div>
                )
            }
        </div>
    );
}

export default PromoCartItems;
