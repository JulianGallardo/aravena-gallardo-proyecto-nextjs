import React from 'react';
import { useForm } from 'react-hook-form';
import { Category } from '@/prisma/generated/client';
import { createBurger } from '@/lib/crud';
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

    const onSubmit = handleSubmit(async (data) => {
        const formData = new FormData();
        Object.entries(data).forEach(([key, value]) => {
            formData.append(key, value);
        });
        const burger = await createBurger(formData);
        router.push(`/admin/burgers`);
    });

    return (
        <form className="flex flex-col  h-full gap-2 mx-20 w-1/3 bg-white p-4 py-6 rounded-md text-black " onSubmit={(data) => onSubmit(data)}>
            <h1 className="text-2xl font-bold">Nueva Burger</h1>

            <label htmlFor="name">Nombre</label>
            <input
                className="p-2 border border-gray-300 rounded bg-gray-200 placeholder:text-gray-500"
                id="name"
                type="text"
                placeholder="Name"
                {...register('name', { required: true })}
            />
            {errors.name && <span className="text-red-500">Falta completar este campo</span>}

            {
                //ver despues como cargar las fotos
                //
                // <UploadPhotos />
            }

            <label htmlFor="name">Descripcion</label>
            <textarea
                className="p-2 border border-gray-300 rounded bg-gray-200 placeholder:text-gray-500"
                id="description"
                placeholder="Description"
                {...register('description', { required: true })}
            />
            {errors.description && <span className="text-red-500">Falta completar este campo</span>}

            <label htmlFor="category">Categoria</label>
            <select
                className="p-2 border border-gray-300 rounded bg-gray-200 placeholder:text-gray-500"
                id="category"
                {...register('category', { required: true, validate: (value) => value !== 'Selecciona una categoria'})}
            >
                <option value={'Selecciona una categoria'}>Selecciona una categoria</option>
                {Object.values(Category).map((category) => (
                    category !== Category.PROMO &&
                    <option key={category} value={category}>{category}</option>
                ))}
            </select>
            {errors.category && <span className="text-red-500">Falta completar este campo</span>}


            <label htmlFor="stock">Stock</label>
            <input
                className="p-2 border border-gray-300 rounded bg-gray-200 placeholder:text-gray-500"
                id="stock"
                type="number"
                placeholder="Stock"
                defaultValue={0}
                {...register('stock', { valueAsNumber: true , validate: (value) => value >= 0})}
            />

            <label htmlFor="price">Precio</label>
            <input
                className="p-2 border border-gray-300 rounded bg-gray-200 placeholder:text-gray-500"
                id="price"
                type="number"
                placeholder="Price"
                {...register('price', { valueAsNumber: true, required: true, validate: (value) => value >= 0})}
            />
            {errors.price && <span className="text-red-500">Falta completar este campo</span>}
            <div className="flex flex-col gap-5 items-center justify-center col-span-2 ">

                <button
                    className="btn bg-green-400 text-white px-4 py-2 rounded hover:bg-green-600"
                    type="submit"
                >
                    Create New Burger
                </button>
            </div>
        </form>
    );
}

export default BurgerForm;
