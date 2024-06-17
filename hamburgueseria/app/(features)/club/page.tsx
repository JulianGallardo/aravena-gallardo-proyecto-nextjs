import React from 'react';
import byteClub from '@/public/ClubByte.jpg';
import Image from 'next/image';
import Link from 'next/link';

const Page: React.FC = () => {
    return (
        <div className="relative font-sans  pt-24 ">

            <div className="relative z-20 flex flex-col w-full p-8   rounded-lg md:px-20  bg-black bg-opacity-60">
                <section className="mb-12">
                    <h1 className="text-yellow-400 text-5xl font-bold">Byte Club</h1>
                    <h2 className="text-white text-2xl mt-4">Proximamente te podrás unir a nuestro club</h2>
                </section>
                <section className="mb-8">
                    <h3 className="text-yellow-400 text-3xl font-semibold">¿Qué es el Club de Hamburguesas?</h3>
                    <p className="text-white text-lg mt-4">
                        Únete a nuestro club exclusivo donde puedes ganar puntos por cada compra y canjearlos por deliciosos beneficios.
                        ¡Cuantas más hamburguesas disfrutes, más recompensas obtendrás!
                    </p>
                </section>
                <section className="mb-8">
                    <h3 className="text-yellow-400 text-3xl font-semibold">¿Cómo Funciona?</h3>
                    <ol className="items-start text-left mx-auto text-white text-lg mt-4  list-decimal list-inside">
                        <li>Regístrate en nuestro programa de fidelidad.</li>
                        <li>Compra tus hamburguesas favoritas en Byte Burgers.</li>
                        <li>Acumula puntos con cada compra.</li>
                        <li>Canjea tus puntos por descuentos, hamburguesas gratis y otros beneficios exclusivos.</li>
                    </ol>
                </section>
                <section className="mb-8">
                    <h3 className="text-yellow-400 text-3xl font-semibold">Beneficios del Club</h3>
                    <ul className="text-left mx-auto text-white text-lg mt-4  list-disc list-inside">
                        <li>Descuentos exclusivos en nuevas hamburguesas.</li>
                        <li>Hamburguesas gratis en tu cumpleaños.</li>
                        <li>Acceso anticipado a promociones especiales.</li>
                        <li>Y mucho más...</li>
                    </ul>
                </section>
                <Link href="/" className=" btn w-fit bg-yellow-400 hover:bg-yellow-600 text-black text-lg font-semibold py-2 px-4 rounded-lg">
                    Volver al inicio
                </Link>
            </div>
            <Image 
                src={byteClub} 
                alt="Club de Hamburguesas" 
                layout="fill" 
                objectFit="cover" 
                className=" z-0" 
            />
        </div>
    );
};

export default Page;
