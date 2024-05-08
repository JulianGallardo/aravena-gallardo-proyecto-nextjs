import React from 'react';
import Link from 'next/link';

interface ButtonProps {
    link: string;
    className?: string;
    text: string;
    
}

const Button: React.FC<ButtonProps> = ({ link, className, text }) => {
    return (
        <Link href={link}>
            <button className={className}>
                {text}
            </button>
        </Link>
    );
};

export default Button;