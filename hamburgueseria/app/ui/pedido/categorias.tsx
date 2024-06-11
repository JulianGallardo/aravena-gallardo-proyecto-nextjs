'use client';
import React from 'react';
import { Category } from '@/prisma/generated/client';

interface categoriesProps {
    categories: string[];
}

const Categorias: React.FC<categoriesProps> = ({ categories }) => {

    function scrollToCategory(category: string): void {
        const categoryElement = document.getElementById(category);
        if (categoryElement) {
            categoryElement.scrollIntoView({ behavior: 'smooth' });
        }
    }

    return (
        <div className="flex flex-grow flex-col pt-20 w-full">
            <h2 className="text-2xl font-bold m-8 md:ml-36">Categorías</h2>
            <div className="flex flex-col gap-5  justify-center items-center md:flex-row">
                {categories.map((category, index) => (
                    <button
                        key={index}
                        className="bg-white hover:bg-hoveredButton dark:bg-darkblue font-bold py-2 px-4 rounded-md shadow-md transition-colors duration-200 ease-in-out text-sm w-2/3 md:text-lg md:w-1/6 "
                        onClick={() => scrollToCategory(category)}
                    >
                        {category}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default Categorias;