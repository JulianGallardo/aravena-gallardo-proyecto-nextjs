import { Burger } from '@/prisma/generated/client';
import React, { useState, useEffect } from 'react';
import BurgerItem from './burgerItem';
import BurgerForm from './newBurgerForm';

const BurgerItems = () => {
    const [burgers, setBurgers] = useState([]);
    const [newBurger, setNewBurger] = useState({
        name: '',
        category: 'SIMPLE',
        imageUrl: '',
        description: '',
        stock: 0,
        price: 0.0,
    });

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

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewBurger({ ...newBurger, [name]: value });
    };

    const handleCreateBurger = async () => {
        try {
            console.log('Se creó la siguiente burger:', newBurger);
        } catch (error) {
            console.error('Error creating burger:', error);
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
            <h2 className="text-2xl font-bold mb-4">Burgers</h2>
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
            <div className="mt-8">
                <h3 className="text-xl font-bold mb-4">Add New Burger</h3>
                <BurgerForm
                    handleInputChange={handleInputChange}
                    handleCreateBurger={handleCreateBurger}
                />
            </div>
        </div>
    );
};

export default BurgerItems;
