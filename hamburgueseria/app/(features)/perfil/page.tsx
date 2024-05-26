import { Footer, Header } from '@/app/ui';
import React from 'react';
import Datos from '@/app/ui/perfil/datos';

const Page: React.FC = () => {
    return (
        <div>
            <Header isTransparent={true} />
            <div className="flex flex-col items-center justify-center h-screen gap-5">
                <Datos />
            </div>
            <Footer />
        </div>
    );
};

export default Page;