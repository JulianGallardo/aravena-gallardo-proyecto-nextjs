import React from 'react';
import Button from './button';
import Image from 'next/image';
interface CardProps {
    title: string;
    photoSrc: string;
    width: number;
    heigth: number;
    button: {
        link: string;
        className: string;
        text: string;
    };}

const Card: React.FC<CardProps> = ({ title, photoSrc,width,heigth, button }) => {
    return (
        <div className="card p-3 flex flex-col m-0 mb-1" style={{ width: 'fit-content'}}>
            <Image className="rounded-2xl p-2 border-darkblue" src={photoSrc} alt={title} width={width} height={heigth} />
            <h2 className="text-2xl font-bold text-dark p-2">{title}</h2>
            <Button link={button.link} className={button.className} text={button.text} />
        </div>
    );
};

export default Card;