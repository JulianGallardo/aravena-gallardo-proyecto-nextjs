'use client'; 

import React from 'react';

interface ButtonProps {
    link: string;
    className?: string;
    text: string;
    
}

const Button: React.FC<ButtonProps> = ({ link, className, text }) => {
    const handleClick = () => {
        window.location.href = link;
    };

    return (
        <button className={`${className} bg-darkblue btn-neutral btn-md rounded-full p-4 flex justify-center items-center text-base min-w-[100px] max-w-[150px] text-white`} onClick={handleClick}>
            <p>{text}</p>
        </button>
    );
};

export default Button;