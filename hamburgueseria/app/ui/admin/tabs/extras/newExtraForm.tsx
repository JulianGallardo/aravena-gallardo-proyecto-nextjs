"use client";

import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { createExtra } from '@/lib/crud';
import { useRouter } from 'next/navigation';
import { Prisma } from '@/prisma/generated/client';
const NewExtraForm = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<Prisma.ExtraCreateInput>();
    const router = useRouter();

    
    const onSubmit = async (data: FormValues) => {
       const extraData = {
            name: data.name,
            maxQuantity: Number(data.maxQuantity),
            price: Number(data.price),
        };
        try {
            await createExtra(extraData);
            router.push('/admin/extras');
        } catch (error) {
            console.error(error);
       }

    };

    

    return (
        <form className="flex flex-col h-full gap-2 mx-20 bg-white p-4 py-6 rounded-md text-black" onSubmit={handleSubmit(onSubmit)}>
            <h1 className="text-2xl font-bold">Nuevo Extra</h1>

            <label htmlFor="name">Nombre</label>
            <input
                className="p-2 border border-gray-300 rounded bg-gray-200 placeholder:text-gray-500"
                id="name"
                type="text"
                placeholder="Name"
                {...register('name', { required: true })}
            />
            {errors.name && <span className="text-red-500">Falta completar este campo</span>}

            <label htmlFor="name">Maxima cantidad</label>
            <input
                className="p-2 border border-gray-300 rounded bg-gray-200 placeholder:text-gray-500"
                id="maxQuantity"
                type="number"
                placeholder="Name"
                {...register('maxQuantity', { required: true })}
            />
            {errors.maxQuantity && <span className="text-red-500">Falta completar este campo</span>}

            <label htmlFor="price">Precio</label>
            <input
                className="p-2 border border-gray-300 rounded bg-gray-200 placeholder:text-gray-500"
                id="price"
                type="float"
                placeholder="Price"
                {...register('price', { required: true, min: 0,valueAsNumber: true,valueType: 'number'})}
            />
            {errors.price && <span className="text-red-500">Falta completar este campo</span>}

            


            <div className="flex flex-col gap-5 items-center justify-center col-span-2">
                <button
                    className="btn bg-green-400 text-white px-4 py-2 rounded hover:bg-green-600"
                    type="submit"
                >
                    Crear nuevo extra
                </button>
            </div>
        </form>
    );
}

export default NewExtraForm;
