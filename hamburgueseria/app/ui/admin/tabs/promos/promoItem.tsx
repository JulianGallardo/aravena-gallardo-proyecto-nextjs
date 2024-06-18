import React, { useEffect, useState } from "react";
import Image from "next/image";
import { PromoExtendida } from "@/lib/definitions";
import Link from "next/link";
import { getImageUrl } from "@/utils/cloudinaryUtils";



interface PromoItemProps {
    promo: PromoExtendida
}

const PromoItem = ({ promo }: PromoItemProps) => {
    const [cloudinaryImg, setCloudinaryImg] = useState<string>("");

    useEffect(() => {
        getImageUrl(promo.name).then((url) => {
            setCloudinaryImg(url);
        }
        );
    }, []);



    return (
        cloudinaryImg === "" ? <div>Loading...</div> :
            <Link href={`/admin/promos/${promo.promoId}`}>
                <li key={promo.promoId} className="transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-black flex flex-col gap-5 h-full bg-white shadow-md rounded-lg p-4 text-black shadow-black hover:bg-lightgrey ">
                    <h3 className="text-xl font-semibold mb-2 ">{promo.name}</h3>
                    <div className="flex flex-col gap-2">
                        <div className="">
                            <h4 className="text-md font-semibold mb-2">Description</h4>
                            <p className="text-sm mb-2">{promo.description}</p>
                        </div>
                        <div className="flex flex-row gap-5">
                            <div className="">
                                <h4 className="text-md font-semibold mb-2">Category</h4>
                                <p className="text-sm mb-2">{promo.category}</p>
                            </div>
                            <div className="">
                                <h4 className="text-md font-semibold mb-2">Price</h4>
                                <p className="text-sm mb-2">${promo.price}</p>
                            </div>
                        </div>
                        <div className="">
                            <h4 className="text-md font-semibold mb-2">Image</h4>
                            <Image className="rounded" src={cloudinaryImg} alt={promo.name} width={100} height={100} />
                        </div>
                        <div className="col-span-4 w-fit ">
                            <h4 className="text-md font-semibold mb-2">Burgers Incluidas</h4>
                            <div className="flex flex-row w-fit gap-2">
                                {
                                    promo.burgers.map((promoBurger) => (
                                        <div key={promoBurger.burger.burgerId} className="flex flex-col w-fit gap-2 bg-lightgrey border rounded p-2">
                                            <p>{promoBurger.burger.name} x {promoBurger.quantity}</p>
                                            <p>Precio: ${promoBurger.newPrice}</p>
                                        </div>
                                    ))
                                }
                            </div>

                        </div>
                        <div className="flex justify-between gap-5">

                        </div>

                    </div>

                </li>
            </Link>

    )

};

export default PromoItem;