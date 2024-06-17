
'use client';

import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import { useCart } from '@/app/hooks/useCart';
import { AddToCartIcon, RemoveFromCartIcon } from '@/app/ui/shared/cartIcons';
import { usePathname } from 'next/navigation';
import { CartItemBurger, ExtraInCart } from '@/lib/types';
import { fetchAllExtras } from '@/lib/crud';
import { Burger, Extra } from '@/prisma/generated/client';
import { useForm, SubmitHandler } from 'react-hook-form';
import { getImageUrl } from '@/utils/cloudinaryUtils';
import { setTimeout } from 'timers/promises';

interface SelectedExtra {
    extra: string;
    quantity: number;
}

interface FormValues {
    extras: SelectedExtra[];
}

const BurgerPage: React.FC = () => {
    const { addToCartBurger, removeFromCartBurger } = useCart();
    const { register, handleSubmit, formState: { errors } } = useForm<FormValues>();
    const pathname = usePathname();

    const [burgerData, setBurgerData] = useState<CartItemBurger | null>(null);
    const [extras, setExtras] = useState<Extra[]>([]);
    const [extrasInBurger, setExtrasInBurger] = useState<SelectedExtra[]>([]);
    const [cloudinaryImageUrl, setCloudinaryImageUrl] = useState<string>('');

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


    useEffect(() => {
        if (burgerData) {
            const src = getImageUrl(burgerData.name).then((url) => {
                setCloudinaryImageUrl(url);
            }).catch((error) => {
                console.error('Error fetching image:', error);
            });
        }
    }, [burgerData]);

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

        const newBurger: CartItemBurger = {
            ...burgerData,
            extras: parsedExtrasByName,
            quantity: 1
        };

        addToCartBurger(newBurger);

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

        const newBurger: CartItemBurger = {
            ...burgerData,
            extras: parsedExtrasByName,
            quantity: 1
        };

        removeFromCartBurger(newBurger);
    };





    return (
        <div className="flex flex-col h-full my-28  items-center transition duration-500 w-full text-dark md:px-10">
            {burgerData && burgerData.name ? (
                <div className="flex justify-stretch flex-col md:grid md:grid-cols-2 gap-5 p-4  ">
                    <div className="flex justify-center items-start w-full">
                        <div className="w-full h-auto max-w-lg">
                            { cloudinaryImageUrl!=="" &&
                                <Image
                                    src={cloudinaryImageUrl}
                                    alt={burgerData.name}
                                    width={400}
                                    height={400}
                                    className="rounded-lg"
                                />
                            }
                        </div>
                    </div>
                    <div className='flex flex-col gap-2 w-full'>
                        <h1 className='text-lg md:text-2xl lg:text-3xl font-bold'>{burgerData.name}</h1>
                        <label className="font-semibold md:text-lg lg:text-xl">Informacion del producto:</label>
                        <p className="md:text-lg lg:text-xl text-darkblue">{burgerData.description}</p>
                        <label className="font-semibold md:text-lg lg:text-xl">Categoria:</label>
                        <p className="md:text-lg lg:text-xl text-darkblue">{burgerData.category}</p>
                        <label className="font-semibold md:text-lg lg:text-xl">Precio:</label>
                        <p className="md:text-lg lg:text-xl text-darkblue">${burgerData.price}</p>
                        <label className="font-semibold md:text-lg lg:text-xl">Añadi algun extra a tu byte:</label>
                        <form className="flex flex-col items-center gap-5" onSubmit={handleSubmit(handleFormSubmit)}>
                            {extrasInBurger.map((extra, index) => (
                                <div key={index}>
                                    <div className="flex flex-col md:flex-row gap-5 items-center p-5 rounded-lg">
                                        <select
                                            className="text-sm md:text-lg p-2 border border-gray-300 rounded bg-darkblue text-white"
                                            {...register(`extras.${index}.extra`, { required: true })}
                                            onChange={(e) => {
                                                const newExtras = [...extrasInBurger];
                                                newExtras[index].extra = e.target.value;
                                                setExtrasInBurger(newExtras);
                                            }}
                                        >
                                            <option value="">Selecciona un extra</option>
                                            {extras.map((extra) => (
                                                <option key={extra.extraId} value={extra.extraId}>{extra.name}</option>
                                            ))}
                                        </select>
                                        <input
                                            className="p-2 border border-gray-300 rounded bg-darkblue text-white"
                                            type="number"
                                            placeholder="Cantidad"
                                            {...register(`extras.${index}.quantity`, { required: true })}
                                            onChange={(e) => {
                                                const newExtras = [...extrasInBurger];
                                                newExtras[index].quantity = parseInt(e.target.value);
                                                setExtrasInBurger(newExtras);
                                            }}
                                        />
                                        <button type="button" className='btn bg-red-500 hover:bg-red-800 text-white' onClick={() => removeExtra(index)}>Eliminar</button>
                                    </div>
                                    <div className="divider"></div>
                                </div>
                            ))}
                            <button type="button" className='btn bg-darkblue text-white' onClick={addExtra}>Añadir nuevo extra</button>
                            {extrasInBurger.length > 0 && (
                                <p className="text-red-500 font-semibold md:text-lg">Nuevo precio con extras: ${calculateTotalPrice()}</p>
                            )}
                            <div className="flex gap-5">
                                <button type="submit" className="btn btn-circle bg-green-500 hover:bg-green-700 text-white" onClick={() => {setSubmitBtn(true)}}  >
                                    <AddToCartIcon />
                                </button>

                                <button type='submit' className="btn btn-circle bg-red-500 hover:bg-red-700 text-white" onClick={() => setDeleteBtn(true)}>
                                    <RemoveFromCartIcon />
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            ) : (
                <div className="flex flex-col md:flex-row items-center gap-5 p-4 w-2/3 mx-24">
                    <div className="skeleton h-96 w-96 rounded-lg bg-gray-300"></div>
                    <div className="flex flex-col gap-4 w-2/3">
                        <div className="skeleton h-4 w-full bg-gray-300 rounded "></div>
                        <div className="skeleton h-4 w-full bg-gray-300 rounded"></div>
                        <div className="skeleton h-4 w-full bg-gray-300 rounded"></div>
                        <div className="skeleton h-4 w-full bg-gray-300 rounded"></div>
                        <div className="skeleton h-4 w-full bg-gray-300 rounded"></div>
                    </div>
                </div>
            )}
        </div>
    )
};

export default BurgerPage;
