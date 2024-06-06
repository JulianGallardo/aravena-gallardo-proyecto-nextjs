'use client'

import React, { Suspense, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Burger, Category } from "@/prisma/generated/client";
import { fetchBurgerById } from "@/lib/crud";
import Image from "next/image";

const BurgerManagmentPage = () => {
    const pathname = usePathname();
    const pathnameArray = pathname.split('/');
    const burgerId = pathnameArray[pathnameArray.length - 1];

    const [burgerData, setBurgerData] = useState<Burger>({
        productId: 0,
        burgerId: 0,
        name: '',
        category: Category.SIMPLE,
        description: '',
        price: 0,
        stock: 0,
        imageUrl: ''
    });

    useEffect(() => {
        function fetchBurger() {
            fetchBurgerById(Number(burgerId)).then((data) => { setBurgerData(data as Burger) }).catch((error) => { console.error(error) });
        }

        fetchBurger();

    }, [burgerId]);

    const handleDelete = async () => {
        // await deleteBurger(Number(burgerId));
    }

    const handleEdit = async () => {
        // await editBurger(Number(burgerId));
    }


    return (
        <div className="flex flex-col gap-5 justify-center items-center w-full py-10 h-full mt-24">
            <Suspense fallback={<div>Loading...</div>}>
                <div className="flex flex-col gap-5 justify-center items-center w-full py-10">
                    <div className="max-w-md w-full bg-white shadow-lg rounded-lg overflow-hidden">
                        <div className="relative h-60 w-full rounded-md">
                            <Image
                                src={burgerData.imageUrl}
                                alt={burgerData.name}
                                layout="fill"
                                objectFit="contain"
                            />
                        </div>
                        <div className="p-6">
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">Name:</label>
                                <h2 className="text-2xl font-bold">{burgerData.name}</h2>
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">Description:</label>
                                <p className="text-lg">{burgerData.description}</p>
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">Price:</label>
                                <p className="text-lg">${burgerData.price}</p>
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">Stock:</label>
                                <p className="text-lg">{burgerData.stock}</p>
                            </div>
                        </div>
                        <div className="flex justify-center items-center gap-4 p-6">
                            <button className="bg-green text-white p-2 px-4 rounded-lg">Edit</button>
                            <button className="bg-red text-white p-2  rounded-lg">Delete</button>
                        </div>
                    </div>
                </div>
            </Suspense>
        </div>
    );
}

export default BurgerManagmentPage;
