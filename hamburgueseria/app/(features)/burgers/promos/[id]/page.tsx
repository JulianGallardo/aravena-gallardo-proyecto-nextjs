'use client';

import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import { useCart } from '@/app/hooks/useCart';
import { AddToCartIcon, RemoveFromCartIcon } from '@/app/ui/shared/cartIcons';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { CartItemPromo } from '@/lib/types';
import { PromoExtendida } from '@/lib/definitions';
import { getImageUrl } from '@/utils/cloudinaryUtils';
import { Burger } from '@/prisma/generated/client';
import Carousel from '@/app/ui/burgers/carrouselRecomendedBurgers';
import { fetchAllBurgers, fetchAllPromos } from '@/lib/crud';

function PromoPage() {

    const { addToCartPromo, removeFromCartPromo } = useCart();
    const pathname = usePathname();

    const [promoData, setPromoData] = useState<CartItemPromo | null>(null);
    const [cloudinaryImageUrl, setCloudinaryImageUrl] = useState<string>('');
    const [recommendedBurgers, setRecommendedBurgers] = useState<{ burger: Burger, cloudinaryImageUrl: string }[]>([]);
    const [recommendedPromos, setRecommendedPromos] = useState<{ promo: PromoExtendida, cloudinaryImageUrl: string }[]>([]);

    const parseData = (data: PromoExtendida) => {
        const parsedData: CartItemPromo = {
            ...data,
            quantity: 1,
        };

        setPromoData(parsedData);
    }

    useEffect(() => {
        if (recommendedBurgers.length === 0) {
            const getRecommendedBurgers = async () => {
                const burgers = await fetchAllBurgers().then((data) =>
                    data.sort(() => Math.random() - 0.5).slice(0, 5)

                );
                const recommendedBurgers = await Promise.all(burgers.map(async (burger) => {
                    const url = await getImageUrl(burger.name);
                    return { burger, cloudinaryImageUrl: url };
                }));
                setRecommendedBurgers(recommendedBurgers);

            };
            const getRecommendedPromos = async () => {
                const promos = await fetchAllPromos().then((data) =>
                    data.sort(() => Math.random() - 0.5).slice(0, 5)

                );
                const recommendedPromos = await Promise.all(promos.map(async (promo) => {
                    const url = await getImageUrl(promo.name);
                    return { promo, cloudinaryImageUrl: url };
                }));
                setRecommendedPromos(recommendedPromos);
            };
            getRecommendedBurgers();
            getRecommendedPromos();
        }
    }, []);




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

    useEffect(() => {
        if (promoData) {
            getImageUrl(promoData.name).then((url) => {
                setCloudinaryImageUrl(url);
            }).catch((error) => {
                console.error('Error fetching image:', error);
            });
        }
    }, [promoData]);

    return (
        <div className="flex flex-col h-full my-28 items-center transition duration-500 w-screen text-dark md:px-10">
            <nav className="text-gray-700 text-lg mb-8 self-start w-full px-4">
                <ol className="list-reset flex">
                    <li>
                        <Link href="/burgers">
                            Menu
                        </Link>
                    </li>
                    <li><span className="mx-2">/</span></li>
                    <li>
                        <Link href="/burgers/#PROMO"  >
                            Promos
                        </Link>
                    </li>
                    <li><span className="mx-2">/</span></li>
                    <li className="text-gray-400">{promoData ? promoData.name : 'Cargando...'}</li>
                </ol>
            </nav>
            {promoData && promoData.name && recommendedBurgers && recommendedPromos && cloudinaryImageUrl !== "" ? (
                <div className="w-full flex flex-col  gap-5 p-4  ">
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
                                <button type="submit" className="btn btn-circle bg-green-500 hover:bg-green-700 text-white" onClick={() => addToCartPromo(promoData)}>
                                    <AddToCartIcon />
                                </button>
                                <button type='submit' className="btn btn-circle bg-red-500 hover:bg-red-700 text-white" onClick={() => removeFromCartPromo(promoData)}>
                                    <RemoveFromCartIcon />
                                </button>
                            </div>
                        </div>
                    </div>
                    <Carousel recommendedBurgers={recommendedBurgers} recommendedPromos={recommendedPromos} />
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
};

export default PromoPage;
