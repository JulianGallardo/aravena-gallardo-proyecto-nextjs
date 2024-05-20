import React from 'react';
import Image from 'next/image';
import { inter } from '../fonts';
import Button from './button';

interface HeroCardProps {
    title: string;
    body: string;
    photoSrc: string;
}


export default function heroCard ({title, body, photoSrc}: HeroCardProps){

    return (
        <div className="hero bg-darkblue p-2 rounded-lg sm:mx-auto ">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <Image src={photoSrc} alt="Icon Photo" width={300} height={300} className='bg-lightgrey rounded-lg p-4'/>
          <div>
            <h1 className="text-5xl font-bold">{title}</h1>
            <p className="py-6">{body}</p>
            <Button link='/chat' className='bg-lightgrey text-dark' text='Chatea con Byte!' />
            
          </div>
        </div>
      </div>
    );
}