'use client'

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import { Burger, Category } from "@/prisma/generated/client";
import { fetchBurgerById, updateBurgerById, deleteBurgerById } from "@/lib/crud";
import Image from "next/image";

type FormValues = {
    name: string;
    description: string;
    category: Category;
    price: number;
    stock: number;
    imageUrl: string;
};

const BurgerManagementPage = () => {
    const pathname = usePathname();
    const pathnameArray = pathname.split('/');
    const burgerId = pathnameArray[pathnameArray.length - 1];

    const [burgerData, setBurgerData] = useState<Burger | null>(null);
    const [isEditing, setIsEditing] = useState(false);

    const { register, handleSubmit, setValue, formState: { errors } } = useForm<FormValues>();

    useEffect(() => {
        fetchBurgerById(Number(burgerId))
            .then((data) => {
                setBurgerData(data as Burger);
                setValue("name", data.name);
                setValue("description", data.description);
                setValue("category", data.category);
                setValue("price", data.price);
                setValue("stock", data.stock);
                setValue("imageUrl", data.imageUrl);
            })
            .catch((error) => {
                console.error(error);
            });
    }, [burgerId, setValue]);

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleCancel = () => {
        setIsEditing(false);
    };

    const handleDelete = async () => {
        const confirmed = window.confirm("Are you sure you want to delete this burger?");
        if (confirmed) {
            try {
                await deleteBurgerById(Number(burgerId));
                // Handle post-delete actions, like redirecting or showing a message
                console.log("Burger deleted successfully");
            } catch (error) {
                console.error("Failed to delete burger:", error);
            }
        }
    };

    const onSubmit: SubmitHandler<FormValues> = async (data) => {
        try {
            await updateBurgerById(Number(burgerId), data);
            setBurgerData({ ...burgerData, ...data } as Burger);
            setIsEditing(false);
        } catch (error) {
            console.error("Failed to update burger:", error);
        }
    };

    return (
        <div className="flex flex-col gap-5 justify-center items-center w-full py-10 h-full mt-24">
            {burgerData ? (
                <div className="flex flex-col gap-5 justify-center items-center w-full py-10">
                    <div className="max-w-md w-full bg-white shadow-lg rounded-lg overflow-hidden">
                        <div className="relative h-60 w-full rounded-md">
                            <Image
                                src={burgerData.imageUrl}
                                alt={burgerData.name}
                                layout="fill"
                                objectFit="contain"
                            />
                        </div>
                        {isEditing ? (
                            <form className="p-6" onSubmit={handleSubmit(onSubmit)}>
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2">Name:</label>
                                    <input
                                        className="p-2 border border-gray-300 rounded w-full"
                                        type="text"
                                        {...register("name", { required: true })}
                                    />
                                    {errors.name && <span className="text-red-500">This field is required</span>}
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2">Description:</label>
                                    <textarea
                                        className="p-2 border border-gray-300 rounded w-full"
                                        {...register("description", { required: true })}
                                    />
                                    {errors.description && <span className="text-red-500">This field is required</span>}
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2">Category:</label>
                                    <select
                                        className="p-2 border border-gray-300 rounded w-full"
                                        {...register("category", { required: true })}
                                    >
                                        {Object.values(Category).map((category) => (
                                            <option key={category} value={category}>{category}</option>
                                        ))}
                                    </select>
                                    {errors.category && <span className="text-red-500">This field is required</span>}
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2">Price:</label>
                                    <input
                                        className="p-2 border border-gray-300 rounded w-full"
                                        type="number"
                                        {...register("price", { valueAsNumber: true, required: true })}
                                    />
                                    {errors.price && <span className="text-red-500">This field is required</span>}
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2">Stock:</label>
                                    <input
                                        className="p-2 border border-gray-300 rounded w-full"
                                        type="number"
                                        {...register("stock", { valueAsNumber: true, required: true })}
                                    />
                                    {errors.stock && <span className="text-red-500">This field is required</span>}
                                </div>
                                <div className="flex justify-center items-center gap-4 p-6">
                                    <button className="bg-blue text-white p-2 px-4 rounded-lg" type="submit">Save</button>
                                    <button className="bg-gray-500 text-white p-2 px-4 rounded-lg" type="button" onClick={handleCancel}>Cancel</button>
                                </div>
                            </form>
                        ) : (
                            <div className="p-6">
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2">Name:</label>
                                    <h2 className="text-2xl font-bold">{burgerData.name}</h2>
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2">Description:</label>
                                    <p className="text-lg">{burgerData.description}</p>
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2">Price:</label>
                                    <p className="text-lg">${burgerData.price}</p>
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2">Stock:</label>
                                    <p className="text-lg">{burgerData.stock}</p>
                                </div>
                                <div className="flex justify-center items-center gap-4 p-6">
                                    <button className="bg-green text-white p-2 px-4 rounded-lg" onClick={handleEdit}>Edit</button>
                                    <button className="bg-red text-white p-2 px-4 rounded-lg" onClick={handleDelete}>Delete</button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            ) : (
                <div>Loading...</div>
            )}
        </div>
    );
}

export default BurgerManagementPage;
