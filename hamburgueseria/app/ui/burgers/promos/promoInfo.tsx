'use client';

import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import { useCart } from '@/app/hooks/useCart';
import { AddToCartIcon, RemoveFromCartIcon } from '@/app/ui/shared/cartIcons';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { CartItemPromo } from '@/lib/CartTypes';
import { PromoExtendida } from '@/lib/definitions';
import { getImageUrl } from '@/utils/cloudinaryUtils';
import { fetchPromoById } from '@/lib/crud';
import { toast } from 'react-toastify';

function PromoComponent() {

    const { addToCartPromo, removeFromCartPromo } = useCart();
    const pathname = usePathname();

    const [promoData, setPromoData] = useState<CartItemPromo | null>(null);
    const [cloudinaryImageUrl, setCloudinaryImageUrl] = useState<string>('');
    const [promoNotFound, setPromoNotFound] = useState<boolean>(false);

    const parseData = (data: PromoExtendida) => {
        const parsedData: CartItemPromo = {
            ...data,
            quantity: 1,
        };

        setPromoData(parsedData);
    }

    useEffect(() => {
        const getPromo = async () => {
            const pathnameArray = pathname.split('/');
            const promoId = pathnameArray[pathnameArray.length - 1];
            fetchPromoById(Number(promoId)).then((data) => {
                if (data) {
                    parseData(data);
                } else {
                    setPromoNotFound(true);
                }
            }).catch((error) => {
                console.error('Error fetching promo:', error);
                setPromoNotFound(true);
            });
        };
        getPromo();
    }, [pathname]);

    useEffect(() => {
        if (promoData) {
            getImageUrl(promoData.name).then((url) => {
                setCloudinaryImageUrl(url);
            }).catch((error) => {
                console.error('Error fetching image:', error);
            });
        }
    }, [promoData]);


    const handleAddToCart = (promoData: CartItemPromo) => {
        if (promoData) {
            addToCartPromo(promoData);
            toast.success('Promo añadida al carrito');
        }

    };

    const handleRemoveFromCart = (promoData: CartItemPromo) => {
        if (promoData) {
            removeFromCartPromo(promoData);
            toast.success('Promo eliminada del carrito');
        }
    }

    return (
        <div className="flex flex-col h-full mt-28 items-center transition duration-500 w-full text-dark md:px-10">

            { !promoNotFound &&
                <nav className="text-gray-700 text-lg mb-8 self-start w-full px-4">
                    <ol className="list-reset flex">
                        <li>
                            <Link href="/burgers">
                                Menu
                            </Link>
                        </li>
                        <li><span className="mx-2">/</span></li>
                        <li>
                            <Link href="/burgers/#PROMO">
                                Promos
                            </Link>
                        </li>
                        <li><span className="mx-2">/</span></li>
                        <li className="text-gray-400">{promoData ? promoData.name : 'Cargando...'}</li>
                    </ol>
                </nav>
            }
            {promoNotFound ? (
                <div className="flex flex-col items-center gap-5 p-4 w-full">
                    <h2 className="text-2xl font-bold">Promoción no encontrada</h2>
                    <p className="text-lg">Lo sentimos, la promoción que estás buscando no existe.</p>
                </div>
            ) : promoData && promoData.name && cloudinaryImageUrl !== "" ? (
                <div className="flex justify-stretch flex-col md:grid md:grid-cols-2 gap-5 p-4">
                    <div className="flex justify-center items-start w-full">
                        <div className="w-full h-auto max-w-lg">
                            <Image
                                src={cloudinaryImageUrl}
                                alt={promoData.name}
                                width={400}
                                height={400}
                                className="rounded-lg"
                            />
                        </div>
                    </div>
                    <div className='flex flex-col gap-2 w-full'>
                        <h1 className='text-lg md:text-2xl lg:text-3xl font-bold'>{promoData.name}</h1>
                        <label className="font-semibold md:text-lg lg:text-xl">Información del producto:</label>
                        <p className="md:text-lg lg:text-xl text-darkblue">{promoData.description}</p>
                        <label className="font-semibold md:text-lg lg:text-xl">Categoría:</label>
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
                            <button type="submit" className="btn btn-circle bg-green-500 hover:bg-green-700 text-white" onClick={() => handleAddToCart(promoData)}>
                                <AddToCartIcon />
                            </button>
                            <button type='submit' className="btn btn-circle bg-red-500 hover:bg-red-700 text-white" onClick={() => handleRemoveFromCart(promoData)}>
                                <RemoveFromCartIcon />
                            </button>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="flex flex-col md:flex-row items-center gap-5 p-4 w-2/3 mx-24">
                    <div className="skeleton h-96 w-96 rounded-lg bg-gray-300"></div>
                    <div className="flex flex-col gap-4 w-2/3">
                        <div className="skeleton h-4 w-full bg-gray-300 rounded"></div>
                        <div className="skeleton h-4 w-full bg-gray-300 rounded"></div>
                        <div className="skeleton h-4 w-full bg-gray-300 rounded"></div>
                        <div className="skeleton h-4 w-full bg-gray-300 rounded"></div>
                        <div className="skeleton h-4 w-full bg-gray-300 rounded"></div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default PromoComponent;
