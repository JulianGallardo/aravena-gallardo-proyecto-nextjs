"use server"
import Link from 'next/link';
import Image from 'next/image';
import React from 'react';
import { Category } from '@/prisma/generated/client';
import { getImageUrl } from '@/utils/cloudinaryUtils';

interface CardProps {
    title: string;
    description: string;
    photoSrc: string;
    price: number;
    burgerId: number;
    category: Category;
}

async function Card({ title, description, photoSrc, price, burgerId,category }:CardProps){
    
    const url = (category === Category.PROMO) ? `burgers/promos/${burgerId}` : `/burgers/${burgerId}`;
    const imageUrl = await getImageUrl(title).then((url) => url);


    


    return (
        <Link href={url}>
            <div className="transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-black flex flex-col w-full h-full bg-gray-700 text-white shadow-lg shadow-black rounded-lg overflow-hidden">
                <Image className=" w-full object-cover object-center" src={imageUrl} alt="Card" width={500} height={200} />
                <div className="px-6 py-4 h-1/3 flex-grow">
                    <h2 className="text-xl md:text-2xl font-bold mb-2">{title}</h2>
                    <p className="text-gray-500 dark:text-gray-300 text-base  line-clamp-3 md:line-clamp-5 md:text-lg">{description}</p>
                </div>
                <div className="px-6 py-4">
                    <p className="text-black dark:text-yellow-400 text-xl font-semibold">${price}</p>
                </div>
            </div>
        </Link>
    );
};

export default Card;
