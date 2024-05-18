import React from 'react';
import Button from './button';
import Image from 'next/image';
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
        <div className="card p-3 flex flex-col items-center justify-center bg-white" style={{ width: 'fit-content', margin: '0 auto', marginBottom: '1rem' }}>
            <h2 className="font-bold text-black p-2">{title}</h2>
            <Image className="rounded-3xl p-2" src={photoSrc} alt={title} width={300} height={300} />
            <Button link={button.link} className={button.className} text={button.text} />
        </div>
    );
};

export default Card;