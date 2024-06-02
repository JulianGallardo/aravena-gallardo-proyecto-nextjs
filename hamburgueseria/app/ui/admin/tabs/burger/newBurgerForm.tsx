import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Category } from '@/prisma/generated/client';
import UploadPhotos from '@/app/ui/photos/uploadPhotos';


type FormValues = {
    name: string;
    imageUrl: string;
    description: string;
    category: Category;
    stock: number;
    price: number;
};

const BurgerForm = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<FormValues>();

    const onSubmit: SubmitHandler<FormValues> = (data) => {
        console.log('Form data:', data);
        // Aquí puedes añadir la lógica para enviar los datos al servidor
    };

    return (
        <form className="grid gap-4 mb-4" onSubmit={handleSubmit(onSubmit)}>
            <input
                className="p-2 border border-gray-300 rounded"
                id="name"
                type="text"
                placeholder="Name"
                {...register('name', { required: true })}
            />
            {errors.name && <span className="text-red-500">This field is required</span>}
            
            <UploadPhotos/>
            
            <textarea
                className="p-2 border border-gray-300 rounded"
                id="description"
                placeholder="Description"
                {...register('description', { required: true })}
            />
            {errors.description && <span className="text-red-500">This field is required</span>}
            
            <select
                className="p-2 border border-gray-300 rounded"
                id="category"
                {...register('category', { required: true })}
            >
                {Object.values(Category).map((category) => (
                    <option key={category} value={category}>{category}</option>
                ))}
            </select>
            {errors.category && <span className="text-red-500">This field is required</span>}
            
            <input
                className="p-2 border border-gray-300 rounded"
                id="stock"
                type="number"
                placeholder="Stock"
                {...register('stock', { valueAsNumber: true, })}
            />
            
            <input
                className="p-2 border border-gray-300 rounded"
                id="price"
                type="number"
                placeholder="Price"
                {...register('price', { valueAsNumber: true, required: true })}
            />
            {errors.price && <span className="text-red-500">This field is required</span>}
            
            <button
                className="btn bg-green text-white px-4 py-2 rounded hover:bg-green-600"
                type="submit"
            >
                Create New Burger
            </button>
        </form>
    );
}

export default BurgerForm;
