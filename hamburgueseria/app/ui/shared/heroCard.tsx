import React from 'react';
import Image from 'next/image';
import Button from './button';

interface HeroCardProps {
  title: string;
  body: string;
  photoSrc: string;
  link: string;
  buttonText: string;
}


export default function heroCard({ title, body, photoSrc, link, buttonText }: HeroCardProps) {

  return (
    <div className="hero w-fit bg-darkblue px-5 py-2 rounded-lg ">
      <div className="hero-content flex-col lg:flex-row-reverse relative">
        <div className='relative w-1/2 h-1/2 lg:w-1/2 lg:h-1/2'>
          <img src={photoSrc} alt="Icon Photo"  className="rounded-lg w-full h-full bg-lightgrey" />
        </div>
        <div>
          <h1 className="text-5xl font-bold text-black">{title}</h1>
          <p className="py-6 text-black">{body}</p>
          {
            link && buttonText ? (
              <Button text={buttonText} link={link} />
            ) : null
          }
        </div>
      </div>
    </div>
  );
}