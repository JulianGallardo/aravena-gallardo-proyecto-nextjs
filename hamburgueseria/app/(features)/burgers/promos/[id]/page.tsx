'use client';

import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import { useCart } from '@/app/hooks/useCart';
import { AddToCartIcon, RemoveFromCartIcon } from '@/app/ui/shared/cartIcons';
import { usePathname } from 'next/navigation';
import {  CartItemPromo } from '@/lib/types';
import { PromoExtendida } from '@/lib/definitions';



function PromoPage() {

    const { addToCartPromo, removeFromCartPromo } = useCart();
    const pathname = usePathname();

    const [promoData, setPromoData] = useState<CartItemPromo | null>(null);


    
   
     const parseData = (data: PromoExtendida) => {
        console.log(data);
        const parsedData: CartItemPromo = {
            ...data,
            quantity: 1,
        };
        setPromoData(parsedData);
    }

    


    useEffect(() => {
        const getBurger = async () => {
            const pathnameArray = pathname.split('/');
            const burgerId = pathnameArray[pathnameArray.length - 1];
            const query = burgerId ? `?productId=${burgerId}` : '';
            const url = `/api/products/promos${query}`;

            try {
                const res = await fetch(url, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                const data = await res.json();
                parseData(data.body);
            } catch (error) {
                console.error('Error fetching burger:', error);
            }

        
        };
        getBurger();
    }, []);


    return (
        <div className="flex flex-col h-full my-28 items-center transition duration-500 w-screen text-dark">
            {promoData && promoData.name ? (
                <div className="flex justify-stretch flex-col md:grid md:grid-cols-2 gap-5 p-4 ">
                    <div className="flex justify-center items-start w-full">
                        <div className="w-full h-auto max-w-lg">
                            <Image
                                src={promoData.imageUrl}
                                alt={promoData.name}
                                width={400}
                                height={400}
                                className="rounded-lg"
                            />
                        </div>
                    </div>
                    <div className='flex flex-col gap-2 w-full'>
                        <h1 className='text-lg md:text-2xl lg:text-3xl font-bold'>{promoData.name}</h1>
                        <label className="font-semibold md:text-lg lg:text-xl">Informacion del producto:</label>
                        <p className="md:text-lg lg:text-xl text-darkblue">{promoData.description}</p>
                        <label className="font-semibold md:text-lg lg:text-xl">Categoria:</label>
                        <p className="md:text-lg lg:text-xl text-darkblue">{promoData.category}</p>
                        <label className="font-semibold md:text-lg lg:text-xl">Precio:</label>
                        <p className="md:text-lg lg:text-xl text-darkblue">${promoData.price}</p>
                        <label className="font-semibold md:text-lg lg:text-xl">Bytes incluidas</label>
                        <ul className="md:text-lg lg:text-xl">
                            {promoData.burgers.map((burger, index) => (
                                <li key={index} className="text-darkblue">
                                    {burger.burger.name} x {burger.quantity} - ${burger.newPrice}
                                </li>
                            ))}
                        </ul>
                        
                            <div className="flex gap-5">
                                <button type="submit" className="btn btn-circle bg-green-500 hover:bg-green-700 text-white" onClick={()=> addToCartPromo(promoData)}>
                                    <AddToCartIcon />
                                </button>

                                <button type='submit' className="btn btn-circle bg-red-500 hover:bg-red-700 text-white" onClick={() => removeFromCartPromo(promoData)}>
                                    <RemoveFromCartIcon />
                                </button>
                            </div>
                        
                    </div>
                </div>
                
            ) : (
                <div className="flex flex-col md:flex-row items-center gap-5 p-4 w-2/3 mx-24">
                    <div className="skeleton h-96 w-96 rounded-lg bg-gray-300"></div>
                    <div className="flex flex-col gap-4 w-2/3">
                        <div className="skeleton h-4 w-full bg-gray-300 rounded "></div>
                        <div className="skeleton h-4 w-full bg-gray-300 rounded"></div>
                        <div className="skeleton h-4 w-full bg-gray-300 rounded"></div>
                        <div className="skeleton h-4 w-full bg-gray-300 rounded"></div>
                        <div className="skeleton h-4 w-full bg-gray-300 rounded"></div>
                    </div>
                </div>
            )}


        </div>
    );
};

export default PromoPage;
