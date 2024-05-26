'use client'
import { useState } from 'react';

export default function CreateBurgerButton({ }){
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const handleCreateBurger = async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch('/api/products/burger', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({}),
            });

            if (!response.ok) {
                throw new Error('Error confirmando la orden');
            }

            const data = await response.json();
            setSuccess(true);
            console.log('Burger confirmada:', data);
        } catch (error: any) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <button onClick={handleCreateBurger}>
            Crear hamburguesa
        </button>
    );
}