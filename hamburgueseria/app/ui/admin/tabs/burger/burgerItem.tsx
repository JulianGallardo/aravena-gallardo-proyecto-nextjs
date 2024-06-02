import { Burger } from "@/prisma/generated/client";
import React from "react";
import Image from "next/image";

interface BurgerItemProps {
    burger: Burger;
    handleDeleteBurger: (burgerId: number) => void;
    handleUpdateBurger: (burgerId: number, updatedBurger: any) => void;
}

const BurgerItem = ({ burger, handleDeleteBurger, handleUpdateBurger }: BurgerItemProps) => {

    return (
        <li key={burger.burgerId} className="flex flex-col gap-5 bg-white shadow-md rounded-lg p-4 ">
            <h3 className="text-xl font-semibold mb-2">{burger.name}</h3>
            <div className="flex flex-col  md:grid grid-cols-6 gap-2">
                <div className="">
                    <h4 className="text-lg font-semibold mb-2">Description</h4>
                    <p className="mb-2">{burger.description}</p>
                </div>
                <div className="">
                    <h4 className="text-lg font-semibold mb-2">Category</h4>
                    <p className="mb-2">{burger.category}</p>
                </div>
                <div className="">
                    <h4 className="text-lg font-semibold mb-2">Price</h4>
                    <p className="mb-2">${burger.price}</p>
                </div>
                <div className="">
                    <h4 className="text-lg font-semibold mb-2">Stock</h4>
                    <p className="mb-2">{burger.stock}</p>
                </div>
                <div className="">
                    <h4 className="text-lg font-semibold mb-2">Image</h4>
                    <Image src={burger.imageUrl} alt={burger.name} width={100} height={100} />
                </div>
                <div className="flex justify-between gap-5">

                    <button
                        onClick={() => handleDeleteBurger(burger.burgerId)}
                        className="btn bg-red text-white px-4 py-2 rounded "
                    >
                        Delete
                    </button>
                    <button
                        onClick={() => handleUpdateBurger(burger.burgerId, { ...burger, name: 'Updated Name' })}
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