'use client'

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { PromoExtendida } from "@/lib/definitions";
import { fetchPromoById, deletePromo } from "@/lib/crud";
import UpdatePromoForm from "@/app/ui/admin/tabs/promos/updatePromoForm";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

import "react-toastify/dist/ReactToastify.css";
import { getImageUrl } from "@/utils/cloudinaryUtils";
import Link from "next/link";

const PromoManagmentPage = () => {
    const pathname = usePathname();
    const pathnameArray = pathname.split('/');
    const promoId = pathnameArray[pathnameArray.length - 1];
    const [cloudinaryImg, setCloudinaryImg] = useState<string>("");
    const [editing, setEditing] = useState<boolean>(false);
    const [promo, setPromo] = useState<PromoExtendida | null>(null);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        function fetchPromo() {
            fetchPromoById(Number(promoId)).then((data) => {
                if (!data) {
                    setError("Promo no encontrada");
                    return;
                }
                setPromo(data as PromoExtendida);
                getImageUrl(data.name).then((url) => {
                    setCloudinaryImg(url);
                }).catch((error) => {
                    console.error(error);
                });
            }).catch((error) => {
                setError("Error fetching promo");
                console.error(error);
            });
        }
        fetchPromo();
    }, [promoId, editing]);

    const handleDeleteWithToast = () => {
        toast(
            <div className="h-full w-full">
                <p className="font-semibold">¿Estás seguro de que deseas eliminar?</p>
                <p className="text-sm">Esta acción no se puede deshacer</p>
                <div className="flex justify-center w-fit items-center gap-4">
                    <button
                        className="btn bg-red-500 text-white p-2 px-4 rounded-lg mt-2"
                        onClick={async () => {
                            await deletePromo(promo?.promoId as number);
                            toast.dismiss();
                            router.push("/admin/burgers");
                        }}
                    >
                        Sí, quiero eliminar
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
        <div className="flex flex-col gap-5 justify-center items-center w-full py-10 h-full mt-24 text-black">
            {error ? (
                <div className="text-center flex flex-col">
                    {error}
                    <Link href="/admin/promos">
                        <button className="btn bg-green-500 text-white p-2 px-4 rounded-lg mt-2">Volver a Promos</button>
                    </Link>    
                </div>

            ) : !promo ? (
                <div className="mt-24 text-center">Loading...</div>
            ) : (
                <>
                    {!editing && (
                        <div>
                            <h1 className="text-4xl font-bold dark:text-white">Editando promo número: {promo.promoId}</h1>
                            <div className="flex flex-col gap-5 justify-center items-center w-full py-10">
                                <div className="max-w-md w-full bg-white shadow-lg rounded-lg overflow-hidden">
                                    <div className="relative h-60 w-full rounded-md">
                                        <Image
                                            src={cloudinaryImg}
                                            alt={promo.name}
                                            layout="fill"
                                            objectFit="contain"
                                        />
                                    </div>
                                    <div className="p-6">
                                        <div className="mb-4">
                                            <label className="block text-gray-700 text-sm font-bold mb-2">Name:</label>
                                            <h2 className="text-2xl font-bold">{promo.name}</h2>
                                        </div>
                                        <div className="mb-4">
                                            <label className="block text-gray-700 text-sm font-bold mb-2">Description:</label>
                                            <p className="text-lg">{promo.description}</p>
                                        </div>
                                        <div className="mb-4">
                                            <label className="block text-gray-700 text-sm font-bold mb-2">Price:</label>
                                            <p className="text-lg">${promo.price}</p>
                                        </div>
                                        <div className="mb-4">
                                            <label className="block text-gray-700 text-sm font-bold mb-2">Hamburguesas Incluidas:</label>
                                            <div className="flex flex-col gap-2">
                                                {promo.burgers.map((promoBurger) => (
                                                    <div key={promoBurger.burger.burgerId} className="flex flex-col gap-2 bg-lightgrey border rounded p-2">
                                                        <p>{promoBurger.burger.name} x {promoBurger.quantity}</p>
                                                        <p>Precio: ${promoBurger.newPrice}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="flex justify-center items-center gap-4 p-6">
                                            <button className="btn bg-green-500 text-white p-2 px-4 rounded-lg" onClick={() => setEditing(true)}>Edit</button>
                                            <button className="btn bg-red-500 text-white p-2 rounded-lg" onClick={handleDeleteWithToast}>Delete</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                    {editing && promo && (
                        <div className="items-center flex flex-col gap-2">
                            <UpdatePromoForm promo={promo} handleUpdate={() => setEditing(false)} />
                            <button className="btn bg-red-500 text-white p-2 px-4 rounded-lg" onClick={() => setEditing(false)}>Cancelar</button>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}

export default PromoManagmentPage;
