import { Burger } from '@/prisma/generated/client';
import React, { useState, useEffect } from 'react';
import BurgerItem from './burgerItem';
import Link from 'next/link';

const BurgerItems = () => {
    const [burgers, setBurgers] = useState([]);

    useEffect(() => {
        fetchBurgers();
    }, []);

    const fetchBurgers = async () => {
        try {
            const response = await fetch('/api/products/burgers');
            const data = await response.json();
            console.log('Burgers:', data.body);
            setBurgers(data.body);
        } catch (error) {
            console.error('Error fetching burgers:', error);
        }
    };





    const handleDeleteBurger = async (burgerId: number) => {
        try {
            console.log('Se eliminó la siguiente burger:', burgerId);
        } catch (error) {
            console.error('Error deleting burger:', error);
        }
    };

    const handleUpdateBurger = async (burgerId: number, updatedBurger: Burger) => {
        try {
            console.log('Se actualizó la siguiente burger:', updatedBurger);
        } catch (error) {
            console.error('Error updating burger:', error);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <div className="flex flex-col md:flex-row justify-between items-center gap-5 mb-5">
                <h2 className="text-2xl font-bold mb-4">Burgers</h2>
                <div className="flex items-center gap-4">
                    <input
                        type="text"
                        placeholder="Search..."
                        className="p-2 border border-gray-300 rounded-lg"
                    />
                </div>
                <Link href="/admin/burgers/new">
                    <button className="bg-green text-white p-2 rounded-lg">Add New</button>
                </Link>
            </div>
            <ul className="flex flex-col gap-5">
                {burgers.map((burger: Burger) => (
                    <BurgerItem
                        key={burger.burgerId}
                        burger={burger}
                        handleDeleteBurger={handleDeleteBurger}
                        handleUpdateBurger={handleUpdateBurger}
                    />

                ))}
            </ul>
        </div>
    );
};

export default BurgerItems;
