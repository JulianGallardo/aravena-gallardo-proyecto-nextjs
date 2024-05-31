"use client"

import { Burger } from '@/prisma/generated/client';
import React from 'react';
import { useEffect, useState } from 'react';
import { useCart } from '@/app/hooks/useCart';
import { AddToCartIcon,RemoveFromCartIcon } from '@/app/ui/shared/cartIcons';






const BurgerPage: React.FC = () => {
    const { cart, addToCart, removeFromCart } = useCart();

    const [burgerData, setBurgerData] = useState({
        burgerId: 0,
        productId: 0,
        name: "",
        category: "",
        description: "",
        stock: 0,
        price: 0.0
    }
    );

    const parseData = (data: Burger[]) => {
        const burger = data[0];
        console.log(burger);
        setBurgerData({
            burgerId: burger.burgerId,
            productId: burger.productId,
            name: burger.name,
            category: burger.category,
            description: burger.description,
            stock: burger.stock,
            price: burger.price
        });
    };







    useEffect(() => {
        function getBurger() {
            fetch('/api/products/burgers', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            }
            )
                .then((res) => res.json())
                .then((data) => {
                    console.log(data);
                    parseData(data.body);
                });
        }
        getBurger();
    }, []);

    return (
        <div className='flex flex-col h-screen mt-20 items-center '>
            <h1>{burgerData.name}</h1>
            <p>{burgerData.description}</p>
            <p>{burgerData.stock}</p>
            <p>{burgerData.category}</p>
            <p>{burgerData.price}</p>
            <div className='flex flex-row gap-5 justify-center items-center '>
                <button className='btn btn-circle bg-darkblue ' onClick={()=>addToCart(burgerData)}>
                    <AddToCartIcon />
                </button>
                <button className='btn btn-circle bg-darkblue' onClick={()=>removeFromCart(burgerData)}>
                    <RemoveFromCartIcon />
                </button>

            </div>

        </div>
    );
};

export default BurgerPage;