'use client'

import React from 'react';
import { Header } from '../../ui';
import { Footer } from '../../ui';
import  BurgerList from '../../ui/dbRequests/burgersList';

const Page: React.FC = () => {    
    return (
        <div>
            <h1>Burgers</h1>
            <BurgerList />
        </div>
    );
};

export default Page;