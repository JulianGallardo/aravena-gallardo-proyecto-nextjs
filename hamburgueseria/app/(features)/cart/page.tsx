"use client"
import React, { use, useEffect, useState } from "react";
import { useCart } from "@/app/hooks/useCart";
import { CartItem } from "@/lib/CartTypes";
import CartItemComponent from "@/app/ui/cart/CartItem";
import Link from "next/link";
import { payment } from "@/utils/paymentUtils";
import { useSession } from "next-auth/react";

const Page: React.FC = () => {
    const { cart, items, total, clearCart } = useCart();
    const {data:session} = useSession();
    const [clientId,setClientId] = useState<number>(1);

    useEffect(() => {
        if(session){
            setClientId(session.user.clientId);
        }
    }, [session])


    return (
        <div className="flex flex-col  mt-20 md:mx-24 h-fit gap-5 p-4 text-dark">
            <h1 className="text-2xl font-bold mb-4 ">Carrito</h1>
            <div className="flex flex-col flex-grow gap-4 min-h-screen h-fit text-white w-full ">
                {(items !== 0) &&
                    <div className="flex flex-col gap-5 mx-5  md:flex-row">
                        <div className="flex flex-col flex-grow  bg-darkblue p-4 rounded-lg w-full mb-5">
                            <h1 className=" text-2xl text-start mb-5 ">Productos</h1>
                            {
                                cart.map((item: CartItem) => (
                                    <CartItemComponent key={item.cartItemBurger?.burgerId || item.cartItemPromo?.promoId} item={item} />
                                ))
                            }
                            <div className="flex flex-col gap-4 items-center justify-center w-full ">

                                <Link href="/burgers" className=" w-fit mt-5 ">
                                    <p className="btn bg-lightgrey text-black hover:text-white">Volver al menu</p>
                                </Link>
                                <button className="btn bg-yellow-500 text-darkblue w-fit " onClick={() => clearCart()}>
                                    <p className="text-white">Vaciar Carrito</p>
                                </button>
                            </div>
                        </div>
                        <div className="flex flex-col bg-darkblue p-4 rounded-lg w-full h-fit mb-5">
                            <h1 className="text-white text-2xl text-start mb-5">Resumen</h1>
                            <div className="flex flex-col items-center ">

                                <div className="flex flex-col gap-4 items-start justify-start w-full ">
                                    <span className="text-lg">Total: ${total.toFixed(2)}</span>
                                    <span className="text-lg">Items: {items}</span>
                                </div>

                                <button onClick={() => payment(cart,total,clientId)} className="btn bg-yellow-500 text-darkblue w-fit ">
                                    <p className="text-white">Checkout</p>
                                </button>



                            </div>

                        </div>
                    </div>
                }
                {
                    (items === 0) && (
                        <div className="flex flex-col gap-5 text-black">
                            <p className="text-lg">Tu carrito esta vacio</p>
                            <Link href="/burgers" className=" text-yellow-400 text-sm md:text-lg font-bold hover:text-darkblue">
                                <p className="">Vuelve a comprarte una Byte!</p>
                            </Link>
                        </div>

                    )
                }
            </div>
        </div>


    );
}

export default Page;
