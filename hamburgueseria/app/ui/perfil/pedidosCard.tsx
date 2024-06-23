import React from 'react';
import Image from 'next/image';
import ByteBurgersLogo from '@/public/ByteBurgersLogoVectorizado.svg';
import { OrdenExtendida } from '@/lib/definitions';


const PedidosCard = (orden: OrdenExtendida) => {
    return (
        <div className="relative max-w-md mx-auto bg-darkblue text-white border border-lightgrey rounded-md p-5 shadow-lg ">
            <div className="flex flex-col gap-3 mb-2">
                <div className=" flex items-center justify-between">
                    <div>
                        <p className="text-lg font-semibold">Orden: {orden.orderId}</p>
                        <p className="text-sm">Fecha: {`${orden.date.getDate()}/${orden.date.getMonth() + 1}/${orden.date.getFullYear()}`}</p>
                        <p className='text-sm'>IdCliente: {orden.clientId}</p>
                    </div>
                    <Image src={ByteBurgersLogo} alt="ByteBurgers Logo" className="w-1/4 " />
                </div>
            </div>
            <div className="flex flex-col gap-4 relative bg-slate-400 rounded-md p-2 ">
                {orden.products.map((product, index) => (
                    <div key={index} className="flex justify-between flex-col">
                        <div key={index} className="flex justify-between flex-row w-full">
                            <p className="text-lg">{product.product.burger ? product.product.burger.name : product.product.promo?.name}</p>
                            <p className="text-lg">${product.product.burger ? product.product.burger.price : product.product.promo?.price} x {product.quantity}</p>
                        </div>
                        <div>
                            <p className=''>
                                {
                                    product.product.burger?.extras.map((extra, index) => (
                                        <span key={index} className="text-sm">+ {extra.extra.name} {extra.quantity}x${extra.extra.price}</span>
                                    ))
                                }
                            </p>
                        </div>
                        <div className="flex justify-between flex-row">
                            <p>${product.product.burger ? (product.product.burger.price * product.quantity) : (product.product.promo) ? (product.product.promo.price * product.quantity) : 0}</p>
                        </div>
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

        </div>
    );
}

export default PedidosCard;
