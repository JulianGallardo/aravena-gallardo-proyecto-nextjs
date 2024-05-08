import React from 'react';
import Button from './button';

interface CardProps {
    title: string;
    photoSrc: string;
    button: {
        link: string;
        className: string;
        text: string;
    };}

const Card: React.FC<CardProps> = ({ title, photoSrc, button }) => {
    return (
        <div className="card">
            <h2>{title}</h2>
            <img src={photoSrc} alt={title} />
            <Button link={button.link} className={button.className}text={button.text} />
        </div>
    );
};

export default Card;