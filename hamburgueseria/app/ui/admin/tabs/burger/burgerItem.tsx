import { Burger } from "@/prisma/generated/client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import arrowIcon from '@/public/arrow.svg';

interface BurgerItemProps {
    burger: Burger;
}

const BurgerItem = ({ burger}: BurgerItemProps) => {

    return (
        <Link href={`/admin/burgers/${burger.burgerId}`} >
            <li key={burger.burgerId} className="transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-black flex flex-col gap-5 h-full bg-white shadow-md rounded-lg p-4 text-black shadow-black hover:bg-lightgrey ">
                <h3 className="text-xl font-semibold mb-2">{burger.name}</h3>
                <div className="flex flex-row gap-2">
                    <div className="flex flex-col  md:grid grid-cols-6 gap-2 w-full ">
                        <div className="">
                            <h4 className="text-md font-semibold mb-2">Description</h4>
                            <p className="text-sm mb-2">{burger.description}</p>
                        </div>
                        <div className="">
                            <h4 className="text-md font-semibold mb-2">Category</h4>
                            <p className="text-sm mb-2">{burger.category}</p>
                        </div>
                        <div className="">
                            <h4 className="text-lg font-semibold mb-2">Price</h4>
                            <p className="text-sm mb-2">${burger.price}</p>
                        </div>
                        <div className="">
                            <h4 className="text-md font-semibold mb-2">Stock</h4>
                            <p className="text-sm mb-2">{burger.stock}</p>
                        </div>
                        <div className="">
                            <h4 className="text-md font-semibold mb-2">Image</h4>
                            <Image src={burger.imageUrl} alt={burger.name} width={100} height={100} />
                        </div>

                        <div className="flex flex-col w-1/7  items-center justify-center ">
                            <Image src={arrowIcon} alt="edit" width={50} height={50} />
                        </div>


                    </div>
                </div>

            </li>
        </Link>

    )

};

export default BurgerItem;