import React from 'react';
import Button from './button';
import Image from 'next/image';
interface CardProps {
    title: string;
    photoSrc: string;
    width: number;
    height: number;
    button: {
        link: string;
        className: string;
        text: string;
    };}

const Card: React.FC<CardProps> = ({ title, photoSrc,width,height, button }) => {
    return (
        <div className="card flex flex-col m-0 mb-1 w-full md:w-1/2 lg:w-1/3 xl:w-1/4 p-4" style={{ width: '100%'}}>
            <Image className="rounded-2xl p-2 border-darkblue" src={photoSrc} alt={title} width={width} height={height} />
            <h2 className="text-2xl font-bold text-dark p-2">{title}</h2>
            <Button link={button.link} className={button.className} text={button.text} />
        </div>
    );
};

export default Card;