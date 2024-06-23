'use client';

import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import { useCart } from '@/app/hooks/useCart';
import { AddToCartIcon, RemoveFromCartIcon } from '@/app/ui/shared/cartIcons';
import { usePathname } from 'next/navigation';
import { CartItemBurger, ExtraInCart } from '@/lib/CartTypes';
import { fetchAllExtras } from '@/lib/crud';
import { Burger, Extra } from '@/prisma/generated/client';
import { useForm, SubmitHandler } from 'react-hook-form';
import { getImageUrl } from '@/utils/cloudinaryUtils';
import Link from 'next/link';
import { fetchBurgerById } from '@/lib/crud';
import { PromoExtendida } from '@/lib/definitions';
import { toast } from 'react-toastify';



interface SelectedExtra {
    extra: string;
    quantity: number;
}

interface FormValues {
    extras: SelectedExtra[];
}

interface RecommendedBurgers {
    burger: Burger;
    cloudinaryImageUrl: string;
}
interface recommendedPromos {
    promo: PromoExtendida;
    cloudinaryImageUrl: string;
}

const BurgerInfoPage: React.FC = () => {
    const { addToCartBurger, removeFromCartBurger } = useCart();
    const { register, handleSubmit, formState: { errors } } = useForm<FormValues>();
    const pathname = usePathname();

    const [burgerData, setBurgerData] = useState<CartItemBurger | null>(null);
    const [extras, setExtras] = useState<Extra[]>([]);
    const [extrasInBurger, setExtrasInBurger] = useState<SelectedExtra[]>([]);
    const [cloudinaryImageUrl, setCloudinaryImageUrl] = useState<string>('');
    const [burgerNotFound, setBurgerNotFound] = useState<boolean>(false);

    const [submitBtn, setSubmitBtn] = useState(false);
    const [deleteBtn, setDeleteBtn] = useState(false);

    useEffect(() => {
        fetchAllExtras().then((data) => {
            setExtras(data);
        }).catch((error) => {
            console.error('Error fetching extras:', error);
        });
    }, []);

    const parseData = (data: Burger | null) => {
        if (!data) {
            setBurgerData(null);
        } else {
            setBurgerData({
                ...data,
                quantity: 1,
                extras: []
            });
        }
    };

    useEffect(() => {
        const getBurger = async () => {
            const pathnameArray = pathname.split('/');
            const burgerId = pathnameArray[pathnameArray.length - 1];
            fetchBurgerById(Number(burgerId)).then((data) => {
                if (data) {
                    parseData(data);
                } else {
                    setBurgerNotFound(true);
                }
            }).catch((error) => {
                console.error('Error fetching burger:', error);
                setBurgerNotFound(true);
            });
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
        if (Number.isNaN(extrasTotal)) {
            return burgerData.price;
        }
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
        toast.success('Hamburguesa añadida al carrito');

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
        toast.success('Hamburguesa eliminada del carrito');
    };

    return (
        <div className="flex flex-col h-full mt-28 items-center transition duration-500 w-full text-dark md:px-10">
            { !burgerNotFound &&
            <nav className="text-gray-700 text-lg mb-8 self-start w-full px-4">
                    <ol className="list-reset flex">
                        <li>
                            <Link href="/burgers">
                                Menu
                            </Link>
                        </li>
                        <li><span className="mx-2">/</span></li>

                        <li>
                            <Link href={`/burgers/#${burgerData?.category}`}  >
                                {burgerData ? burgerData.category : 'Cargando...'}

                            </Link>
                        </li>
                        <li><span className="mx-2">/</span></li>
                        <li className="text-gray-400">{burgerData ? burgerData.name :  'Cargando...' }</li>
                    </ol>
            </nav>
            }
            {burgerNotFound ? (
                <div className="flex flex-col items-center gap-5 p-4 w-full">
                    <h2 className="text-2xl font-bold">Hamburguesa no encontrada</h2>
                    <p className="text-lg">Lo sentimos, la hamburguesa que estás buscando no existe.</p>
                </div>
            ) : burgerData && burgerData.name && cloudinaryImageUrl !== "" ? (
                <div className="flex justify-stretch flex-col md:grid md:grid-cols-2 gap-5 p-4">
                    <div className="flex justify-center items-start w-full">
                        <div className="w-full h-auto max-w-lg">
                            {cloudinaryImageUrl !== "" &&
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
                                            placeholder={`Cantidad maxima ${extras.find(e => e.extraId === parseInt(extra.extra))?.maxQuantity || 0}`}
                                            {...register(`extras.${index}.quantity`, { required: true })}
                                            onChange={(e) => {
                                                const newExtras = [...extrasInBurger];
                                                const maxQuantity = extras.find(e => e.extraId === parseInt(extra.extra))?.maxQuantity || 0;
                                                if (parseInt(e.target.value) < 0) {
                                                    newExtras[index].quantity = 0;
                                                    e.target.value = '0';
                                                } else
                                                    if (parseInt(e.target.value) > maxQuantity) {
                                                        newExtras[index].quantity = maxQuantity;
                                                        e.target.value = maxQuantity.toString();
                                                    } else {
                                                        newExtras[index].quantity = parseInt(e.target.value);
                                                    }
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
                                <button type="submit" className="btn btn-circle bg-green-500 hover:bg-green-700 text-white" onClick={() => { setSubmitBtn(true) }}  >
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
                !burgerData && !burgerNotFound &&
                <div className="flex flex-col md:flex-row items-center gap-5 p-4 w-2/3 mx-24">
                    <div className="skeleton h-96 w-96 rounded-lg bg-gray-300"></div>
                    <div className="flex flex-col gap-4 w-2/3">
                        <div className="skeleton h-4 w-full bg-gray-300 rounded"></div>
                        <div className="skeleton h-4 w-full bg-gray-300 rounded"></div>
                        <div className="skeleton h-4 w-full bg-gray-300 rounded"></div>
                        <div className="skeleton h-4 w-full bg-gray-300 rounded"></div>
                        <div className="skeleton h-4 w-full bg-gray-300 rounded"></div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BurgerInfoPage;
