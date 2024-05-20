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
        <button className={className + "bg-darkblue btn-neutral btn-md rounded-full p-4"} onClick={handleClick} style={{ minWidth: '100px', maxWidth: '150px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <p>{text}</p>
        </button>
    );
};

export default Button;