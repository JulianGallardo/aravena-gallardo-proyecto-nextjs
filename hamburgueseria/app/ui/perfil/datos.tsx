"use client";

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

const Datos = () => {
    const { data: session, status, update } = useSession();
    const [editar, setEditar] = useState(false);
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        city: '',
        cellphone: '',
        address: ''
    });

    useEffect(() => {
        if (session) {
            setFormData({
                fullName: session.user?.fullName || '',
                email: session.user?.email || '',
                city: session.user?.city || '',
                cellphone: session.user?.cellphone || '',
                address: session.user?.address || ''
            });
        }
    }, [session]);

    const handleChange = (e:any) => {
        const { id, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [id]: value
        }));
    };

    const handleSubmit = (e:any) => {
        e.preventDefault();
        update({
            ...session,
            user: {
                ...session?.user,
                fullName: formData.fullName || session?.user?.fullName,
                email: formData.email || session?.user?.email,
                city: formData.city || session?.user?.city,
                cellphone: formData.cellphone || session?.user?.cellphone,
                address: formData.address || session?.user?.address
            }
        });
        setEditar(false);
    };

    return (
        <div>
            {status === "loading" && <p>Cargando...</p>}
            {status === "authenticated" && (
                editar ? (
                    <div>
                        <h1 className="text-2xl font-bold text-black dark:text-white ">Datos Personales</h1>
                        <form onSubmit={handleSubmit} className="flex flex-col justify-center items-center gap-5">
                            <div className="flex flex-col text-sm text-black dark:text-white gap-2 md:grid grid-cols-2">
                                <div>
                                    <label className="mb-3 mt-5 block text-xs font-medium">Nombre:</label>
                                    <input
                                        id="fullName"
                                        className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-2 pr-10 text-sm outline-2 placeholder:text-gray-500"
                                        type="text"
                                        value={formData.fullName}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div>
                                    <label className="mb-3 mt-5 block text-xs font-medium">Email:</label>
                                    <input
                                        id="email"
                                        className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-2 pr-10 text-sm outline-2 placeholder:text-gray-500"
                                        type="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div>
                                    <label className="mb-3 mt-5 block text-xs font-medium">Ciudad:</label>
                                    <input
                                        id="city"
                                        className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-2 pr-10 text-sm outline-2 placeholder:text-gray-500"
                                        type="text"
                                        value={formData.city}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div>
                                    <label className="mb-3 mt-5 block text-xs font-medium">Telefono:</label>
                                    <input
                                        id="cellphone"
                                        className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-2 pr-10 text-sm outline-2 placeholder:text-gray-500"
                                        type="text"
                                        value={formData.cellphone}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div>
                                    <label className="mb-3 mt-5 block text-xs font-medium">Direccion:</label>
                                    <input
                                        id="address"
                                        className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-2 pr-10 text-sm outline-2 placeholder:text-gray-500"
                                        type="text"
                                        value={formData.address}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            <div className="items-center justify-center flex flex-row">

                                <button type="submit" className="bg-darkblue btn btn-circle text-white  px-10 py-2 rounded-md w-fit hover:bg-dark dark:hover:bg-lightgrey dark:hover:text-black">Guardar</button>

                            </div>
                        </form>
                    </div>

                ) : (
                    <div className="flex flex-col text-sm text-black dark:text-white gap-3">
                        <h1 className="text-2xl font-bold text-black dark:text-white">Datos Personales</h1>
                        <div className="flex flex-col text-sm text-black dark:text-white gap-3 md:grid grid-cols-2">
                            <p className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-2 pr-10 text-sm outline-2">Nombre: {session.user?.fullName}</p>
                            <p className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-2 pr-10 text-sm outline-2">Email: {session.user?.email}</p>
                            <p className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-2 pr-10 text-sm outline-2">Ciudad: {session.user?.city}</p>
                            <p className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-2 pr-10 text-sm outline-2">Telefono: {session.user?.cellphone}</p>
                            <p className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-2 pr-10 text-sm outline-2">Direccion: {session.user?.address}</p>
                        </div>
                        <div className="items-center justify-center flex flex-row">
                            <button onClick={() => setEditar(true)} className="bg-darkblue btn btn-circle text-white  px-10 py-2 rounded-md w-fit hover:bg-dark dark:hover:bg-lightgrey dark:hover:text-black ">Editar</button>
                        </div>
                    </div>
                )
            )}
            {status === "unauthenticated" && <p>No autenticado</p>}
        </div>
    );
};

export default Datos;
