'use client'

import React, { Suspense, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { PromoExtendida } from "@/lib/definitions";
import { fetchPromoById } from "@/lib/crud";
import UpdatePromoForm from "@/app/ui/admin/tabs/promos/updatePromoForm";
import {  toast } from "react-toastify";
import { deletePromo } from "@/lib/crud";
import { useRouter } from "next/navigation";

import "react-toastify/dist/ReactToastify.css";
import { getImageUrl } from "@/utils/cloudinaryUtils";

const PromoManagmentPage = () => {
    const pathname = usePathname();
    const pathnameArray = pathname.split('/');
    const promoId = pathnameArray[pathnameArray.length - 1];
    const [cloudinaryImg, setCloudinaryImg] = useState<string>("");

    const [editing, setEditing] = useState<boolean>(false);
    const [promo, setPromo] = useState<PromoExtendida>();
    const router = useRouter();

    useEffect(() => {
        function fetchPromo() {
            fetchPromoById(Number(promoId)).then((data) => { setPromo(data as PromoExtendida) 
                if (data === undefined || data===null) return;
                getImageUrl(data.name).then((url) => {
                    setCloudinaryImg(url);
                }).catch((error) => { console.error(error) });


            }).catch((error) => { console.error(error) });
        }
        fetchPromo();

    }, [promoId, editing === false]);

    



    const handleDeleteWithToast = () => {
        toast(
            <div className=" h-full w-full">
                <p className="font-semibold">Estas seguro de que deseas eliminar?</p>
                <p className="text-sm">Esta accion no se puede deshacer</p>
                <div className="flex justify-center w-fit items-center gap-4 ">
                    <button
                        className="btn bg-red-500 text-white p-2 px-4 rounded-lg mt-2"
                        onClick={async () => {
                            await deletePromo(promo?.promoId as number);
                            toast.dismiss();
                            router.push("/admin/burgers");
                        }}
                    >
                        Si, quiero eliminar
                    </button>
                    <button
                        className="btn bg-green-500 text-white p-2 px-4 rounded-lg mt-2 ml-2"
                        onClick={() => toast.dismiss()}
                    >
                        Cancelar
                    </button>
                </div>

            </div>,
            {
                autoClose: false,
                closeOnClick: false,
                draggable: false,
                position: "top-center",
                closeButton: true,
            }
        );
    };


    return (
        cloudinaryImg === "" ? <div className="mt-24 text-center">Loading...</div> :
        <div className="flex flex-col gap-5 justify-center items-center w-full py-10 h-full mt-24 text-black">
                {
                    !editing  && (
                        <div >
                            <h1 className="text-4xl font-bold dark:text-white">Editando promo numero : {promo?.promoId}</h1>
                            <div className="flex flex-col gap-5 justify-center items-center w-full py-10">
                                <div className="max-w-md w-full bg-white shadow-lg rounded-lg overflow-hidden">
                                    <div className="relative h-60 w-full rounded-md">
                                        {promo && (
                                            <Image
                                                src={cloudinaryImg}
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
                                            <button className="btn bg-green-500 text-white p-2 px-4 rounded-lg" onClick={() => setEditing(true)}>Edit</button>
                                            <button className="btn bg-red-500 text-white p-2  rounded-lg " onClick={()=>handleDeleteWithToast()}>Delete</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }
                {
                    editing && promo !== undefined && (
                        <div className="items-center  flex flex-col gap-2">
                            <UpdatePromoForm promo={promo} handleUpdate={() => setEditing(false)} />
                            <button className="btn bg-red-500 text-white p-2 px-4 rounded-lg" onClick={() => setEditing(false)}>Cancelar</button>
                        </div>


                    )
                }
        </div>
    );
}

export default PromoManagmentPage;
