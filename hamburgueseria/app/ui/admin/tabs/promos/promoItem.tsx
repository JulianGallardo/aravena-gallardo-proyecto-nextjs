import { Burger, Promo,PromoBurger } from "@/prisma/generated/client";
import React, { useEffect, useState } from "react";
import Image from "next/image";


interface BurgerItemProps {
    promo: Promo;
    promoBurgers: PromoBurger;
    handleDeleteBurger: (burgerId: number) => void;
    handleUpdateBurger: (burgerId: number, updatedBurger: any) => void;
}

const BurgerItem = ({ promo,promoBurgers, handleDeleteBurger, handleUpdateBurger }: BurgerItemProps) => {
    const [burgers, setBurgers] = useState<Burger[]>([]);

    useEffect(() => {
        const fetchBurgers = async () => {
            const query = promoBurgers.burgerId ? `?productId=${promoBurgers.burgerId}` : '';
            const url = `/api/products/burgers${query}`;
            const res = await fetch('/api/products/burgers');
            const data = await res.json();
            setBurgers(data);
        };

        fetchBurgers();
    }, [promoBurgers]);

    return (
        <li key={promo.promoId} className="flex flex-col gap-5 bg-white shadow-md rounded-lg p-4 ">
            <h3 className="text-xl font-semibold mb-2">{promo.name}</h3>
            <div className="flex flex-col  md:grid grid-cols-6 gap-2">
                <div className="">
                    <h4 className="text-lg font-semibold mb-2">Description</h4>
                    <p className="mb-2">{promo.description}</p>
                </div>
                <div className="">
                    <h4 className="text-lg font-semibold mb-2">Category</h4>
                    <p className="mb-2">{promo.category}</p>
                </div>
                <div className="">
                    <h4 className="text-lg font-semibold mb-2">Price</h4>
                    <p className="mb-2">${promo.price}</p>
                </div>
                <div className="">
                    <h4 className="text-lg font-semibold mb-2">Image</h4>
                    <Image src={promo.imageUrl} alt={promo.name} width={100} height={100} />
                </div>
                <div className="">
                    <h4 className="text-lg font-semibold mb-2">Burgers Incluidas</h4>
                    {
                        

                    }

                </div>
                <div className="flex justify-between gap-5">

                    <button
                        onClick={() => handleDeleteBurger(promo.promoId)}
                        className="btn bg-red text-white px-4 py-2 rounded "
                    >
                        Delete
                    </button>
                    <button
                        onClick={() => handleUpdateBurger(promo.promoId, { ...promo, name: 'Updated Name' })}
                        className="btn bg-yellow text-white px-4 py-2 rounded-md"
                    >
                        Update
                    </button>
                </div>

            </div>

        </li>

    )

};

export default BurgerItem;