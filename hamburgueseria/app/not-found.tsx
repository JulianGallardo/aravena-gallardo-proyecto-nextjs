import Link from 'next/link'
import Image from 'next/image';
import ByteBurgersLogo from '@/public/ByteBurgersLogoVectorizado.svg';

export default function NotFound() {

    return (
        <div className="h-screen flex flex-col gap-5 items-center justify-center text-darkblue ">
            <div className="flex flex-col items-center gap-4">
                <h1 className="text-4xl font-bold ">404</h1>
                <h2 className="text-2xl font-semibold ">Página no encontrada</h2>
                
            </div>
            <div className="flex items-center justify-center relative ">
                <Image src={ByteBurgersLogo} alt="ByteBurgers Logo" height={200} />
            </div>
            <Link href="/" className='text-2xl font-semibold text-yellow-400 hover:text-darkblue'>
                    Volver al Inicio
            </Link>
        </div>
    );
}