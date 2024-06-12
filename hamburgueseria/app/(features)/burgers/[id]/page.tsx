'use client';

import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import { useCart } from '@/app/hooks/useCart';
import { AddToCartIcon, RemoveFromCartIcon } from '@/app/ui/shared/cartIcons';
import { usePathname } from 'next/navigation';
import { CartItem, ExtraInCart } from '@/lib/types';
import { fetchAllExtras } from '@/lib/crud';
import { Burger, Extra } from '@/prisma/generated/client';
import { useForm, SubmitHandler } from 'react-hook-form';

interface SelectedExtra {
    extra: string;
    quantity: number;
}

interface FormValues {
    extras: SelectedExtra[];
}

const BurgerPage: React.FC = () => {
    const { addToCart, removeFromCart } = useCart();
    const { register, handleSubmit, formState: { errors } } = useForm<FormValues>();
    const pathname = usePathname();

    const [burgerData, setBurgerData] = useState<CartItem | null>(null);
    const [extras, setExtras] = useState<Extra[]>([]);
    const [extrasInBurger, setExtrasInBurger] = useState<SelectedExtra[]>([]);

    const [submitBtn, setSubmitBtn] = useState(false);
    const [deleteBtn, setDeleteBtn] = useState(false);

    useEffect(() => {
        fetchAllExtras().then((data) => {
            setExtras(data);
        }).catch((error) => {
            console.error('Error fetching extras:', error);
        });
    }, []);

    const parseData = (data: Burger) => {
        setBurgerData({
            ...data,
            quantity: 1,
            extras: []
        });
    };

    useEffect(() => {
        const getBurger = async () => {
            const pathnameArray = pathname.split('/');
            const burgerId = pathnameArray[pathnameArray.length - 1];
            const query = burgerId ? `?productId=${burgerId}` : '';
            const url = `/api/products/burgers${query}`;

            try {
                const res = await fetch(url, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                const data = await res.json();
                parseData(data.body);
            } catch (error) {
                console.error('Error fetching burger:', error);
            }
        };
        getBurger();
    }, [pathname]);

    const addExtra = () => {
        setExtrasInBurger([...extrasInBurger, { extra: '', quantity: 0 }]);
    };

    const removeExtra = (index: number) => {
        setExtrasInBurger(extrasInBurger.filter((_, i) => i !== index));
    };

    const calculateTotalPrice = () => {
        if (!burgerData) {
            return 0;
        }
        const extrasTotal = extrasInBurger.reduce((total, currentExtra) => {
            const extraDetails = extras.find(e => e.extraId === parseInt(currentExtra.extra));
            if (extraDetails) {
                return total + extraDetails.price * currentExtra.quantity;
            }
            return total;
        }, 0);
        return burgerData.price + extrasTotal;
    };

    const handleFormSubmit: SubmitHandler<FormValues> = (data) => {
        if (submitBtn) {
            setSubmitBtn(false);
            handleAddToCart(data);
        } else if (deleteBtn) {
            setDeleteBtn(false);
            handleDelete(data);
        }
    };

    const handleAddToCart = (data: FormValues) => {
        const extrasInBurgers: SelectedExtra[] = [];

        if (data.extras) {
            data.extras.forEach((extra) => {
                if (extra.extra !== '' && extra.quantity !== 0) {
                    extrasInBurgers.push(extra);
                }
            });
        }
        if (!burgerData) {
            return;
        }

        const parsedExtrasByName: ExtraInCart[] = extrasInBurgers.map((extra) => {
            const extraData = extras.find((e) => e.extraId === parseInt(extra.extra));
            if (!extraData) {
                return null;
            }
            return {
                extra: extraData,
                quantity: extra.quantity
            };
        }).filter((extra) => extra !== null) as ExtraInCart[];

        const newBurger: CartItem = {
            ...burgerData,
            extras: parsedExtrasByName,
            quantity: 1
        };

        addToCart(newBurger);
    };

    const handleDelete = (data: FormValues) => {
        const extrasInBurgers: SelectedExtra[] = [];

        if (data.extras) {
            data.extras.forEach((extra) => {
                if (extra.extra !== '' && extra.quantity !== 0) {
                    extrasInBurgers.push(extra);
                }
            });
        }

        if (!burgerData) {
            return;
        }

        const parsedExtrasByName: ExtraInCart[] = extrasInBurgers.map((extra) => {
            const extraData = extras.find((e) => e.extraId === parseInt(extra.extra));
            if (!extraData) {
                return null;
            }
            return {
                extra: extraData,
                quantity: extra.quantity
            };
        }).filter((extra) => extra !== null) as ExtraInCart[];

        const newBurger: CartItem = {
            ...burgerData,
            extras: parsedExtrasByName,
            quantity: 1
        };

        removeFromCart(newBurger);
    };

    return (
        <div className="flex flex-col h-full my-28 items-center  dark:text-white transition duration-500 w-screen">
            {burgerData && burgerData.name ? (
                <div className="flex flex-col md:grid md:grid-cols-2 gap-5 p-4">
                    <div className="flex justify-center items-start">
                        <div className="w-full h-auto max-w-lg">
                            <Image
                                src={burgerData.imageUrl}
                                alt={burgerData.name}
                                width={400}
                                height={400}
                                className="rounded-lg"
                            />
                        </div>
                    </div>
                    <div className='flex flex-col gap-2'>
                        <h1 className='text-lg md:text-2xl lg:text-3xl font-bold'>{burgerData.name}</h1>
                        <label className="font-semibold md:text-lg lg:text-xl">Description:</label>
                        <p className="md:text-lg lg:text-xl">{burgerData.description}</p>
                        <label className="font-semibold md:text-lg lg:text-xl">Category:</label>
                        <p className="md:text-lg lg:text-xl">{burgerData.category}</p>
                        <label className="font-semibold md:text-lg lg:text-xl">Price:</label>
                        <p className="md:text-lg lg:text-xl">${burgerData.price}</p>
                        <label className="font-semibold md:text-lg lg:text-xl">Add Extra:</label>
                        <form className="flex flex-col items-center gap-5" onSubmit={handleSubmit(handleFormSubmit)}>
                            {extrasInBurger.map((extra, index) => (
                                <div key={index} className="flex flex-col md:flex-row gap-5 items-center border p-5 rounded-lg border-yellow-200">
                                    <select
                                        className="text-sm md:text-lg p-2 border border-gray-300 rounded dark:bg-gray-800 dark:border-gray-600"
                                        {...register(`extras.${index}.extra`, { required: true })}
                                        onChange={(e) => {
                                            const newExtras = [...extrasInBurger];
                                            newExtras[index].extra = e.target.value;
                                            setExtrasInBurger(newExtras);
                                            console.log(extrasInBurger);
                                        }}
                                    >
                                        <option value="">Select an extra</option>
                                        {extras.map((extra) => (
                                            
                                            <option key={extra.extraId} value={extra.extraId}>{extra.name}</option>
                                        ))}
                                    </select>
                                    <input
                                        className="p-2 border border-gray-300 rounded dark:bg-gray-800 dark:border-gray-600"
                                        type="number"
                                        placeholder="Quantity"
                                        {...register(`extras.${index}.quantity`, { required: true })}
                                        onChange={(e) => {
                                            const newExtras = [...extrasInBurger];
                                            newExtras[index].quantity = parseInt(e.target.value);
                                            setExtrasInBurger(newExtras);
                                            console.log(extrasInBurger);
                                        }}
                                    />
                                    <button type="button" className='btn bg-red-500 hover:bg-red-800 text-white' onClick={() => removeExtra(index)}>Remove</button>
                                </div>
                            ))}
                            <button type="button" className='btn bg-gray-600 text-white dark:bg-gray-700' onClick={addExtra}>Add Extra</button>
                            {extrasInBurger.length > 0 && (
                                <p className="text-red-500">Nuevo precio con extras: ${calculateTotalPrice()}</p>
                            )}
                            <div className="flex gap-5">
                                <button type="submit" className="btn btn-circle bg-green-400 hover:bg-green-600 text-white" onClick={() => setSubmitBtn(true)}>
                                    <AddToCartIcon />
                                </button>

                                <button type='submit' className="btn btn-circle bg-red-400 hover:bg-red-600 text-white" onClick={() => setDeleteBtn(true)}>
                                    <RemoveFromCartIcon />
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            ) : (
                <div className="flex flex-col items-center gap-5">
                    <h1>Loading...</h1>
                </div>
            )}
        </div>
    );
};

export default BurgerPage;
