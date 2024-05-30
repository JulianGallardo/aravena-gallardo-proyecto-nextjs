'use client'

import React from 'react';
import { BurgerList, Categorias } from '@/app/ui';

const categories = ['Simple', 'Doble', 'Bebidas', 'Postres'];

const Page: React.FC = () => {    
    return (
        <div className='flex flex-col bg-lightgrey text-darkblue dark:bg-dark dark:text-white'>
            <Categorias categories={categories} />
            <BurgerList />
        </div>
    );
};

export default Page;