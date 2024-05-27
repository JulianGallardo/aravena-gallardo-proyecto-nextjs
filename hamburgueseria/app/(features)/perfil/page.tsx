import { Footer, Header } from '@/app/ui';
import React from 'react';
import Datos from '@/app/ui/perfil/datos';
import Pedidos from '@/app/ui/perfil/pedidosPaginacion';

const Page: React.FC = () => {
    return (
        <div className='flex flex-col bg-lightgrey text-black dark:bg-dark dark:text-white'>
            <Header isTransparent={true} />
            <div className="flex flex-col items-center justify-center gap-5 mt-20 mb-10">
                <Datos />
                <Pedidos/>
            </div>
            <Footer />
        </div>
    );
};

export default Page;