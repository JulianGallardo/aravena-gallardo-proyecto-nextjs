'use client'

import React from 'react';
import { BurgerList, Categorias } from '@/app/ui';

const Page: React.FC = () => {    
    return (
        <div className='flex flex-col bg-lightgrey text-darkblue dark:bg-dark dark:text-white'>
            <Categorias />
            <BurgerList />
        </div>
    );
};

export default Page;