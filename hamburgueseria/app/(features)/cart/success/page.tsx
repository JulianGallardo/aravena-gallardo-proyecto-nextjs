import Link from "next/link"
import { useCart } from "@/app/hooks/useCart";
import { useEffect } from "react";

const Page : React.FC = () => {
    const { clearCart } = useCart();

    useEffect(() => {
        clearCart();
    }, []);



    return (
        <div className="flex flex-col items-center justify-center h-screen gap-5 text-dark">
            <h1 className="text-2xl font-bold mb-4 ">¡Gracias por tu compra!</h1>
            <div className="flex flex-col gap-5 items-center justify-center">
                <p className="text-lg">Tu pedido ha sido procesado con éxito</p>
                <Link href="/burgers" className="text-yellow-400 text-sm md:text-lg font-bold hover:text-darkblue">
                    <p className="">Vuelve a comprarte una Byte!</p>
                </Link>
            </div>
        </div>
    )
}

export default Page;