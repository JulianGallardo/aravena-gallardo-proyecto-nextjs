import React from 'react';
import Image from 'next/image';


export default function ScrollPhoto() {
    const photoTitle = "Hamburguesas originales de Bahía Blanca";
    const photoSrc = "/landingPhoto.jpg";

    return (
        <div className="flex flex-col items-center">
            <Image src={photoSrc} alt={photoTitle} width={3000} height={1000}/> 
            {/* buscar como hacer el scroll, poner alguna flecha*/}
            <br /><br />
            <h1 className="text-center">{photoTitle}</h1>
        </div>
    );
}