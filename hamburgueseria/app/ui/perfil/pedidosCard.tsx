import React from 'react';
import Image from 'next/image';
import ByteBurgersLogo from '@/public/ByteBurgersLogoVectorizado.svg';

interface Orden {
    id: number;
    date: Date;
    products: {
        id: number;
        name: string;
        cant: number;
        price: number;
        extras: {
            id: number;
            name: string;
            price: number;
        }[];
    }[];
    total: number;
}



const PedidosCard = (orden:Orden) => {
    return (
        <div className="relative max-w-md mx-auto bg-darkblue text-white border border-lightgrey rounded-md p-5 shadow-lg ">
            <div className="flex flex-col gap-3 mb-4 relative z-10">
                <p className="text-lg font-semibold">Orden: {orden.id}</p>
                <p className="text-sm">Fecha: {`${orden.date.getDate()}/${orden.date.getMonth() + 1}/${orden.date.getFullYear()}`}</p>
            </div>
            <div className="flex flex-col gap-4 relative z-10">
                {orden.products.map((product) => (
                    <div key={product.id} className="flex flex-col bg-white text-darkblue p-3 rounded-md shadow-sm opacity-90">
                        <div className="flex justify-between items-center mb-2">
                            <p className="font-semibold">{product.name}</p>
                            <p className="text-sm">Cantidad: {product.cant}</p>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {product.extras.map((extra) => (
                                <span key={extra.id} className="bg-lightgrey text-darkblue rounded-full px-3 py-1 text-xs">
                                    {extra.name} (+${extra.price})
                                </span>
                            ))}
                        </div>
                        <div className="flex justify-end mt-2">
                            <p className="text-sm font-semibold">Precio: ${product.price}</p>
                        </div>
                    </div>
                ))}
            </div>
            <div className="flex justify-end mt-4 relative z-10">
                <p className="text-lg font-bold">Total: ${orden.total}</p>
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
                <Image src={ByteBurgersLogo} alt="ByteBurgers Logo" className="w-full h-full p-5" />
            </div>
        </div>
    );
}

export default PedidosCard;
