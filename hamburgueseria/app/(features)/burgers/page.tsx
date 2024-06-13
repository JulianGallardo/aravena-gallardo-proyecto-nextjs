'use client'

import React, { Suspense } from 'react';
import { BurgerList, Categorias } from '@/app/ui';
import { Category } from '@/prisma/generated/client';

const categories = Object.values(Category) as Category[];

const Page: React.FC = () => {
    return (
        <div className='flex flex-col'>
            <BurgerList />
        </div>
    );
};

export default Page;