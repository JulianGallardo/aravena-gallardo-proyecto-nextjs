"use client"
import React from "react";
import { useState } from "react";
import { useSession } from "next-auth/react";


const datos = () => {
    const { data: session, status,update } = useSession();
    const [editar, setEditar] = useState(false)
    return (
        <div>
            {status === "loading" && <p>Cargando...</p>}
            {status === "authenticated" && (
                editar ? (
                    <form action={
                        (formData) => {
                            update({name: formData.get('name') as string, email: formData.get('email') as string, ciudad: formData.get('ciudad') as string, telefono: formData.get('telefono') as string, direccion: formData.get('direccion') as string})
                        }
                
                    } className=" flex flex-col justify-center items-center gap-5">
                        <h1 className=" text-2xl font-bold text-lightgrey">Datos Personales</h1>
                        <div className="flex flex-col text-sm text-lightgrey gap-2 md:grid grid-cols-2">
                    
                            <div>
                                <label className="mb-3 mt-5 block text-xs font-medium">Nombre:</label>
                                <input className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-2 pr-10 text-sm outline-2 placeholder:text-gray-500" type="text" placeholder={session.user?.name} />
                            </div>
                            <div>
                                <label className="mb-3 mt-5 block text-xs font-medium">Email:</label>
                                <input className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-2 pr-10 text-sm outline-2 placeholder:text-gray-500" type="text" placeholder={session.user?.email} />
                            </div>
                            <div>
                                <label className="mb-3 mt-5 block text-xs font-medium">Ciudad:</label>
                                <input className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-2 pr-10 text-sm outline-2 placeholder:text-gray-500" type="text" placeholder={session.user?.ciudad} />
                            </div>
                            <div>
                                <label className="mb-3 mt-5 block text-xs font-medium">Telefono:</label>
                                <input className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-2 pr-10 text-sm outline-2 placeholder:text-gray-500" type="text" placeholder={session.user?.telefono} />
                            </div>
                            <div>
                                <label className="mb-3 mt-5 block text-xs font-medium">Direccion:</label>
                                <input className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-2 pr-10 text-sm outline-2 placeholder:text-gray-500" type="text" placeholder={session.user?.direccion} />
                            </div>



                        </div>


                        <button type="submit" onClick={() => setEditar(!editar)} className="bg-dark text-white px-4 py-2 rounded-md hover:bg-darkblue">Guardar</button>
                    </form>
                ) : (
                    <div className="flex flex-col text-sm text-lightgrey gap-3">
                        <h1 className=" text-2xl font-bold text-white">Datos Personales</h1>
                        <div className="flex flex-col text-sm text-lightgrey gap-3 md:grid grid-cols-2 ">
                            <p className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-2 pr-10 text-sm outline-2">Nombre: {session.user?.name}</p>
                            <p className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-2 pr-10 text-sm outline-2">Email: {session.user?.email}</p>
                            <p className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-2 pr-10 text-sm outline-2">Ciudad: {session.user?.ciudad}</p>
                            <p className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-2 pr-10 text-sm outline-2">Telefono: {session.user?.telefono}</p>
                            <p className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-2 pr-10 text-sm outline-2">Direccion: {session.user?.direccion}</p>
                        </div>
                        <button onClick={() => setEditar(!editar)} className="bg-dark text-white px-4 py-2 rounded-md hover:bg-darkblue">Editar</button>
                    </div>
                )
            )}
            {status === "unauthenticated" && <p>No autenticado</p>}
        </div>
    );
};

export default datos;