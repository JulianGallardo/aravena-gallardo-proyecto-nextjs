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
        <div className="flex flex-col h-full my-28 items-center">
            {burgerData && burgerData.name ? (
                <div className="flex flex-col md:grid md:grid-cols-2 items-center gap-5">
                    <Image src={burgerData.imageUrl} alt={burgerData.name} width={300} height={300} className='rounded-md' />
                    <div className='flex flex-col gap-2'>
                        <h1 className='text-lg font-bold'>{burgerData.name}</h1>
                        <label>Description:</label>
                        <p>{burgerData.description}</p>
                        <label>Category:</label>
                        <p>{burgerData.category}</p>
                        <label>Price:</label>
                        <p>{burgerData.price}</p>
                        <label>Add Extra:</label>
                        <form className="flex flex-col items-center gap-5" onSubmit={handleSubmit(handleFormSubmit)}>
                            {extrasInBurger.map((extra, index) => (
                                <div key={index} className="flex gap-5 items-center">
                                    <select
                                        className="p-2 border border-gray-300 rounded"
                                        {...register(`extras.${index}.extra`, { required: true })}
                                    >
                                        {extras.map((extra) => (
                                            <option key={extra.extraId} value={extra.extraId}>{extra.name}</option>
                                        ))}
                                    </select>
                                    <input
                                        className="p-2 border border-gray-300 rounded"
                                        type="number"
                                        placeholder="Quantity"
                                        {...register(`extras.${index}.quantity`, { required: true })}
                                    />
                                    <button type="button" className='btn bg-red-500 hover:bg-red-800 text-white' onClick={() => removeExtra(index)}>Remove</button>
                                </div>
                            ))}
                            <button type="button" className='btn bg-gray-600 text-white' onClick={addExtra}>Add Extra</button>
                            <div className="flex gap-5">
                                <button type="submit" className="btn btn-circle bg-green-400" onClick={() => setSubmitBtn(true)}>
                                    <AddToCartIcon />
                                </button>

                                <button type='submit' className="btn btn-circle bg-red-400" onClick={() => setDeleteBtn(true)}>
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
