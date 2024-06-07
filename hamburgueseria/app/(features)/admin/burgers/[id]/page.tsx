'use client'

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import { Burger, Category } from "@/prisma/generated/client";
import { fetchBurgerById, updateBurger, deleteBurger } from "@/lib/crud";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";

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
    
    const router = useRouter();

    const { register, handleSubmit, setValue, formState: { errors } } = useForm<FormValues>();

    useEffect(() => {
        fetchBurgerById(Number(burgerId))
            .then((data) => {
                if(!data) throw new Error("Burger not found");
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


    const handleDeleteWithToast = () => {
        toast(
            <div>
                <p className="font-semibold">Estas seguro de que deseas eliminar?</p>
                <button
                    className="bg-red text-white p-2 px-4 rounded-lg mt-2"
                    onClick={async () => {
                        await deleteBurger(Number(burgerId));
                        toast.dismiss();
                        console.log("Burger deleted successfully");
                        router.push("/admin/burgers");
                        // Handle post-delete actions here
                    }}
                >
                    Yes, delete it
                </button>
                <button
                    className="bg-green text-white p-2 px-4 rounded-lg mt-2 ml-2"
                    onClick={() => toast.dismiss()}
                >
                    Cancel
                </button>
            </div>,
            {
                autoClose: false,
                closeOnClick: false,
                draggable: false,
                position: "top-center",
                closeButton: true,
            }
        );
    };

    const onSubmit: SubmitHandler<FormValues> = async (data) => {
        try {
            const formData = new FormData();
            Object.entries(data).forEach(([key, value]) => {
                if (value !== undefined && value !== null)
                    formData.append(key, String(value)); // Convert value to string
                else
                    formData.append(key, "");
            });

            await updateBurger(Number(burgerId), formData);
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
                                    {errors.name && <span className="text-red">This field is required</span>}
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2">Description:</label>
                                    <textarea
                                        className="p-2 border border-gray-300 rounded w-full"
                                        {...register("description", { required: true })}
                                    />
                                    {errors.description && <span className="text-red">This field is required</span>}
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
                                    {errors.category && <span className="text-red">This field is required</span>}
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2">Price:</label>
                                    <input
                                        className="p-2 border border-gray-300 rounded w-full"
                                        type="number"
                                        {...register("price", { valueAsNumber: true, required: true })}
                                    />
                                    {errors.price && <span className="text-red">This field is required</span>}
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2">Stock:</label>
                                    <input
                                        className="p-2 border border-gray-300 rounded w-full"
                                        type="number"
                                        {...register("stock", { valueAsNumber: true, required: true })}
                                    />
                                    {errors.stock && <span className="text-red">This field is required</span>}
                                </div>
                                <div className="flex justify-center items-center gap-4 p-6">
                                    <button className="bg-green text-white p-2 px-4 rounded-lg" type="submit">Save</button>
                                    <button className="bg-red text-white p-2 px-4 rounded-lg" type="button" onClick={handleCancel}>Cancel</button>
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
                                    <button className="bg-red text-white p-2 px-4 rounded-lg" onClick={handleDeleteWithToast}>Delete</button>
                                </div>
                            </div>
                        )}
                    </div>
                    <Link href="/admin/burgers" className='btn bg-yellow text-white'>
                        Back to Burgers
                    </Link>
                </div>
            ) : (
                <div>Loading...</div>
            )}
            <ToastContainer />
        </div>
    );
}

export default BurgerManagementPage;
