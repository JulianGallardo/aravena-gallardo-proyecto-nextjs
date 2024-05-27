import React from 'react';

interface CardProps {
    title: string;
    description: string;
    photoSrc: string;
    price: number;
}

const Card: React.FC<CardProps> = ({ title, description, photoSrc, price }) => {
    return (
        <div className="max-w-xs bg-white shadow-lg rounded-lg overflow-hidden">
            <img className="w-full h-64 object-cover object-center" src={photoSrc} alt="Card" />
            <div className="px-6 py-4">
                <h2 className="text-xl font-bold mb-2">{title}</h2>
                <p className="text-gray-500 text-base">{description}</p>
            </div>
            <div className="px-6 py-4">
                <p className="text-green-500 text-xl font-semibold">${price}</p>
            </div>
        </div>
    );
    
};

export default Card;
