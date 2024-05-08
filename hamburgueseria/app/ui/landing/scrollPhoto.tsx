import React from 'react';
import Image from 'next/image';


export default function ScrollPhoto() {
    const photoTitle = "Hamburguesas originales de Bahía Blanca";
    const photoSrc = "https://example.com/photo.jpg";

    return (
        <div>
            <h1>{photoTitle}</h1>
            {/* <Image src={photoSrc} alt={photoTitle} width={10} height={10}/> */}
            {/* buscar como hacer el scroll, poner alguna flecha*/}
        </div>
    );
}