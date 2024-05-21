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
    <div className="hero bg-darkblue rounded-lg w-4/5 md:w-fit ">
      <div className="hero-content flex-col lg:flex-row-reverse relative">
        <div className='relative w-1/3 h-1/3 md:w-1/2 lg:h-1/2'>
          <img src={photoSrc} alt="Icon Photo"  className="rounded-lg w-full h-full bg-lightgrey" />
        </div>
        <div className="flex flex-col justify-center items-center">
          <h1 className="text-2xl font-bold text-black text-center md:text-5xl  ">{title}</h1>
          <p className="p-2 text-black text-center md:p-4">{body}</p>
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