"use client"

import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Category, Burger } from '@/prisma/generated/client';
import { createPromo, fetchAllBurgers } from '@/lib/crud';
import { useRouter } from 'next/navigation';

type FormValues = {
    name: string;
    imageUrl: string;
    description: string;
    category: Category;
    price: number;
    burgers: { burger: Burger; quantity: number; newPrice: number }[];
};

const NewPromoForm = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<FormValues>();
    const router = useRouter();
    const [burgers, setBurgers] = useState<Burger[]>([]);
    const [burgersInPromo, setBurgersInPromo] = useState<{ burger: Burger; quantity: number; newPrice: number }[]>([]);

    useEffect(() => {
        const fetchBurgers = async () => {
            const burgers = await fetchAllBurgers()
            setBurgers(burgers);
        };
        fetchBurgers();
    }, []);

    const onSubmit = async (data: FormValues) => {
        console.log(data);
        const prices = data.burgers.map(burger => burger.newPrice);
        const price = prices.reduce((acc, curr) => acc + curr, 0);
        data.price = price;
        console.log(data);
        
    };

    const addBurger = () => {
        setBurgersInPromo([...burgersInPromo, { burger: burgers[0], quantity: 1, newPrice: 0 }]);
    };

    const removeBurger = (index: number) => {
        setBurgersInPromo(burgersInPromo.filter((_, i) => i !== index));
    }

    

    return (
        <form className="flex flex-col gap-5 mx-20 w-fit mt-28" onSubmit={handleSubmit(onSubmit)}>
            <input
                className="p-2 border border-gray-300 rounded"
                id="name"
                type="text"
                placeholder="Name"
                {...register('name', { required: true })}
            />
            {errors.name && <span className="text-red">This field is required</span>}

            <textarea
                className="p-2 border border-gray-300 rounded"
                id="description"
                placeholder="Description"
                {...register('description', { required: true })}
            />
            {errors.description && <span className="text-red">This field is required</span>}

            <input
                className="p-2 border border-gray-300 rounded"
                id="imageUrl"
                type="text"
                placeholder="Image URL"
                {...register('imageUrl', { required: true })}
            />
            {errors.imageUrl && <span className="text-red">This field is required</span>}

            

            {burgersInPromo.map((burger, index) => (
                <div key={index} className="flex gap-5 items-center">
                    <select
                        className="p-2 border border-gray-300 rounded"
                        {...register(`burgers.${index}.burger.productId`, { required: true })}
                    >
                        {burgers.map((burger) => (
                            <option key={burger.productId} value={burger.productId}>{burger.name}</option>
                        ))}
                    </select>
                    <input
                        className="p-2 border border-gray-300 rounded"
                        type="number"
                        placeholder="Quantity"
                        {...register(`burgers.${index}.quantity`, { valueAsNumber: true, required: true })}
                    />
                    <input
                        className="p-2 border border-gray-300 rounded"
                        type="number"
                        placeholder="New Price"
                        {...register(`burgers.${index}.newPrice`, { valueAsNumber: true, required: true })}
                    />
                    <button type="button" className='btn bg-red-500 hover:bg-red-800 text-white' onClick={() => removeBurger(index)}>Remove</button>
                </div>
            ))}
            <button type="button" className='btn bg-gray-600 text-white' onClick={addBurger}>Add Burger</button>

            <div className="flex flex-col gap-5 items-center justify-center col-span-2">
                <button
                    className="btn bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700"
                    type="submit"
                >
                    Create New Promo
                </button>
            </div>
        </form>
    );
}

export default NewPromoForm;
