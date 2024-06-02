import { Burger } from '@/prisma/generated/client';
import React, { useState, useEffect } from 'react';
import PromoItem from './promoItem';
import { PromoBurger, Promo, Category } from '@/prisma/generated/client';


//uso una constante hasta que este el endpoint de la api

const promos: Promo[] = [
    {
        productId: 1,
        promoId: 1,
        name: 'Family Byte Combo',
        description: 'A combo with four burgers, two fries, and four drinks.',
        imageUrl: 'https://cache-mcd-ecommerce.appmcdonalds.com/images/AR/DLV_48040_v9.png',
        category: Category.PROMO,
        price: 29.99
    },
    {
        productId: 2,
        promoId: 2,
        name: 'Mega Byte Feast',
        description: 'A feast with three burgers, three fries, and three drinks.',
        imageUrl: 'https://cache-mcd-ecommerce.appmcdonalds.com/images/AR/DLV_48040_v9.png',
        category: Category.PROMO,
        price: 24.99
    },
    {
        productId: 3,
        promoId: 3,
        name: 'Byte Duo Deal',
        description: 'A deal for two with two burgers, two fries, and two drinks.',
        imageUrl: 'https://cache-mcd-ecommerce.appmcdonalds.com/images/AR/DLV_48040_v9.png',
        category: Category.PROMO,
        price: 19.99
    },
    {
        productId: 4,
        promoId: 4,
        name: 'Party Byte Pack',
        description: 'A pack with five burgers, five fries, and five drinks.',
        imageUrl: 'https://cache-mcd-ecommerce.appmcdonalds.com/images/AR/DLV_48040_v9.png',
        category: Category.PROMO,
        price: 39.99
    },
    {
        productId: 5,
        promoId: 5,
        name: 'Solo Byte Special',
        description: 'A special solo meal with one burger, one fry, and one drink.',
        imageUrl: 'https://cache-mcd-ecommerce.appmcdonalds.com/images/AR/DLV_48040_v9.png',
        category: Category.PROMO,
        price: 11.99
    }
];

const promoBurger: PromoBurger[] = [
    {
        id: 1,
        promoId: 1,
        burgerId: 41,
        quantity: 4,
        newPrice: 29.99
    },
    {
        id: 2,
        promoId: 2,
        burgerId: 42,
        quantity: 3,
        newPrice: 24.99
    },
    {
        id: 3,
        promoId: 3,
        burgerId: 43,
        quantity: 2,
        newPrice: 19.99
    },
    {
        id: 4,
        promoId: 4,
        burgerId: 44,
        quantity: 5,
        newPrice: 39.99
    },
    {
        id: 5,
        promoId: 5,
        burgerId: 45,
        quantity: 1,
        newPrice: 11.99
    },
    {
        id: 6,
        promoId: 5,
        burgerId: 46,
        quantity: 1,
        newPrice: 11.99
    }
];






const PromoItems = () => {
    const [burgers, setBurgers] = useState<Burger[]>([]);

    useEffect(() => {
        fetchBurgers();
    }, []);

    const fetchBurgers = async () => {
        try {
            const response = await fetch('/api/products/burgers');
            const data = await response.json();
            console.log('Burgers:', data.body);
            setBurgers(data.body);
        } catch (error) {
            console.error('Error fetching burgers:', error);
        }
    };

    const handleDeletePromo = async (promoId: number) => {
        try {
            const response = await fetch(`/api/products/promos/${promoId}`, {
                method: 'DELETE'
            });
            const data = await response.json();
            console.log('Deleted promo:', data.body);
            fetchBurgers();
        } catch (error) {
            console.error('Error deleting promo:', error);
        }
    };

    const handleUpdatePromo = async (promoId: number, updatedPromo: any) => {
        try {
            const response = await fetch(`/api/products/promos/${promoId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedPromo)
            });
            const data = await response.json();
            console.log('Updated promo:', data.body);
            fetchBurgers();
        } catch (error) {
            console.error('Error updating promo:', error);
        }
    };


    const searchPromoBurgers = (promoId: number): PromoBurger[] => {
        const toReturn = promoBurger.filter((promoBurger) => promoBurger.promoId === promoId);
        return toReturn.filter((promoBurger) => promoBurger !== undefined) as PromoBurger[];
    };



    
    const searchBurgersInPromo = (promo: Promo): Burger[] =>{
        var burgersInPromo= promoBurger
            .filter((promoBurger) => promoBurger.promoId === promo.promoId)
            .map((promoBurger) => {
                return burgers.find((burger: Burger) => burger.burgerId === promoBurger.burgerId);
            });
        burgersInPromo = burgersInPromo.filter((burger) => burger !== undefined);
        return burgersInPromo as Burger[];
    }


    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">Promos</h2>
            <ul className="flex flex-col gap-5">
                {promos.map((promo: Promo) => (
                    burgers.length!==0 &&
                    <PromoItem
                        key={promo.promoId}
                        promo={promo}
                        relationBurgersPromo={searchPromoBurgers(promo.promoId)}
                        burgersInPromo={searchBurgersInPromo(promo)}
                        handleDeleteBurger={handleDeletePromo}
                        handleUpdateBurger={handleUpdatePromo}
                    />

                ))}
            </ul>
            <div className="mt-8">
                <h3 className="text-xl font-bold mb-4">Add New Promo</h3>
            </div>
        </div>
    );
};

export default PromoItems;
