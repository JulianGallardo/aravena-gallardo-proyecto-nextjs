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
        <div className="flex flex-col w-64 h-80 bg-white shadow-lg rounded-lg overflow-hidden">
            <Image className="w-full h-32 object-cover object-center" src={photoSrc} alt="Card" width={500} height={200} />
            <div className="px-6 py-4 flex-grow">
                <h2 className="text-xl font-bold mb-2">{title}</h2>
                <p className="text-gray-500 text-base">{description}</p>
            </div>
            <div className="px-6 py-4">
                <p className="text-green-500 text-xl font-semibold">${price}</p>
            </div>
        </div>
        </Link>
    );
    
};

export default Card;
