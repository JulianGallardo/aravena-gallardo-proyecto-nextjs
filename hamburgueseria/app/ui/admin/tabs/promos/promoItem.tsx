import { Burger, Promo,PromoBurger } from "@/prisma/generated/client";
import React from "react";
import Image from "next/image";


interface PromoItemProps {
    promo: Promo;
    burgersInPromo: Burger[];
    relationBurgersPromo: PromoBurger[];
    handleDeleteBurger: (burgerId: number) => void;
    handleUpdateBurger: (burgerId: number, updatedBurger: any) => void;
}

const PromoItem = ({ promo,relationBurgersPromo,burgersInPromo, handleDeleteBurger, handleUpdateBurger }: PromoItemProps) => {
   

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
                        relationBurgersPromo.map((promoBurger) => {
                            const burger = burgersInPromo.find((burger) => burger.burgerId === promoBurger.burgerId);
                            return (
                                <p key={promoBurger.burgerId} className="mb-2">{burger?.name} x {promoBurger.quantity}</p>
                            )
                        })

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

export default PromoItem;