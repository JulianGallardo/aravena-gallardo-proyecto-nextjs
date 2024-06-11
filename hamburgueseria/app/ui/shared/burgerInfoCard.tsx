import Link from 'next/link';
import Image from 'next/image';
import React from 'react';

interface CardProps {
    title: string;
    description: string;
    photoSrc: string;
    price: number;
    burgerId: number;
}

const Card: React.FC<CardProps> = ({ title, description, photoSrc, price, burgerId }) => {
    return (
        <Link href={`/burgers/${burgerId}`}>
            <div className="transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-black dark:hover:shadow-black flex flex-col w-64 h-80 md:w-80 md:h-96 bg-white dark:bg-gray-700 dark:text-white shadow-lg dark:shadow-black rounded-lg overflow-hidden">
                <Image className="w-full h-32 md:h-40 object-cover object-center" src={photoSrc} alt="Card" width={500} height={200} />
                <div className="px-6 py-4 flex-grow">
                    <h2 className="text-xl md:text-2xl font-bold mb-2">{title}</h2>
                    <p className="text-gray-500 dark:text-gray-300 text-base line-clamp-3 md:line-clamp-5">{description}</p>
                </div>
                <div className="px-6 py-4">
                    <p className="text-green-500 dark:text-green-400 text-xl font-semibold">${price}</p>
                </div>
            </div>
        </Link>
    );
};

export default Card;
