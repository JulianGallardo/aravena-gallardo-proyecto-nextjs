import React from 'react';
import Image from 'next/image';


export default function ScrollPhoto() {
    const photoTitle = "Hamburguesas originales de Bahía Blanca";
    const photoSrc = "/landingPhoto.jpg";

    return (
        <div className="hero min-h-screen">
            <Image src={photoSrc} alt={photoTitle} fill={true}  objectFit='cover' objectPosition='' className="fill " />
            <div className="hero-overlay bg-opacity-60"></div>
            <div className="hero-content text-center text-neutral-content">
                <div className="max-w-md">
                    <h1 className="font-bold text-white sm:text-3xl md:text-5xl">{photoTitle}</h1>
                </div>
            </div>
        </div>
    );
}