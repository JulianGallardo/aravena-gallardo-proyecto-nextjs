import React from 'react';
import { useForm } from 'react-hook-form';
import { Category } from '@/prisma/generated/client';
import {createBurger} from '@/lib/crud';
import UploadPhotos from '@/app/ui/photos/uploadPhotos';
import { useRouter } from 'next/navigation';


type FormValues = {
    name: string;
    imageUrl: string;
    description: string;
    category: Category;
    stock: number;
    price: number;
};

const BurgerForm = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const router = useRouter();

    const onSubmit = handleSubmit(async(data) => {
        const formData = new FormData();
        Object.entries(data).forEach(([key, value]) => {
            formData.append(key, value);
        });
        const burger = await createBurger(formData);
        router.push(`/admin/burgers`);
    });

    return (
        <form className="flex flex-col  h-full gap-5 mx-20 w-fit " onSubmit={(data)=>onSubmit(data)}>
            <input
                className="p-2 border border-gray-300 rounded"
                id="name"
                type="text"
                placeholder="Name"
                {...register('name', { required: true })}
            />
            {errors.name && <span className="text-red">This field is required</span>}

           {
            //ver despues como cargar las fotos
            //
            // <UploadPhotos />
           }

            <textarea
                className="p-2 border border-gray-300 rounded"
                id="description"
                placeholder="Description"
                {...register('description', { required: true })}
            />
            {errors.description && <span className="text-red">This field is required</span>}

            <select
                className="p-2 border border-gray-300 rounded"
                id="category"
                {...register('category', { required: true })}
            >
                {Object.values(Category).map((category) => (
                    category !== Category.PROMO &&
                    <option key={category} value={category}>{category}</option>
                ))}
            </select>
            {errors.category && <span className="text-red">This field is required</span>}

            <input
                className="p-2 border border-gray-300 rounded"
                id="stock"
                type="number"
                placeholder="Stock"
                defaultValue={0}
                {...register('stock', { valueAsNumber: true })}
            />

            <input
                className="p-2 border border-gray-300 rounded"
                id="price"
                type="number"
                placeholder="Price"
                {...register('price', { valueAsNumber: true, required: true })}
            />
            {errors.price && <span className="text-red">This field is required</span>}
            <div className="flex flex-col gap-5 items-center justify-center col-span-2">

                <button
                    className="btn bg-green text-white px-4 py-2 rounded hover:bg-green-600"
                    type="submit"
                >
                    Create New Burger
                </button>
            </div>
        </form>
    );
}

export default BurgerForm;
