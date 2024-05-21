'use client'
import React, {useRef } from 'react';
import Image from 'next/image';


export default function ScrollPhoto() {
    const photoTitle = "Hamburguesas originales de Bahía Blanca";
    const photoSrc = "/landingPhoto.jpg";
    const scrollDivRef = useRef<HTMLDivElement | null>(null);

    const handleScrollDown = () => {
            if (scrollDivRef.current) {
                window.scrollTo({
                    top: scrollDivRef.current.offsetHeight,
                    behavior: 'smooth',
                });
            }
        };
      
    return (
        <div className="h-screen w-screen overflow-hidden">
            <Image src={`${photoSrc}`} alt="Background Image" layout="fill" objectFit="cover" style={{ display: 'none' }} />
            <div
                ref={scrollDivRef}
                className="h-screen bg-cover bg-center cursor-pointer"
                style={{ backgroundImage: `url(${photoSrc})` }}
                onClick={handleScrollDown}
            >
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <h1 className="font-bold text-white sm:text-3xl md:text-5xl">{photoTitle}</h1>
                </div>
            </div>
            <div className="h-screen bg-gray-200">
                <p className="text-center mt-40 z-50">Scroll down content...</p>
            </div>
        </div>  
    );
}