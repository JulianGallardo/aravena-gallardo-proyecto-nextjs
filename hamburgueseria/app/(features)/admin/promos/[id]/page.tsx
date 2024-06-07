'use client'

import React, { Suspense, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { PromoExtendida } from "@/lib/definitions";
import { fetchPromoById } from "@/lib/crud";

const PromoManagmentPage = () => {
    const pathname = usePathname();
    const pathnameArray = pathname.split('/');
    const promoId = pathnameArray[pathnameArray.length - 1];

    const [promo, setPromo] = useState<PromoExtendida>();

    useEffect(() => {
        function fetchPromo() {
            fetchPromoById(Number(promoId)).then((data) => { setPromo(data as PromoExtendida) }).catch((error) => { console.error(error) });
        }
        fetchPromo();

    }, [promoId]);


    return (
        <div className="flex flex-col gap-5 justify-center items-center w-full py-10 h-full mt-24 text-black">
            <Suspense fallback={<div>Loading...</div>}>
                <h1 className="text-4xl font-bold dark:text-white">Editando promo numero : {promo?.promoId}</h1>
                <div className="flex flex-col gap-5 justify-center items-center w-full py-10">
                    <div className="max-w-md w-full bg-white shadow-lg rounded-lg overflow-hidden">
                        <div className="relative h-60 w-full rounded-md">
                            {promo && (
                                <Image
                                    src={promo.imageUrl}
                                    alt={promo.name}
                                    layout="fill"
                                    objectFit="contain"
                                />
                            )}
                        </div>
                        <div className="p-6">
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">Name:</label>
                                <h2 className="text-2xl font-bold">{
                                    promo && promo.name
                                }</h2>
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">Description:</label>
                                <p className="text-lg">{
                                    promo && promo.description
                                }</p>
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">Price:</label>
                                <p className="text-lg">${
                                    promo && promo.price
                                }</p>
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">Hamburguesas Incluidas:</label>
                                <div className="flex flex-col gap-2">
                                    {
                                        promo && promo.burgers.map((promoBurger) => (
                                            <div key={promoBurger.burger.burgerId} className="flex flex-col gap-2 bg-lightgrey border rounded p-2">
                                                <p>{promoBurger.burger.name} x {promoBurger.quantity}</p>
                                                <p>Precio: ${promoBurger.newPrice}</p>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                            <div className="flex justify-center items-center gap-4 p-6">
                                <button className="bg-green text-white p-2 px-4 rounded-lg">Edit</button>
                                <button className="bg-red text-white p-2  rounded-lg">Delete</button>
                            </div>
                        </div>
                    </div>
                </div>
            </Suspense>
        </div>
    );
}

export default PromoManagmentPage;
