'use client'

import React from 'react';
import { BurgerList, Categorias } from '@/app/ui';

const Page: React.FC = () => {    
    return (
        <div>
            <Categorias />
            <BurgerList />
        </div>
    );
};

export default Page;