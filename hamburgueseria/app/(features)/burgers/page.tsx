'use client'

import React from 'react';
import { BurgerList, Categorias } from '@/app/ui';
import { Category } from '@/prisma/generated/client';

const categories = Object.values(Category) as Category[];

const Page: React.FC = () => {    
    return (
        <div className='flex flex-col bg-lightgrey text-darkblue dark:bg-dark dark:text-white'>
            <Categorias categories={categories} />
            <BurgerList />
        </div>
    );
};

export default Page;