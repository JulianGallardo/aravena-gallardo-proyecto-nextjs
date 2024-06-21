import React from 'react';
import Image from 'next/image';
import ByteBurgersLogo from '@/public/ByteBurgersLogoVectorizado.svg';
import { OrdenExtendida } from '@/lib/definitions';

const PedidosCard = (orden:OrdenExtendida) => {
    return (
        <div className="relative max-w-md mx-auto bg-darkblue text-white border border-lightgrey rounded-md p-5 shadow-lg ">
            <div className="flex flex-col gap-3 mb-4 relative z-10">
                <p className="text-lg font-semibold">Orden: {orden.orderId}</p>
                <p className="text-sm">Fecha: {`${orden.date.getDate()}/${orden.date.getMonth() + 1}/${orden.date.getFullYear()}`}</p>
            </div>
            <div className="flex flex-col gap-4 relative z-10">
                {orden.products.map((product, index) => (
                    <div key={index} className="flex justify-between">
                        <p className="text-lg">{product.burger ? product.burger.name : product.promo?.name}</p>
                        <p className="text-lg">{product.quantity}</p>
                    </div>
                ))}
                {orden.products.length === 0 && <p className="text-lg">No hay productos en esta orden</p>}
            </div>
            <div className='flex justify-end mt-4 relative z-10'>
                <p className="text-lg font-bold">Metodo de Pago : {orden.paymentMethod}</p>
            </div>
            <div className="flex justify-end mt-4 relative z-10">
                <p className="text-lg font-bold">Total: ${orden.totalAmount}</p>
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
                <Image src={ByteBurgersLogo} alt="ByteBurgers Logo" className="w-full h-full p-5" />
            </div>
        </div>
    );
}

export default PedidosCard;
