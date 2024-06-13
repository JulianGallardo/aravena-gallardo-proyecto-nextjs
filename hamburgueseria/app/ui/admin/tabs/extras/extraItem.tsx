import {  Extra } from "@/prisma/generated/client";
import React from "react";


interface PromoItemProps {
    extra: Extra
}

const ExtraItem = ({ extra }: PromoItemProps) => {


    return (
            <li key={extra.extraId} className="flex flex-col gap-5 bg-white shadow-md rounded-lg text-black p-4 hover:bg-lightgrey ">
                <h3 className="text-xl font-semibold mb-2 ">{extra.name}</h3>
                <div className="flex flex-col  md:grid grid-cols-4 gap-2">
                    <div className="">
                        <h4 className="text-lg font-semibold mb-2 ">Maxima cantidad asignable</h4>
                        <p className="mb-2">{extra.maxQuantity}</p>
                    </div>
                    <div className="">
                        <h4 className="text-lg font-semibold mb-2">Precio</h4>
                        <p className="mb-2">$ {extra.price}</p>
                    </div>
                </div>
                <div className="flex flex-row gap-5  w-full">
                    <button className="bg-green text-white p-2 px-4 rounded-lg">Edit</button>
                    <button className="bg-red text-white p-2  rounded-lg">Delete</button>
                </div>
            </li>

    )

};

export default ExtraItem;