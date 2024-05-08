import React from 'react';

interface CardProps {
    title: string;
    description: string;
    photoSrc: string;
    price: number;
}

const Card: React.FC<CardProps> = ({ title, description, photoSrc, price }) => {
    return (
        <div className="card">
            <img src={photoSrc} alt="Card" />
            <h2>{title}</h2>
            <p>{description}</p>
            <p>{price}</p>
        </div>
    );
};

export default Card;
